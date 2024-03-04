import { randomUUID } from "crypto";
import { db } from "../data/db";

export async function getUsers(req: { params: { userName: string; }; },res:any) {
  try {
    const userName = req.params.userName
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const type = emailRegex.test(userName) ? "email" : "name"

    const result = await db.query(`SELECT id, name, email FROM users WHERE ${type} LIKE $1`,[`%${userName}%`])

    result.rows.length == 0 ?
      res.status(404).json({ message: "Nem um usuário encontrado" }) :
      res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function createChat(req: { body: { user1Id: string; user2Id: string; }; }, res: any) {
  try {
    const { user1Id, user2Id } = req.body;
    const uuid = randomUUID()

    const user1Exists = await db.query('SELECT id FROM users WHERE id = $1', [user1Id]);
    const user2Exists = await db.query('SELECT id FROM users WHERE id = $1', [user2Id]);

    if (user1Exists.rows.length === 0 || user2Exists.rows.length === 0) {
      res.status(404).json({ message: "Um ou mais usuários não existem" });
      return;
    }

    const chatExists = await db.query('SELECT chat_id FROM chat WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)', [user1Id, user2Id]);

    if (chatExists.rows.length > 0) {
      res.status(406).json({ message: "Já existe um chat entre esses usuários", chatId: chatExists.rows[0].chat_id });
      return;
    }

    const createChatResult = await db.query(`
      INSERT INTO chat (chat_id, user1_id, user2_id)
      VALUES ($1, $2, $3)
      RETURNING chat_id
    `, [uuid, user1Id, user2Id]);

    res.status(200).json({ message: "Chat criado com sucesso", chatId: createChatResult.rows[0].chat_id });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar chat", error: error });
  }
}