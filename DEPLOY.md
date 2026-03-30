# 🚀 Guia de Deploy - CHOCOVAL

## 📋 Passo 1: Criar Repositório no GitHub

**Faça isso no seu navegador:**

1. Vá para https://github.com/new
2. Preencha os dados:
   - **Repository name:** `site-ovos-de-pascoa-painel-admin`
   - **Description:** CHOCOVAL - Plataforma de vendas de ovos de Páscoa artesanais com painel admin
   - **Public** (para Cloudflare Pages ler)
   - **Não inicialize** com README (já temos)

3. Clique em **"Create repository"**

---

## 🔗 Passo 2: Fazer Push para GitHub

**No terminal (PowerShell), na pasta do projeto:**

```powershell
cd "c:\Users\davyl\Downloads\site mãe"

# Adicionar repositório remoto
git remote add origin https://github.com/Davylimaaa/site-ovos-de-pascoa-painel-admin.git

# Renomear branch padrão
git branch -M main

# Fazer push
git push -u origin main
```

**Se pedir autenticação:**
- Use seu **username do GitHub:**  `Davylimaaa`
- **Não use senha:** Use um Personal Access Token (PAT)
  - Gere em: https://github.com/settings/tokens
  - Copie e use como senha no prompt

---

## ☁️ Passo 3: Deploy na Cloudflare Pages

### Opção A: Cloudflare Pages (Recomendado - Gratuito)

**No navegador (Cloudflare Dashboard):**

1. Vá para https://pages.cloudflare.com/
2. Faça login ou crie conta (use email)
3. Clique em **"Create a project"** → **"Connect to Git"**
4. Autorize o GitHub
5. Selecione seu repositório: `site-ovos-de-pascoa-painel-admin`
6. **Build settings:**
   - Framework: `None`
   - Build command: `npm install`
   - Build output directory: `.`
   - Root directory: `.`
7. **Environment variables** (adicione):
   ```
   NODE_ENV=production
   ```
8. Clique em **"Save and Deploy"**

**Seu site estará em:** `https://seu-subdomain.pages.dev`

---

### Opção B: Cloudflare Workers (Para Node.js)

Como seu app é Node.js + Express, precisa de um adapter:

**1. Instale Wrangler:**
```powershell
npm install -g @cloudflare/wrangler
```

**2. Crie arquivo `wrangler.toml` na raiz:**
```toml
name = "chocoval-api"
type = "javascript"
account_id = "seu-account-id"
workers_dev = true

[env.production]
routes = [
  { pattern = "api.chocoval.workers.dev", zone_name = "example.com" }
]
```

**3. Deploy:**
```powershell
wrangler publish
```

---

### Opção C: Railway (Mais fácil para Node.js)

**No navegador:**

1. Vá para https://railway.app/
2. Faça signup com GitHub
3. Novo projeto → **"Deploy from GitHub repo"**
4. Selecione seu repositório
5. Configure:
   - **Port:** 3000 (automático)
   - **NODE_ENV:** production
6. Deploy automático!

**Seu app estará em:** `https://seu-app.railway.app`

---

### Opção D: Render.com (Gratuito + Simples)

1. Vá para https://render.com
2. Crie conta com GitHub
3. **"New Web Service"** → Selecione repo
4. Configure:
   - Name: `chocoval`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Free tier disponível
5. Deploy!

---

## 🔐 Variáveis de Ambiente

Se precisar de variáveis na cloud, adicione na plataforma:

```
NODE_ENV=production
PORT=3000
```

---

## ✅ Checklist de Deploy

- [ ] Repositório criado no GitHub
- [ ] Git push feito com sucesso
- [ ] Cloudflare/Railway/Render conectado
- [ ] Domínio apontando (opcional)
- [ ] WhatsApp testado
- [ ] Admin panel acessível

---

## 🔗 Links Importantes

- 📦 **GitHub:** https://github.com/Davylimaaa/site-ovos-de-pascoa-painel-admin
- ☁️ **Cloudflare Pages:** https://pages.cloudflare.com/
- 🚆 **Railway:** https://railway.app/
- 🎨 **Render:** https://render.com/

---

## 📞 Troubleshooting

### "fatal: The current branch master has no upstream branch"
```powershell
git push -u origin main
```

### "Permission denied (publickey)"
Adicione sua chave SSH ao GitHub:
https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### App dá erro 500 depois de deploy
Verifique:
1. Node.js version na cloud
2. Variáveis de ambiente
3. Logs da plataforma (geralmente tem botão "View Logs")

---

**Feito com 🍫 por CHOCOVAL**
