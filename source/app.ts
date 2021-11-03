import express, {Express} from 'express';
import routes from "./routes/courses";
import * as fs from 'fs';
import * as https from "https";
import {sequelize} from "./backend/connection-pg";

sequelize.sync({alter: true, force: true}).then();

process.env.domain = "https://jhordycg.westeurope.cloudapp.azure.com:8443";

const router: Express = express();
const CERT_DIR: string = "source/src";

const HTTPS_OPTIONS = {
    key: fs.readFileSync(`${CERT_DIR}/privkey.pem`),
    cert: fs.readFileSync(`${CERT_DIR}/cert.pem`),
}

/** Logging */
/** Parse the request */
router.use(express.urlencoded({extended: false}));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = https.createServer(HTTPS_OPTIONS, router);
const PORT: any = process.env.PORT ?? 8443;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));