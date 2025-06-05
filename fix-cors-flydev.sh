#!/bin/bash

echo "🔧 Configurando CORS para Firebase Storage con tu dominio de Fly.dev..."
echo "🌐 Dominio: https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev"
echo ""

# Verificar si gsutil está disponible
if ! command -v gsutil &> /dev/null; then
    echo "❌ Error: gsutil no está instalado"
    echo "📥 Por favor instala Google Cloud SDK primero:"
    echo "   https://cloud.google.com/sdk/docs/install"
    echo ""
    echo "🔧 Después ejecuta estos comandos:"
    echo "   gcloud auth login"
    echo "   gcloud config set project viejo-sabroso"
    echo "   ./fix-cors-flydev.sh"
    exit 1
fi

# Verificar autenticación
echo "🔐 Verificando autenticación..."
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "🔑 No estás autenticado. Ejecuta:"
    echo "   gcloud auth login"
    exit 1
fi

# Configurar proyecto
echo "⚙️ Configurando proyecto viejo-sabroso..."
gcloud config set project viejo-sabroso

# Aplicar configuración CORS específica para Fly.dev
echo "🌐 Aplicando configuración CORS para tu dominio..."
gsutil cors set cors-flydev.json gs://viejo-sabroso.firebasestorage.app

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡CORS configurado exitosamente!"
    echo ""
    echo "📋 Lo que se configuró:"
    echo "   ✅ Dominio Fly.dev: https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev"
    echo "   ✅ Desarrollo local: localhost:5173, localhost:3000"
    echo "   ✅ Métodos: GET, POST, PUT, DELETE, HEAD, OPTIONS"
    echo ""
    echo "🔍 Verificando configuración..."
    gsutil cors get gs://viejo-sabroso.firebasestorage.app
    echo ""
    echo "🎉 ¡Todo listo!"
    echo ""
    echo "📱 Próximos pasos:"
    echo "   1. 🔄 Reinicia tu navegador completamente"
    echo "   2. 🌐 Ve a: https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev/settings"
    echo "   3. 🖼️ Prueba cargar una imagen en la pestaña 'Encabezado'"
    echo "   4. ✅ ¡Debería funcionar sin errores CORS!"
else
    echo "❌ Error al aplicar CORS. Verifica:"
    echo "   - Que tengas permisos en el proyecto"
    echo "   - Que el bucket existe"
    echo "   - Que estés autenticado correctamente"
fi
