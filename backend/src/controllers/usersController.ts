import { db } from "../data/db";

export async function getUsers(req: { params: { userName: string; }; },res:any) {
  try {
    const userName = req.params.userName
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const type = emailRegex.test(userName) ? "email" : "name"

    const result = await db.query(`SELECT id, name, email FROM users WHERE ${type} = $1`, [userName])

    result.rows.length == 0 ?
      res.status(404).json({ message: "Nem um usuário encontrado" }) :
      res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function createChat(req: { body: { user1_id: string; user2_id: string; }; }, res: any) {
  try {
    const { user1_id, user2_id } = req.body;

    const user1Exists = await db.query('SELECT id FROM users WHERE id = $1', [user1_id]);
    const user2Exists = await db.query('SELECT id FROM users WHERE id = $1', [user2_id]);

    if (user1Exists.rows.length === 0 || user2Exists.rows.length === 0) {
      res.status(404).json({ message: "Um ou mais usuários não existem" });
      return;
    }

    const createChatResult = await db.query(`
      INSERT INTO chat (chat_id, user1_id, user2_id)
      VALUES (uuid_generate_v4(), $1, $2)
      RETURNING chat_id
    `, [user1_id, user2_id]);

    res.status(200).json({ message: "Chat criado com sucesso", chatId: createChatResult.rows[0].chat_id });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar chat", error: error });
  }
}