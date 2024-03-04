import {Router} from 'express';
import {deleteUser, login,register} from '../controllers/authController'
const router = Router();

router.get('/login', login);
router.post('/register', register);
router.delete('/deleteUser', deleteUser);

export default router