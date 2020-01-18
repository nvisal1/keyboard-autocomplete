import { setDrivers } from './drivers';
import { Express } from './adapters/Express/Express';

/**
 * Initializes the application. 
 * Waits for connection to the database to be established and then starts the Express server.
 * @returns { Promise<void> }
 */
async function startApp(): Promise<void> {
    setDrivers();
    Express.build();
}

startApp();