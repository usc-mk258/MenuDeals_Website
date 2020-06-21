import * as Bunyan from 'bunyan';

export default new Bunyan({
    name: 'Restaurant-API',
    serializers: Bunyan.stdSerializers,
    streams: [{
        level:'debug',
        stream: process.stdout,
    }],
});
