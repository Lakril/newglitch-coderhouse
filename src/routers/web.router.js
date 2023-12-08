import { Router } from 'express';

export const webRouter = Router();

webRouter.get('/', (req, res) => {
  res.render('inicio.handlebars', { titulo: 'Chat' });
});
// webRouter.get('/admin', (req, res) => {
//   res.render('admin.handlebars', { titulo: 'Admin' });
// });
