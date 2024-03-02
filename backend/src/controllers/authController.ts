import { db } from "../data/db";

interface propsLogin{
  body: { 
    email: string; 
    password: string; 
  };
}

interface propsRegister{
  body:{
    email: string; 
    password: string; 
    name:string
  }
}

function isValid(params:any, res:any,type: string) {
  const {email,password, name}= params.body
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (type != "login") {
    if (!name || name.length < 4) {
      res.status(422).json({ message: "O nome deve ter pelo menos 4 caracteres" });
      return;
    }
  }

  if (!email || !emailRegex.test(email)) {
    res.status(422).json({ message: "E-mail inválido" });
    return;
  }
  if (!password || password.length < 6) {
    res.status(422).json({ message: "A senha deve ter pelo menos 6 caracteres" });
    return;
  }
}

export async function login(req: propsLogin, res:any) {
  try {
    const { email, password } = req.body;
    isValid(req,res,"login")
    
    const user = await db.query('SELECT * FROM users WHERE email = $1',[email])
    if (user.rows.length === 0 || user.rows[0].password === password) {
      res.status(404).json({ message: "Usuário não encontrado ou senha incorreta" });
      return;
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function register(req: propsRegister, res:any) {
  try {
    const { email, password, name } = req.body;
    isValid(req,res,"register")

    const emailExists = await db.query('SELECT * FROM users WHERE email = $1',[email])
    if (emailExists.rows.length > 0) {
      res.status(422).json({ message: "E-mail já está em uso" });
      return;
    }

    const register = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    )
    res.status(200).json(register.rows[0].id)
    
  } catch (error) {
    res.status(500).json({ message: error });
  }
}