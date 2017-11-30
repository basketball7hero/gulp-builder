const config = {
    port: 4000,
    cookieSecret: 'cookieSecret',
    jwtSecret: 'jwtSecret',
    uuidSecret: 'uuidSecret'
};


config.db = {
    name: 'auth',
    host: 'localhost',
    port: 27017
};


config.db.fullhost = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;


export default config;
