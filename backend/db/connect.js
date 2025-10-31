const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Banco de dados já inicializado!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      _db = client.db('userdb');
      console.log('Conectado ao MongoDB com sucesso!');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Erro ao conectar ao MongoDB:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('O banco de dados ainda não foi inicializado!');
  }
  return _db;
};

module.exports = { initDb, getDb };
