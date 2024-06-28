module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Mysql@123",
  DB: "bookcatalog",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

/* module.exports = {
  HOST: "viaduct.proxy.rlwy.net",
  USER: "root",
  PASSWORD: "XZlrJhJdBMHuaZzCcuytOpzwvhjqjRyc",
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}; */
