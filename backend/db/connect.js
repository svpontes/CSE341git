require('dotenv').config();
const { MongoClient } = require('mongodb');

let _db;

// Função para construir a URI segura
function buildMongoURI(user, pass, host, dbName) {
  const safeUser = encodeURIComponent(user);
  const safePass = encodeURIComponent(pass);
  return `mongodb+srv://${safeUser}:${safePass}@${host}/${dbName}?retryWrites=true&w=majority`;
}

const initDb = (callback) => {
  if (_db) {
    console.log('database initialized!');
    return callback(null, _db);
  }

  // Dados do .env
  const user = process.env.MONGO_USER;
  const pass = process.env.MONGO_PASS;
  const host = process.env.MONGO_HOST;
  const dbName = process.env.MONGO_DB || 'userdb'; // fallback

  const uri = buildMongoURI(user, pass, host, dbName);
  MongoClient.connect(uri)
    .then((client) => {
      _db = client.db(dbName);
      console.log('Success connection at MongoDB!');
      callback(null, _db);
    })
    .catch((err) => {
      // Log seguro, não revela usuário/senha
      console.error('Err to connect to MongoDB:', err.message);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database was not connected!');
  }
  return _db;
};

module.exports = { initDb, getDb };
