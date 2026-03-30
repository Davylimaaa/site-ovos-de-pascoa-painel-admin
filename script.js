// Carrinho
let carrinho = [];

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    alert(`${nome} adicionado ao carrinho!`);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoItems = document.getElementById('carrinho-items');
    const total = document.getElementById('total');
    
    carrinhoItems.innerHTML = '';
    let soma = 0;

    carrinho.forEach((item, index) => {
        soma += item.preco;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrinho-item';
        itemDiv.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                R$ ${item.preco.toFixed(2)}
            </div>
            <button class="btn btn-secundario" onclick="removerCarrinho(${index})">Remover</button>
        `;
        carrinhoItems.appendChild(itemDiv);
    });

    total.textContent = soma.toFixed(2);
}

function removerCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById('carrinho-modal').style.display = 'none';
}

function abrirCarrinho() {
    document.getElementById('carrinho-modal').style.display = 'block';
    atualizarCarrinho();
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    const pedido = carrinho.map(item => `${item.nome} - R$ ${item.preco.toFixed(2)}`).join('\n');
    
    const mensagem = `Olá! Gostaria de fazer um pedido:\n\n${pedido}\n\nTotal: R$ ${total.toFixed(2)}`;
    
    // Abre WhatsApp
    const numeroWhatsApp = '5511999999999'; // Altere com o número de contato da sua mãe
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

// Formulário de Contato
function enviarFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    const nome = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const telefone = form.querySelector('input[type="tel"]').value;
    const mensagem = form.querySelector('textarea').value;

    const mensagemFormatada = `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`;

    // Abre WhatsApp
    const numeroWhatsApp = '5511999999999'; // Altere com o número de contato da sua mãe
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemFormatada)}`;
    window.open(url, '_blank');

    alert('Mensagem enviada com sucesso!');
    form.reset();
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mostrar carrinho com click
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona evento ao botão carrinho quando necessário
});
