/**
 * https://app.aspecto.io/ Open Telemetry
 * https://docs.aspecto.io/v1/send-tracing-data-to-aspecto/aspecto-sdk/nodejs/customize-defaults/advanced
 */
// const instrument = require('@aspecto/opentelemetry');
// instrument({
//     aspectoAuth: 'e2a48aeb-1ae2-495e-bd9d-056fffd9a95d',
//     serviceName: 'deliveroo.js-service',
//     env: process.ENV || 'dev'
// });



const redisClient = require('./src/redisClient');
const httpServer = require('./src/httpServer.js');
const ioServer = require('./src/ioServer');



const PORT = process.env.PORT || 8080;



async function start () {

    /**
     *  Start Redis
     */
    
    if ( redisClient ) {

        await redisClient.connect();
        console.log("Connected to Redis");
        
    } else {

        console.log('Redis disabled');

    }

    /**
     *  Start http server
     */

    httpServer.listen( PORT, () => {
        
        console.log(`Server listening on port ${PORT}`);
    
    } );

    /**
     * Start io server
     */

    ioServer.listen( httpServer );


    
}

start();