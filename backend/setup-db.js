// backend/setup-db.js
const mysql = require('mysql2/promise');

(async () => {
  try {
    console.log('🔧 Criando banco e tabela...');
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '230828'
    });

    // Cria banco se não existir
    await conn.query(`CREATE DATABASE IF NOT EXISTS petcare`);
    console.log('📚 Banco "petcare" OK');

    // Usa o banco
    await conn.query(`USE petcare`);

    // Cria tabela se não existir
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      )
    `);
    console.log('✅ Tabela "users" OK');

    await conn.end();
    console.log('🏁 Banco configurado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao criar banco/tabela:', err.message);
  }
})();
