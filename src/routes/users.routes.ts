import { Router } from 'express';
import multer from 'multer';

import { ensureAuth } from '../middlewares/ensureAuth';
import upload_config from '../config/upload';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const upload_avatar = multer(upload_config.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuth,
  upload_avatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRoutes };
