@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 CHOCOVAL - Push para GitHub
echo ================================
echo.

cd /d "c:\Users\davyl\Downloads\site mãe" 2>nul || (echo Erro: Pasta não encontrada! & pause & exit /b 1)

echo ✅ Pasta encontrada: %cd%
echo.

echo 📋 Verificando repositório Git...
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo ❌ Git não inicializado!
    pause
    exit /b 1
)

echo ✅ Repositório Git encontrado
echo.

echo 🔗 Adicionando repositório remoto...
git remote add origin https://github.com/Davylimaaa/site-ovos-de-pascoa-painel-admin.git 2>nul
if errorlevel 1 (
    echo ⚠️  Repositório remoto já existe, atualizando URL...
    git remote set-url origin https://github.com/Davylimaaa/site-ovos-de-pascoa-painel-admin.git
)

echo ✅ Remoto configurado
echo.

echo 📤 Fazendo push para GitHub...
echo Digite sua senha ou Personal Access Token quando solicitado
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Erro ao fazer push!
    echo.
    echo Se tiver erro de autenticação:
    echo 1. Gere um token em: https://github.com/settings/tokens
    echo 2. Use seu username: Davylimaaa
    echo 3. Cole o token como senha
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Push concluído com sucesso!
echo.
echo 📍 Seu repositório está em:
echo https://github.com/Davylimaaa/site-ovos-de-pascoa-painel-admin
echo.
echo 🎯 Próximo passo: Deploy na Cloudflare
echo Leia o arquivo DEPLOY.md para instruções completas
echo.
pause
