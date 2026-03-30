# 🍫 CHOCOVAL - Loja Online de Ovos de Páscoa

**Uma aplicação full-stack completa para venda de ovos de Páscoa artesanais com painel administrativo.**

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Banco de Dados](#banco-de-dados)
- [Configuração](#configuração)

---

## 👁️ Visão Geral

CHOCOVAL é uma plataforma de e-commerce especialmente desenvolvida para facilitar a venda de ovos de Páscoa artesanais. Combina um frontend moderno e responsivo com um painel administrativo intuitivo.

**Características principais:**
- ✨ Site responsivo (mobile, tablet, desktop)
- 🎨 Design com tema de doceria (tons de chocolate)
- 🛒 Carrinho de compras com items customizáveis
- 📲 Integração com WhatsApp para pedidos
- 👑 Painel administrativo completo
- 💾 Banco de dados SQLite

---

## ✨ Funcionalidades

### Para Clientes

#### 🌐 Loja Online (Frontend)
- [x] Vitrine de produtos em 6 categorias
- [x] Modal configurador de sabores (base + recheios)
- [x] Carrinho flutuante com contador
- [x] Cálculo automático de total
- [x] Formulário de dados do cliente
- [x] Envio de pedidos via WhatsApp

#### Categorias de Produtos
1. **Ovos de Colher** - 2 tamanhos, sabores customizáveis
2. **Linha Infantil** - 8 produtos com brindes
3. **Tradicionais** - 3 tamanhos, 3 sabores cada
4. **Crocantes** - 3 tamanhos, 3 recheios cada
5. **Corações** - 3 opções (Tradicional, Crocante, Trufado)
6. **Trufados** - 3 tamanhos, premium com personalização

### Para Gerencia (Admin)

#### 🔧 Painel Administrativo
- [x] Dashboard com estatísticas
- [x] Gerenciamento completo de produtos
  - Adicionar produtos
  - Editar (nome, preço, descrição, imagem)
  - Deletar produtos
  - Upload de imagens
- [x] Gerenciamento de pedidos
  - Visualizar todos os pedidos
  - Filtrar por status
  - Atualizar status (Pendente → Confirmado → Enviado)
  - Ver detalhes completos do pedido
- [x] Configurações da loja
- [x] Estatísticas em tempo real

---

## 📁 Estrutura do Projeto

```
site mãe/
├── public/                 # Arquivos estáticos (frontend)
│   ├── index.html         # Página principal da loja
│   ├── admin.html         # Painel administrativo
│   ├── styles.css         # CSS da loja
│   ├── admin.css          # CSS do painel
│   ├── script.js          # JavaScript da loja
│   ├── admin.js           # JavaScript do painel
│   └── uploads/           # Pasta de uploads de imagens
│
├── server.js              # Servidor Node.js + Express
├── package.json           # Dependências do projeto
├── database.db            # Banco SQLite (criado automaticamente)
├── COMECE_AQUI.md         # Guia rápido para começar
└── README.md              # Este arquivo

```

---

## 🛠️ Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite3** - Banco de dados
- **Multer** - Upload de arquivos
- **CORS** - Compartilhamento de recursos
- **Body-Parser** - Parser de requisições

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilo e layout responsivo
- **JavaScript Vanilla** - Lógica e interatividade
- **LocalStorage** - Persistência de carrinho

### APIs Externas
- **WhatsApp Business API** - Integração para envio de pedidos

---

## 💻 Instalação

### Pré-requisitos
- Node.js 14+ (https://nodejs.org)
- npm 6+ (incluído com Node.js)
- Navegador moderno

### Passos

1. **Clonar ou extrair o projeto**
```bash
cd "site mãe"
```

2. **Instalar dependências**
```bash
npm install
```

3. **Iniciar o servidor**
```bash
npm start
```

4. **Acessar a aplicação**
- Loja: http://localhost:3000
- Admin: http://localhost:3000/admin

---

## 🚀 Uso

### Como Cliente

1. Acesse http://localhost:3000
2. Explore as categorias de produtos
3. Para produtos customizáveis, clique em "Montar meu Ovo"
4. Escolha a base de chocolate e sabores na modal
5. Clique no carrinho (🛒) no canto inferior direito
6. Revise seus itens
7. Preencha nome e forma de entrega
8. Clique em "Finalizar Pedido pelo WhatsApp"
9. Seu WhatsApp abrirá com o pedido pronto para enviar

### Como Administrador

1. Acesse http://localhost:3000/admin
2. **Dashboard**: visualize estatísticas gerais
3. **Produtos**: 
   - Clique em "Adicionar Novo Produto"
   - Preencha os dados e a imagem
   - Salve ou edite produtos existentes
4. **Pedidos**:
   - Veja todos os pedidos recebidos
   - Filtre por status se necessário
   - Atualize o status usando o dropdown
5. **Configurações**: veja informações da loja

---

## 📡 API Endpoints

### Produtos (Público)
```
GET  /api/produtos           # Listar produtos ativos
GET  /api/produtos/:id       # Obter um produto específico
```

### Produtos (Admin)
```
GET    /api/admin/produtos           # Listar todos os produtos
POST   /api/admin/produtos           # Criar produto
PUT    /api/admin/produtos/:id       # Editar produto
DELETE /api/admin/produtos/:id       # Deletar produto
```

### Pedidos
```
POST   /api/pedidos                 # Criar novo pedido
GET    /api/admin/pedidos           # Listar pedidos
PUT    /api/admin/pedidos/:id       # Atualizar status do pedido
```

---

## 🗄️ Banco de Dados

### Tabela: `produtos`
```sql
CREATE TABLE produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    imagem TEXT,
    ativo INTEGER DEFAULT 1,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Tabela: `pedidos`
```sql
CREATE TABLE pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    itens TEXT NOT NULL,      -- JSON string
    total REAL NOT NULL,
    status TEXT DEFAULT 'pendente',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Status dos Pedidos
- `pendente` - Recém recebido
- `confirmado` - Confirmado para preparo
- `enviado` - Já foi entregue/retirado

---

## ⚙️ Configuração

### Alterar Número de WhatsApp

O cliente receberá os pedidos no WhatsApp registrado. Para alterar:

1. Abra `public/script.js`
2. Procure por: `const whatsapp = '5511987711776'`
3. Troque para seu número no formato: `55 + DDD + 9XXXXXXXX`

**Exemplos válidos:**
- São Paulo: `5511987654321`
- Goiânia: `5562987654321`  
- Rio: `5521987654321`

### Personalizar Cores

Edite `public/styles.css`:

```css
:root {
    --chocolate-escuro: #4e2a1e;    /* Título e elementos principais */
    --chocolate-medio: #6b3e2e;     /* Textos secundários */
    --rosa-pastel: #ffe6e0;         /* Fundos claros */
    --ouro: #d4af37;                /* Destaques */
}
```

### Alterar Sabores Disponíveis

Edite a modal em `public/index.html`:

Procure por `<label class="sabor-label">` e modifique a lista de sabores.

---

## 📱 Responsividade

O site é totalmente responsivo:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

---

## 🔒 Segurança

- Validação de entrada em formulários
- Upload de imagens com multer
- Método DELETE seguro com confirmação
- Armazenamento de dados em SQLite local

---

## 🐛 Solução de Problemas

### Porta 3000 em uso
```bash
# Mudar em server.js, linha 6:
const PORT = 3001;
```

### Erro de banco de dados
```bash
# Delete e deixe ser recriado:
rm database.db
npm start
```

### Imagens não aparecem
```bash
# Crie a pasta se não existir:
mkdir -p public/uploads
```

### WhatsApp não abre
- Verifique o número em `public/script.js`
- Confirme formato: `55DDDSXXXXXXX` (sem caracteres especiais)

---

## 📊 Estatísticas Padrão

Ao iniciar, o banco é preenchido com:
- **25 produtos** nas 6 categorias
- **Prédefinidos**: Categorias, sabores e tamanhos

---

## 🚀 Próximas Melhorias Possíveis

- [ ] Sistema de login para admin
- [ ] Multiple imagens por produto
- [ ] Cupons de desconto
- [ ] Histórico de clientes
- [ ] Relatórios em PDF
- [ ] Integração com cartão de crédito
- [ ] Chat de suporte
- [ ] Sistema de avaliações

---

## 📄 Licença

Este projeto foi desenvolvido especificamente para uso pessoal de vendas de Páscoa.

---

## 👸 Desenvolvido com ❤️

Para facilitar a venda de doces artesanais feitos com amor.

**CHOCOVAL - Doces artesanais feitos com amor!** 🍫✨

---

### 📞 Contato

- 📱 WhatsApp: (11) 98771-1776
- 📸 Instagram: @chocoval_
- 📍 São Paulo - SP

---

**Última atualização:** 30/03/2026
