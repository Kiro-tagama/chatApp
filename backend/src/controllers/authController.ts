import { randomUUID } from "crypto";
import { db } from "../data/db";

interface propsLogin {
  body: { 
    email: string; 
    password: string; 
  };
}

interface propsRegister {
  body: {
    email: string; 
    password: string; 
    name: string;
  };
}

function isValid(params: any, res: any, type: string) {
  const { email, password, name } = params.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (type !== "login" && (!name || name.length < 4)) {
    res.status(422).json({ message: "O nome deve ter pelo menos 4 caracteres" });
    return false;
  }

  if (!email || !emailRegex.test(email)) {
    res.status(422).json({ message: "E-mail inválido" });
    return false;
  }
  if (!password || password.length < 6) {
    res.status(422).json({ message: "A senha deve ter pelo menos 6 caracteres" });
    return false;
  }

  return true;
}

export async function login(req: propsLogin, res: any) {
  try {
    const { email, password } = req.body;
    if (!isValid(req, res, "login")) return;

    const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length === 0 || user.rows[0].password !== password) {
      res.status(404).json({ message: "Usuário não encontrado ou senha incorreta" });
      return;
    }

    delete user.rows[0].password;
    res.status(200).json(user.rows[0])
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function register(req: propsRegister, res: any) {
  try {
    const { email, password, name } = req.body;
    const uuid = randomUUID();
    if (!isValid(req, res, "register")) return;

    const emailExists = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (emailExists.rows.length > 0) {
      res.status(422).json({ message: "E-mail já está em uso" });
      return;
    }

    const register = await db.query(
      'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [uuid, name, email, password]
    )
    res.status(200).json(register.rows[0].id)
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function deleteUser(req: propsLogin, res: any) {
  try {
    const { email, password } = req.body;
    if (!isValid(req, res, "login")) return;

    const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
    if (user.rows.length === 0) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    if (user.rows[0].password === password) {
      await db.query('BEGIN');
      await db.query('DELETE FROM messages WHERE sender_id = $1', [user.rows[0].id]);
      await db.query('DELETE FROM chat WHERE user1_id = $1 OR user2_id = $1', [user.rows[0].id]);
      await db.query('DELETE FROM users WHERE id = $1', [user.rows[0].id]);
      await db.query('COMMIT');

      res.status(200).json({ message: "Usuário deletado" });
    } else {
      res.status(422).json({ message: "Senha inválida" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}