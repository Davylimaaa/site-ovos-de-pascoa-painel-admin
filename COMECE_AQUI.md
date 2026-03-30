# 🍫 🚀 COMECE AQUI - CHOCOVAL!

**Bem-vinda à sua loja online de ovos de Páscoa artesanais!**

---

## 📋 Pré-Requisitos

✅ Node.js insta lado (https://nodejs.org - versão LTS)
✅ Pasta "site mãe" aberta no VS Code
✅ Terminal pronto para usar

---

## 🚀 PASSO 1: Instalar Dependências

Abra o terminal (Ctrl + `)  e execute:

```bash
npm install
```

Isso vai baixar todas as ferramentas necessárias. **Pode levar 1-2 minutos.**

---

## ▶️ PASSO 2: Iniciar o Servidor

No mesmo terminal, execute:

```bash
npm start
```

Você verá algo assim:
```
🍫 Servidor rodando em http://localhost:3000
📊 Painel Admin em http://localhost:3000/admin
```

---

## 🌐 PASSO 3: Abrir no Navegador

Abra seu navegador (Chrome, Firefox, Edge, etc) e acesse:

| O quê | Link |
|------|------|
| 🛍️ Loja Cliente | http://localhost:3000 |
| 👑 Painel Admin | http://localhost:3000/admin |

---

## 📱 PASSO 4: Configurar WhatsApp (IMPORTANTE!)

Para que os clientes consigam fazer pedidos, você precisa vincular seu WhatsApp:

1. Abra o arquivo `public/script.js`
2. Procure por: `'5511987711776'` (aparece 1x)
3. Troque pelo seu número no formato: **55** + **DDD** + **número com 9 dígitos**
   
**Exemplos:**
- São Paulo: `5511987654321`
- Goiânia: `5562987654321`
- Rio de Janeiro: `5521987654321`

---

## 📦 O QUE VOCÊ TEM NA LOJA

### 🥄 Ovos de Colher (250g e 500g)
- Opção de escolher: Base de chocolate (Leite, Branco, Amargo)
- 10 sabores diferentes: Sensação, Ovomaltine, Maracujá, Prestígio, Brigadeiro, Nutella, Ninho, KitKat, Napolitano, Delícia de Uva

### 🎁 Linha Infantil (8 produtos)
- Ovos com brindes incríveis: Chaveiro Pelúcia (Stitch/Capivara), Chuva de Sabão, Carrinho, Capimiga, Copo Personagem, Fábrica de Miçangas, Squishy, Labubu

### 🍫 Ovos Tradicionais
- 3 tamanhos: 300g, 500g, 1kg
- 3 tipos: Ao Leite, Amargo, Branco

### ✨ Ovos Crocantes  
- 3 tamanhos: 300g, 500g, 1kg
- 3 recheios: Cereal de Flocos, M&M's, Amendoim

### ❤️ Corações
- Tradicional, Crocante, Trufado (500g cada)

### ✨ Ovos Trufados (Premium)
- 3 tamanhos: 350g, 500g, 1kg
- Opção de personalizar sabores

---

## 🖥️ PAINEL ADMINISTRATIVO

Acesse: **http://localhost:3000/admin**

### 📊 Dashboard
- Ver total de pedidos
- Ver quantidade de produtos
- Ver receita total

### 📦 Produtos
- ➕ **Adicionar novo produto**
- ✏️ **Editar** nome, preço, descrição, imagem
- 🗑️ **Deletar** produtos

### 📋 Pedidos  
- Ver todos os pedidos recebidos
- Filtrar por status (Pendente, Confirmado, Enviado)
- Atualizar status dos pedidos
- Ver data, cliente, telefone, itens e total

### ⚙️ Configurações
- Ver informações da CHOCOVAL
- Status da loja

---

## 🛒 COMO FUNCIONA PARA OS CLIENTES

1. Cliente entra em **http://localhost:3000**
2. Vê todos os produtos organizados por categoria
3. Clica em "Montar meu Ovo" para produtos customizáveis
4. Escolhe a base de chocolate e sabores
5. Adiciona ao carrinho 🛒 (canto inferior direito)
6. Clica no carrinho para revisar
7. Preenche nome e tipo de entrega
8. Clica "Finalizar Pedido pelo WhatsApp"
9. **Seu WhatsApp abre automaticamente com o pedido pronto!**

---

## 🐛 PROBLEMAS COMUNS

### ❌ "Erro: Port 3000 está em uso"
A porta 3000 já está ocupada. Solução:
1. Abra `server.js`
2. Mude a linha `const PORT = 3000;` para `const PORT = 3001;`
3. Reinicie o servidor

### ❌ "Banco de dados não funciona"
1. Delete o arquivo `database.db`
2. Reinicie o servidor
3. Um novo banco será criado automaticamente

### ❌ "Imagens não aparecem no painel"
1. Verifique se a pasta `public/uploads` existe
2. Se não existe, crie manualmente
3. Reinicie o servidor

### ❌ "WhatsApp não abre"
Verifique se:
1. Você alterou o número de WhatsApp em `public/script.js`
2. O número está no formato correto: `55DDD9XXXXXXXX`
3. Seu número tem 11 dígitos (com 9)

---

## ✅ CHECKLIST FINAL

- [ ] Node.js instalado
- [ ] `npm install` executado
- [ ] `npm start` funcionando
- [ ] Loja aberta em http://localhost:3000
- [ ] Painel Admin aberto em http://localhost:3000/admin
- [ ] Número de WhatsApp alterado em `public/script.js`
- [ ] Consegue fazer um teste de pedido

---

## 📞 INFORMAÇÕES DA CHOCOVAL

- 🍫 **Nome:** CHOCOVAL
- 📱 **WhatsApp:** (11) 98771-1776
- 📸 **Instagram:** @chocoval_
- 📍 **Cidade:** São Paulo - SP
- 📅 **Data Limite:** 31/03/2026
- 💬 **Bio:** "Doces artesanais feitos com amor"

---

## 💡 DICAS IMPORTANTES

1. **Adicione produtos pelo painel** - não edite o código diretamente
2. **Upload de fotos** - as imagens são salvas em `public/uploads`
3. **Pedidos são salvos** - fique de olho no painel para atualizar status
4. **O WhatsApp é seu canal** - todos os pedidos chegam lá
5. **Data limite** - o site avisa quando faltam dias para fechar

---

## 🎉 PRONTO!

Sua loja CHOCOVAL está 100% funcionando! 

**Agora é só:**
1. Manter o servidor rodando (`npm start`)
2. Compartilhar o link http://localhost:3000 com seus clientes
3. Acompanhar os pedidos no painel Admin
4. Responder pelo WhatsApp

**Bom vendas! 🍫✨**

---

### 📚 Arquivos Principais

Se precisar editar algo depois:

```
site mãe/
├── public/
│   ├── index.html          ← Página da loja (estrutura)
│   ├── styles.css          ← Design (cores, fontes, layouts)
│   ├── script.js           ← Lógica (carrinho, configurador)
│   ├── admin.html          ← Painel admin
│   ├── admin.js            ← Lógica do painel
│   └── admin.css           ← Design do painel
├── server.js               ← Servidor backend
└── database.db             ← Banco de dados (automático)
```

---

**Dúvidas? Reveja este arquivo ou restart o servidor!**
