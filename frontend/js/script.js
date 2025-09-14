const { app } = require("../../backend/server");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const mensagemSucesso = document.getElementById('mensagemSucesso');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de cadastro (aqui você faria a requisição para o backend)
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        // Validação básica
        if (nome && email && senha) {
            // Mostra mensagem de sucesso
            mensagemSucesso.style.display = 'block';
            
            // Limpa o formulário
            form.reset();
            
            // Redireciona após 2 segundos
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        }
    });
});
// Rota de teste
app.get('/', (req, res) => {
    res.json({ mensagem: 'Backend funcionando!' });
});
