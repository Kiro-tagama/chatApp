import {deleteUser, login,register} from '../controllers/authController'

const res:any = {
  status: jest.fn(() => res),
  json: jest.fn()
};

describe("Auth Test",()=>{
  
  let req: any;
  beforeEach(() => {
    req = {
      body: {
        email: 'novo@teste.com',
        password: 'senha123',
        name: 'Novo Usuário',
      },
    };
  });

  describe('Register Test', () => {
    test('registro com sucesso', async () => {
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    test('registro com já existe', async () => {
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ message: "E-mail já está em uso" });
    });
    
    test('registro com name <4', async () => {
      req.body.name = 'Nov';
  
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ message: "O nome deve ter pelo menos 4 caracteres" });
    });

    test('registro com email err', async () => {
      req.body.email='novteste.com'
  
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ message: "E-mail inválido" });
    });

    test('registro com pass < 6', async () => {
      req.body.password = 'senha';
  
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ message: "A senha deve ter pelo menos 6 caracteres" });
    });
  });
  
  describe('Login Test', () => {
    test('login com sucesso', async () => {
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    test('login com err password', async () => {
      req.body.password = '<senha123fdsafsdfa>';
    
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  
  });

  describe('Delete User Test', () => {
    test('deletar usuário com err password', async () => {
      req.body.password = '<PASSWORD>';
    
      await deleteUser(req, res);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ message: "Senha inválida" });
    });

    test('deletar usuário com sucesso', async () => {
      await deleteUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

  })
})