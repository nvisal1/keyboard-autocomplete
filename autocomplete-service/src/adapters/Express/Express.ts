import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as http from 'http';
import { buildAdapter } from './routes/routes';
import { ServiceError, ServiceErrorReason } from '../../shared/errors';

const PORT = 5000;

export class Express {

    static app: express.Express;

    /**
     * Configures Express server
     */
    static build() {
        try {
            if (!Express.app) {
                const driver = new Express();
                driver.start();
            } else {
                throw new ServiceError(ServiceErrorReason.INTERNAL);
            }
        } catch (error) {
            console.error(error);
            throw new ServiceError(ServiceErrorReason.INTERNAL);
        }
    }

    start() {
        Express.app = express();

        this.attachConfigHandlers(Express.app);

        this.attachPublicRoutes(Express.app);
        
        this.startServer(Express.app);
    }

    attachConfigHandlers(app: express.Express) {
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(bodyParser.json());

        app.use(cors({ origin: true, credentials: true }));

        app.set('port', PORT);

        app.set('trust proxy', true);
    }

    attachPublicRoutes(app: express.Express) {
        app.use(buildAdapter());
    }

    startServer(app: express.Express) {
        const server = http.createServer(app);
        server.listen(PORT, () =>
            console.log(`Autocomplete Service running on port: ${ PORT }`),
        );
    }
  }