import * as express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.get('/films', controller.getFilms);
router.post('/favorites', controller.favorites);
router.get('/favorites/:id', controller.favorites_id);

export = router;