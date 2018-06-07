/****************************
 CONFIGURATION FILE
 ****************************/
module.exports = {
    db: 'mongodb://localhost:27017/product',
    mongoDBOptions : {
        db: { native_parser: true },
        server: { poolSize: 5 },
        user: '',
        pass: ''
    },
    baseApiUrl: '/api',
    serverPort: '5022',
    tokenExpiry: 361440,
    securityToken: "test",
};