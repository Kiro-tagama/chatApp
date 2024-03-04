import { deleteUser, login, register } from '../controllers/authController'
import { postMessage } from '../controllers/chatController';
import { createChat } from '../controllers/usersController'
import { db } from '../data/db';

var user1 = {
  body: {
    id:"",
    email: 'user1@test.com',
    password: 'password1',
    name: 'user1',
  }
};

var user2 = {
  body: {
    id:"",
    email: 'user2@test.com',
    password: 'password2',
    name: 'user2',
  }
};

var resChatId:string = ''

const res:any = {
  status: jest.fn(() => res),
  json: jest.fn()
};

describe("Teste E2E",()=>{
  test("Registrar e logar 2 usuarios",async ()=>{
    await register(user1, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    
    await register(user2, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();

    // login
    await login(user1, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    
    await login(user2, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  })

  test("criar chat",async ()=>{
    const user1_id = await db.query('SELECT * FROM users WHERE name = $1', [user1.body.name])
    const user2_id = await db.query('SELECT * FROM users WHERE name = $1', [user2.body.name])

    const data = {
      body:{
        user1Id: user1_id.rows[0].id,
        user2Id: user2_id.rows[0].id
      }
    }
    
    await createChat(data,res)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();

    const chat = await db.query(`SELECT * FROM chat WHERE user1_id = $1 OR user2_id = $1`, [user1_id.rows[0].id]);
    expect(chat.rows.length).toBe(1);
  })

  test("enviar mensagem",async ()=>{
    const data = {
      params: { chatId: resChatId }, 
      body: { 
        message: "test",
        senderId: user1.body.id
      } 
    }
    
    await postMessage(data,res)
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  })

  test('deletar usuário com sucesso e chat', async () => {
    await deleteUser(user1, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuário deletado" });

    await deleteUser(user2, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuário deletado" });
  });

})