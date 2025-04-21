import { Router } from 'express';
import productRouter from './features/product.route';

const router = Router();

const defaultRoutes = [
  {
    path: '/products',
    route: productRouter,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});


export default router;
