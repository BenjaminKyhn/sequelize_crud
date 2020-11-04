require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'sqlite',
    storage: './database.sqlite3',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'sqlite',
    storage: ':memory',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'sqlite',
    storage: './database.sqlite3',
  },
}
