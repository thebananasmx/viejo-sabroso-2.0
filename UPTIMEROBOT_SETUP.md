# 🤖 Configuración UptimeRobot - Paso a Paso

## 🎯 Tu URL de la App

```
https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev/
```

---

## 📝 Paso 1: Crear Cuenta en UptimeRobot

### **Ve a UptimeRobot:**

1. Abre: **https://uptimerobot.com**
2. Haz clic en **"Sign Up Free"** (esquina superior derecha)
3. Completa el formulario:
   - **Email:** tu-email@ejemplo.com
   - **Password:** (una contraseña segura)
   - **Full Name:** Tu nombre
4. Haz clic en **"Sign Up"**
5. **Verifica tu email** (revisa tu bandeja de entrada)

---

## ⚙️ Paso 2: Configurar Monitor

### **En el Dashboard de UptimeRobot:**

1. **Haz clic en "Add New Monitor"** (botón verde grande)

2. **Configuración básica:**

   ```
   Monitor Type: HTTP(s)
   Friendly Name: Viejo Sabroso
   URL (or IP): https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev/
   Monitoring Interval: 5 minutes
   ```

3. **Configuración avanzada (expandir "Advanced Settings"):**

   ```
   HTTP Method: GET
   Timeout: 30 seconds
   ✅ Enable "Follow Redirects"
   ✅ Enable "Verify SSL Certificate"
   HTTP Username: (dejar vacío)
   HTTP Password: (dejar vacío)
   ```

4. **Keywords to look for:**

   ```
   Viejo Sabroso
   ```

   (Esto verifica que tu página carga correctamente)

5. **Haz clic en "Create Monitor"**

---

## 🔔 Paso 3: Configurar Alertas

### **Configurar Notificaciones:**

1. **Ve a "Alert Contacts"** (menú izquierdo)
2. **Haz clic en "Add Alert Contact"**
3. **Configuración:**
   ```
   Contact Type: E-mail
   Friendly Name: Mi Email Principal
   E-mail Address: tu-email@ejemplo.com
   ✅ Get alerted when monitor goes DOWN
   ✅ Get alerted when monitor goes UP
   ```
4. **Haz clic en "Create Alert Contact"**
5. **Verifica tu email** para activar las alertas

### **Aplicar Alertas al Monitor:**

1. **Ve a "My Monitors"**
2. **Haz clic en el ícono de "editar" (lápiz)** junto a "Viejo Sabroso"
3. **En "Alert Contacts to Notify":**
   - ✅ Selecciona tu email
4. **Haz clic en "Save Changes"**

---

## ✅ Paso 4: Verificación

### **Verificar que funciona:**

1. **En el Dashboard, deberías ver:**

   ```
   Monitor Name: Viejo Sabroso
   Status: Up (verde)
   Uptime: 100%
   Response Time: ~200-500ms
   ```

2. **Probar manualmente:**

   - Ve a tu URL: https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev/
   - Debería cargar normalmente
   - En UptimeRobot debería mostrar "Up"

3. **Logs de actividad:**
   - En "Logs" verás cada check exitoso cada 5 minutos

---

## 📊 Configuración Completa Final

### **Resumen de tu configuración:**

```
✅ Monitor Type: HTTP(s)
✅ URL: https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev/
✅ Interval: 5 minutes (300 segundos)
✅ Timeout: 30 seconds
✅ Keyword: "Viejo Sabroso"
✅ Email alerts: Activadas
✅ SSL verification: Activada
```

### **¿Qué pasa ahora?**

- 🤖 UptimeRobot visitará tu app cada 5 minutos
- 🛡️ Fly.dev verá tráfico constante → NO suspenderá la app
- 📧 Si algo falla, recibirás email inmediatamente
- ⚡ Tu app estará disponible 24/7 sin cold starts

---

## 🔍 Monitoreo en Tiempo Real

### **Para verificar que está funcionando:**

**En UptimeRobot Dashboard:**

- Status debe estar "Up" (verde)
- Response time entre 200-800ms es normal
- Uptime debería mantenerse en 99%+

**En tu navegador:**

- Visita tu app en cualquier momento
- Debería cargar inmediatamente (sin demora)
- No más "cold starts" de 10-30 segundos

**En Fly.dev (opcional):**

```bash
fly logs --app tu-app-name
```

Verás requests de UptimeRobot cada 5 minutos.

---

## 🎉 ¡Listo!

**Tu app ahora:**

- ✅ **NUNCA se suspenderá** (ping cada 5 minutos)
- ✅ **Carga instantánea** siempre
- ✅ **Alertas automáticas** si algo falla
- ✅ **Completamente gratis**

### **URLs importantes para ti:**

- **Tu app:** https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev/
- **UptimeRobot Dashboard:** https://uptimerobot.com/dashboard
- **Logs de monitoring:** Disponibles en tu dashboard de UptimeRobot

---

## 🆘 Si algo no funciona:

### **Monitor muestra "Down":**

- Verifica que tu app responda manualmente
- Revisa si Fly.dev tiene problemas
- Cambia el keyword de "Viejo Sabroso" a algo más simple

### **No recibo alertas:**

- Verifica tu email (puede estar en spam)
- Confirma que activaste las notificaciones
- Prueba con "Test Alert" en UptimeRobot

### **App sigue suspendiendo:**

- Verifica que el monitor esté "Up" y activo
- Asegúrate que el intervalo sea 5 minutos
- Puede tomar 1-2 horas para que Fly.dev "aprenda" el patrón

**¡Con esto tu app estará activa 24/7! 🚀**
