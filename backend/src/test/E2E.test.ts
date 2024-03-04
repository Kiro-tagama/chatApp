import {login,register} from '../controllers/authController'

var user1 = {
  req:{
    body: {
      id:"",
      email: 'user1@test.com',
      password: 'password1',
      name: 'user1',
    }
  }
};

var user2 = {
  req:{
    body: {
      id:"",
      email: 'user2@test.com',
      password: 'password2',
      name: 'user2',
    }
  }
};

const res:any = {
  status: jest.fn(() => res),
  json: jest.fn()
};

describe("Teste E2E",()=>{
  test("Registrar e logar 2 usuarios",()=>{
    register(user1.req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    
    register(user2.req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();

    // login
    login(user1.req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    
    login(user2.req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  })
})