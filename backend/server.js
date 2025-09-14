// backend/server.js
const express = require('express');
const cors = require('cors');
const pool = require('./database');
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
    console.error('Erro no cadastro:', error.message);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});
app.listen(4000, () => console.log('🚀 Servidor rodando em http://localhost:4000'));
