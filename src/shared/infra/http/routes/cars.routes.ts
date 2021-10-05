import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCar/ListAvailableCarsController';
import { CreateCarSpecificatonsController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificatonsController = new CreateCarSpecificatonsController();

carsRoutes.post('/', ensureAuth, ensureAdmin, createCarController.handle);
carsRoutes.get('/available_cars', listAvailableCarsController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAuth,
  ensureAdmin,
  createCarSpecificatonsController.handle
);

export { carsRoutes };
