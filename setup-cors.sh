#!/bin/bash

# Script para configurar CORS en Firebase Storage
# Ejecutar desde la raíz del proyecto

echo "🔧 Configurando CORS para Firebase Storage..."

# Verificar si gsutil está instalado
if ! command -v gsutil &> /dev/null; then
    echo "❌ gsutil no está instalado"
    echo "📥 Instalando Google Cloud SDK..."
    
    # Detectar OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl https://sdk.cloud.google.com | bash
        exec -l $SHELL
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        curl https://sdk.cloud.google.com | bash
        exec -l $SHELL
    elif [[ "$OSTYPE" == "msys" ]]; then
        # Windows
        echo "💻 Para Windows, descarga desde: https://cloud.google.com/sdk/docs/install"
        exit 1
    fi
fi

# Verificar autenticación
echo "🔐 Verificando autenticación..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "🔑 Iniciando autenticación..."
    gcloud auth login
fi

# Configurar proyecto
echo "⚙️ Configurando proyecto..."
gcloud config set project viejo-sabroso

# Aplicar configuración CORS
echo "🌐 Aplicando configuración CORS..."
gsutil cors set cors.json gs://viejo-sabroso.firebasestorage.app

# Verificar configuración
echo "✅ Verificando configuración..."
gsutil cors get gs://viejo-sabroso.firebasestorage.app

echo "🎉 ¡CORS configurado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Reinicia tu navegador"
echo "2. Ve a /settings"
echo "3. Prueba cargar una imagen"
echo ""
echo "🚀 ¡La carga de imágenes debería funcionar ahora!"
