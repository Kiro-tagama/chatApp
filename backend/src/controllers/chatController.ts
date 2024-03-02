import { db } from "../data/db"

export async function getChats(req: { params: { id: string; }; },res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: unknown; }): void; new(): any; }; }; }) {
  try {
    const id = req.params.id
    
    const result = await db.query(`SELECT * FROM chat WHERE user1_id = $1 OR user2_id = $1`, [id]);

    result.rows.length == 0 ?
    res.status(404).json({ message: "Nem um chat encontrado" }) :
    res.status(200).json(result.rows.map(row => row))

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function getMenssage(req: { params: { chatId: string; }; },res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any[]): void; new(): any; }; }; }) {
  try {
    const chatId = req.params.chatId
    
    const result = await db.query(`SELECT * FROM messages WHERE chat_id = $1`, [chatId]);

    result.rows.length == 0 ?
    res.status(404).json({ message: "Nem um chat encontrado" }) :
    res.status(200).json(result.rows.map(row => row.chat_id))

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function postMessage(req: { params: { chatId: string; }; body: { message: string;senderId:string }; },res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: unknown; }): void; new(): any; }; }; }) {
 try {
    const chatId = req.params.chatId
    const { message,senderId } = req.body

    const sendMensage = await db.query(`
    INSERT INTO messages (message_id, chat_id, sender_id, message_text)
    VALUES (uuid_generate_v4(), $1, $2, $3)
    RETURNING message_id, timestamp
  `, [chatId, senderId, message])

    res.status(200).json({ message: "Message sent" })

 } catch (error) {
    res.status(500).json({ message: error });
 } 
}