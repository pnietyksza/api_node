/** source/server.ts */
import * as http from 'http';
import * as express from 'express';
import * as morgan from 'morgan';
import * as routes from './routes/posts';

const router = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

//routing
router.use('/', routes);

//errors
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

//server config
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 8080;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
