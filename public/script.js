// ===== VARIÁVEIS GLOBAIS =====
let carrinho = [];
let produtoConfigurandoNome = '';
let produtoConfigurandoPreco = 0;
let tipoEntregaSelecionado = '';
let dataSelecionada = '';
const TAXA_UBER = 15; // Taxa fixa de Uber Moto

// Dados da marca
const marcaConfig = {
    whatsapp: '5511987711776',
    instagram: '@chocoval_',
    dataLimite: '31/03/2026'
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    verificarDataLimite();
    atualizarContadorCarrinho();
    
    // Definir data mínima no picker
    const dataInput = document.getElementById('data-entrega');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.min = hoje;
    }
});

// ===== VERIFICAR DATA LIMITE =====
function verificarDataLimite() {
    const hoje = new Date();
    const dataLimite = new Date('2026-03-31');
    const diasRestantes = Math.ceil((dataLimite - hoje) / (1000 * 60 * 60 * 24));
    
    const statusElement = document.getElementById('status-pedidos');
    if (diasRestantes <= 0) {
        statusElement.innerHTML = '❌ Pedidos Fechados';
        statusElement.style.background = 'rgba(244, 67, 54, 0.3)';
        statusElement.style.borderColor = '#f44336';
    } else if (diasRestantes === 1) {
        statusElement.innerHTML = '⚠️ Último dia para pedir!';
        statusElement.style.background = 'rgba(255, 152, 0, 0.3)';
        statusElement.style.borderColor = '#ff9800';
    }
}

// ===== SELEÇÃO DE TIPO DE ENTREGA =====
function selecionarTipoEntrega(tipo) {
    tipoEntregaSelecionado = tipo;
    
    // Atualizar botões
    document.getElementById('btn-retirada').classList.remove('ativo');
    document.getElementById('btn-uber').classList.remove('ativo');
    
    if (tipo === 'retirada') {
        document.getElementById('btn-retirada').classList.add('ativo');
        document.getElementById('aviso-taxa').style.display = 'none';
        document.getElementById('info-tipo-entrega').textContent = '🏪 Retirada Local em São Paulo';
    } else if (tipo === 'uber') {
        document.getElementById('btn-uber').classList.add('ativo');
        document.getElementById('aviso-taxa').style.display = 'block';
        document.getElementById('info-tipo-entrega').textContent = '🚗 Entrega via Uber Moto (Taxa: +R$ ' + TAXA_UBER.toFixed(2) + ')';
    }
    
    // Abrir modal de data
    document.getElementById('modal-data-entrega').style.display = 'block';
}

function fecharModalData() {
    document.getElementById('modal-data-entrega').style.display = 'none';
    tipoEntregaSelecionado = '';
    dataSelecionada = '';
}

function confirmarData() {
    const dataInput = document.getElementById('data-entrega').value;
    
    if (!dataInput) {
        alert('Por favor, selecione uma data!');
        return;
    }
    
    dataSelecionada = dataInput;
    
    // Preencher campo oculto com informação completa
    const entregaTipo = tipoEntregaSelecionado === 'retirada' 
        ? 'Retirada em São Paulo' 
        : 'Entrega via Uber Moto';
    
    document.getElementById('entrega-tipo').value = entregaTipo + ' - ' + new Date(dataInput).toLocaleDateString('pt-BR');
    
    fecharModalData();
}

// ===== MODAL CONFIGURADOR =====
function abrirConfigurador(nomeProduto, precoProduto) {
    produtoConfigurandoNome = nomeProduto;
    produtoConfigurandoPreco = precoProduto;
    
    document.getElementById('produto-nome-modal').textContent = nomeProduto;
    document.getElementById('produto-preco-modal').textContent = `R$ ${precoProduto.toFixed(2)}`;
    
    // Limpar formulário
    document.querySelectorAll('input[name="base"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="sabores"]').forEach(input => input.checked = false);
    
    // Resetar contador e aviso de sabores
    atualizarContadorSabores();
    
    // Registrar listener para contar sabores
    document.querySelectorAll('input[name="sabores"]').forEach(input => {
        input.addEventListener('change', atualizarContadorSabores);
    });
    
    document.getElementById('modal-configurador').style.display = 'block';
}

function atualizarContadorSabores() {
    const saboresElements = document.querySelectorAll('input[name="sabores"]');
    let selecionados = 0;
    
    saboresElements.forEach(elem => {
        if (elem.checked) {
            selecionados++;
        }
        // Desabilitar se já tem 3 selecionados e este não está marcado
        if (selecionados >= 3 && !elem.checked) {
            elem.disabled = true;
        } else {
            elem.disabled = false;
        }
    });
    
    // Atualizar contador visual
    document.getElementById('contador-sabores').textContent = `(${selecionados}/3)`;
    
    // Mostrar/esconder aviso
    const avisoElement = document.getElementById('aviso-sabores');
    if (selecionados >= 3) {
        avisoElement.style.display = 'block';
    } else {
        avisoElement.style.display = 'none';
    }
}

function fecharConfigurador() {
    // Remover listeners para evitar múltiplas chamadas
    document.querySelectorAll('input[name="sabores"]').forEach(input => {
        input.removeEventListener('change', atualizarContadorSabores);
    });
    document.getElementById('modal-configurador').style.display = 'none';
}

function adicionarConfigurado(event) {
    event.preventDefault();
    
    // Pegar base selecionada
    const baseElements = document.querySelectorAll('input[name="base"]');
    let baseEscolhida = '';
    for (let elem of baseElements) {
        if (elem.checked) {
            baseEscolhida = elem.value;
            break;
        }
    }
    
    // Pegar sabores selecionados
    const saboresElements = document.querySelectorAll('input[name="sabores"]');
    let saboresEscolhidos = [];
    for (let elem of saboresElements) {
        if (elem.checked) {
            saboresEscolhidos.push(elem.value);
        }
    }
    
    if (!baseEscolhida) {
        alert('Escolha uma base de chocolate!');
        return;
    }
    
    if (saboresEscolhidos.length === 0) {
        alert('Escolha pelo menos um sabor!');
        return;
    }
    
    // Validar máximo 3 sabores para Ovos de Colher
    if (produtoConfigurandoNome.includes('Colher') && saboresEscolhidos.length > 3) {
        alert('⚠️ Máximo de 3 sabores permitidos para Ovos de Colher!');
        return;
    }
    
    // Criar descrição do produto configurado
    const descricao = `Base: ${baseEscolhida} | Sabores: ${saboresEscolhidos.join(', ')}`;
    
    // Adicionar ao carrinho
    carrinho.push({
        nome: produtoConfigurandoNome,
        preco: produtoConfigurandoPreco,
        descricao: descricao,
        id: Date.now()
    });
    
    alert(`✨ ${produtoConfigurandoNome} adicionado com sucesso!`);
    fecharConfigurador();
    atualizarCarrinho();
}

// ===== ADICIONAR SIMPLES AO CARRINHO =====
function adicionarAoCarrinho(nomeProduto, precoProduto, descricao) {
    carrinho.push({
        nome: nomeProduto,
        preco: precoProduto,
        descricao: descricao || '',
        id: Date.now()
    });
    
    alert(`✨ ${nomeProduto} adicionado com sucesso!`);
    atualizarCarrinho();
}

// ===== CARRINHO =====
function atualizarCarrinho() {
    // Atualizar contador
    atualizarContadorCarrinho();
    
    // Atualizar items
    const carrinhoItems = document.getElementById('carrinho-items');
    carrinhoItems.innerHTML = '';
    
    let total = 0;
    
    if (carrinho.length === 0) {
        carrinhoItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Seu carrinho está vazio</p>';
        document.getElementById('total').textContent = '0,00';
        return;
    }
    
    carrinho.forEach((item, index) => {
        total += item.preco;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrinho-item';
        itemDiv.innerHTML = `
            <div>
                <strong>${item.nome}</strong>
                ${item.descricao ? `<div style="font-size: 0.8rem; color: #666; margin: 0.3rem 0;">${item.descricao}</div>` : ''}
                <span class="preco-item">R$ ${item.preco.toFixed(2)}</span>
            </div>
            <button class="btn btn-secondary" onclick="removerDoCarrinho(${index})" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                🗑️ Remover
            </button>
        `;
        carrinhoItems.appendChild(itemDiv);
    });
    
    document.getElementById('total').textContent = total.toFixed(2);
}

function atualizarContadorCarrinho() {
    document.getElementById('contador-carrinho').textContent = carrinho.length;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione alguns ovos deliciosos 🍫');
        return;
    }
    document.getElementById('modal-carrinho').style.display = 'block';
    atualizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById('modal-carrinho').style.display = 'none';
}

// ===== FINALIZAR PEDIDO =====
function finalizarPedido(event) {
    event.preventDefault();
    
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const nomeCliente = document.getElementById('nome-cliente').value.trim();
    const tipoEntrega = document.getElementById('entrega-tipo').value;
    
    if (!nomeCliente || !tipoEntrega) {
        alert('Por favor, preencha todos os dados!');
        return;
    }
    
    // Calcular total com taxa de Uber Moto se necessário
    let total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    let taxaUber = 0;
    
    if (tipoEntrega.includes('Uber Moto')) {
        taxaUber = TAXA_UBER;
        total += taxaUber;
    }
    
    // Montar mensagem para WhatsApp
    let mensagem = '🍫 *PEDIDO CHOCOVAL* 🍫\n\n';
    
    carrinho.forEach((item, index) => {
        mensagem += `${index + 1}. *${item.nome}* - R$ ${item.preco.toFixed(2)}\n`;
        if (item.descricao) {
            mensagem += `   └─ ${item.descricao}\n`;
        }
    });
    
    let totalSemTaxa = carrinho.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\n💰 Subtotal: R$ ${totalSemTaxa.toFixed(2)}\n`;
    
    if (taxaUber > 0) {
        mensagem += `🚗 Taxa Uber Moto: +R$ ${taxaUber.toFixed(2)}\n`;
    }
    
    mensagem += `\n*💵 TOTAL: R$ ${total.toFixed(2)}*\n`;
    mensagem += `\n👤 *Cliente:* ${nomeCliente}\n`;
    mensagem += `🚚 *Entrega:* ${tipoEntrega}\n`;
    mensagem += `\n📅 Última chance de pedidos: 31/03/2026`;
    
    // Salvar pedido no banco de dados
    const pedidoData = {
        nome: nomeCliente,
        email: document.getElementById('email-cliente')?.value || '',
        telefone: document.getElementById('telefone-cliente')?.value || '',
        itens: carrinho,
        total: total
    };
    
    // Enviar pedido para o servidor
    fetch('/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            console.log('✅ Pedido salvo no sistema! ID:', data.id);
            
            // Abrir WhatsApp
            const urlWhatsApp = `https://wa.me/${marcaConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`;
            window.open(urlWhatsApp, '_blank');
            
            // Limpar e mostrar modal de sucesso
            setTimeout(() => {
                carrinho = [];
                document.getElementById('nome-cliente').value = '';
                document.getElementById('entrega-tipo').value = '';
                document.getElementById('email-cliente').value = '';
                document.getElementById('telefone-cliente').value = '';
                fecharCarrinho();
                atualizarCarrinho();
                
                // Mostrar modal de sucesso com informações
                let mensagemSucesso = `✅ Seu pedido foi recebido com sucesso!\n\n`;
                mensagemSucesso += `📋 ID do Pedido: #${data.id}\n`;
                mensagemSucesso += `💰 Valor Total: R$ ${total.toFixed(2)}\n\n`;
                mensagemSucesso += `📱 Verifique seu WhatsApp para confirmar o pedido.\n\n`;
                mensagemSucesso += `🎁 Você pode acompanhar o status em nosso painel.`;
                
                mostrarModalSucesso(mensagemSucesso);
            }, 500);
        } else {
            alert('❌ Erro ao salvar pedido. Tente novamente!');
        }
    })
    .catch(err => {
        console.error('Erro:', err);
        alert('❌ Erro ao enviar pedido: ' + err.message);
    });
}

// ===== MODAL DE SUCESSO =====
function mostrarModalSucesso(mensagem) {
    document.getElementById('msg-sucesso').textContent = mensagem;
    document.getElementById('modal-sucesso').style.display = 'block';
}

function fecharModalSucesso() {
    document.getElementById('modal-sucesso').style.display = 'none';
}

// ===== FECHAR MODAIS AO CLICAR FORA =====
window.onclick = function(event) {
    const modalConfigurador = document.getElementById('modal-configurador');
    const modalCarrinho = document.getElementById('modal-carrinho');
    const modalDataEntrega = document.getElementById('modal-data-entrega');
    const modalSucesso = document.getElementById('modal-sucesso');
    
    if (event.target === modalConfigurador) {
        fecharConfigurador();
    }
    if (event.target === modalCarrinho) {
        fecharCarrinho();
    }
    if (event.target === modalDataEntrega) {
        fecharModalData();
    }
    if (event.target === modalSucesso) {
        fecharModalSucesso();
    }
}

// ===== FECHAR MODAIS COM ESC =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharConfigurador();
        fecharCarrinho();
        fecharModalData();
        fecharModalSucesso();
    }
});
