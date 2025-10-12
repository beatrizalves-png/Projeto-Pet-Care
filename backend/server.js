const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexão com o MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '230828',
  database: 'petcare',
});

// 🧍 Cadastro de usuário
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro no cadastro de usuário:', error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
});

// 🐶 Cadastro de pet
app.post('/register-pet', async (req, res) => {
  const { petName, species, breed, age, gender } = req.body;

  if (!petName || !species || !age || !gender) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios!' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO pets (petName, species, breed, age, gender) VALUES (?, ?, ?, ?, ?)',
      [petName, species, breed, age, gender]
    );
    res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro no cadastro de pet:', error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
});

// 📋 Listar todos os pets
app.get('/pets', async (req, res) => {
  try {
    const [pets] = await pool.query('SELECT * FROM pets ORDER BY id DESC');
    res.json(pets);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
});

// 🗑️ Deletar pet (opcional)
app.delete('/pets/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM pets WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    
    res.json({ message: 'Pet excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir pet:', error);
    res.status(500).json({ error: error.sqlMessage || error.message });
  }
});

// 🔍 Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor do Pet Care está rodando!',
    timestamp: new Date().toISOString()
  });
});

// 🚀 Inicialização do servidor
app.listen(4000, () => console.log('🚀 Servidor rodando em http://localhost:4000'));