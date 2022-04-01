import { Router } from 'express';
import multer from 'multer';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCar/ListAvailableCarsController';
import { CreateCarSpecificatonsController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import uploadConfig from '@config/upload';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificatonsController = new CreateCarSpecificatonsController();
const uploadCarImageController = new UploadCarImageController();

const uploadCarImage = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post('/', ensureAuth, ensureAdmin, createCarController.handle);
carsRoutes.get('/available_cars', listAvailableCarsController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAuth,
  ensureAdmin,
  createCarSpecificatonsController.handle
);
carsRoutes.post(
  '/images/:id',
  ensureAuth,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImageController.handle
);

export { carsRoutes };
