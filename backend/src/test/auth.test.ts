import {register} from '../controllers/authController'

describe("Auth Test",()=>{
  describe('Auth register test',()=>{
    test('register ok',async()=>{
      const req = {body: {
        name: 'testuser',
        email: 'test@example.com',
        password: 'password'
      }};
      const res = {json: jest.fn(),status: jest.fn()};

      await register(req, res);
      expect(res.json);
    })
  })
})