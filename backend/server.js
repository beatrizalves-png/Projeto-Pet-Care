// backend/server.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // seu usuário do MySQL
  password: '230828', // sua senha do MySQL
  database: 'petcare'   // nome do banco que você criou
});

module.exports = pool;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    conn.release();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro no cadastro:', error); // 
    res.status(500).json({ error: error.sqlMessage || error.message || 'Erro desconhecido' });
  }
});

app.listen(4000, () => console.log('🚀 Servidor rodando em http://localhost:4000'));

