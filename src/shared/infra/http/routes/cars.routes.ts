import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(ensureAuth);
carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
