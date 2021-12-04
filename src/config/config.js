const path = require('path')

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'test',
        user: process.env.DB_USER || 'test',
        password: process.env.DB_PASS || 'test',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../test.sqlite')
        }
    }
}