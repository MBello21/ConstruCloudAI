# Implementación de Login

## Descripción
Se ha implementado la vista de Login para ConstruCloudAI con autenticación mediante email y contraseña.

## Estructura
```
features/auth/
├── Login.tsx                 # Componente de la pantalla de login
├── hooks/
│   └── useLogin.ts          # Hook con lógica de autenticación
└── services/
    └── login.action.ts      # Servicio que realiza la petición POST
```

## Funcionamiento

### Login.tsx
- Componente full-screen sin navbar ni sidebar
- Diseño coherente con splash screen y página 404 (bg-slate-100, tarjeta blanca)
- Logo de ConstruCloud AI (HardHat icon)
- Inputs para email y password con iconos
- Validación de formulario
- Manejo de estados: loading, error
- Link a signup (por implementar)

### useLogin Hook
- Estado: email, password, isLoading, error
- Validación básica: campos no vacíos, formato de email válido
- handleChange: actualiza campos y limpia errores
- handleSubmit: 
  - Valida formulario
  - Hace POST a login.action
  - Guarda tokens en localStorage
  - Redirecciona a /panel
  - Muestra errores en caso de fallo

### login.action.ts
- POST a `http://localhost:3001/api/v1/auth/login`
- Envía: { email, password }
- Recibe: { access_token, token_type }
- Manejo de errores con mensajes claros

## Endpoints
- **POST /auth/login** - Autenticación de usuario
  - Request: { email: string, password: string }
  - Response: { access_token: string, token_type: string }

**NOTA:** Si el endpoint del backend es diferente a `/auth/login`, actualizar la URL en `login.action.ts` línea 18.

## Rutas
- **GET /login** - Pantalla de login
- **GET /panel** - Redireccionamiento después del login

## Tokens
Los tokens se guardan en localStorage:
- `access_token` - Token JWT para autenticación
- `token_type` - Tipo de token (generalmente "Bearer")

**PRÓXIMOS PASOS:**
- [ ] Implementar AuthContext para gestionar tokens globalmente
- [ ] Proteger rutas que requieren autenticación
- [ ] Implementar logout
- [ ] Implementar signup
- [ ] Agregar "Olvidé mi contraseña"
- [ ] Validar token al cargar la app (redirect a login si inválido)

## Testing
Para verificar el login:
1. Navegar a `http://localhost:5173/login`
2. Ingresar email y password
3. Submit debería:
   - Si credenciales correctas: guardar token en localStorage y redirigir a /panel
   - Si credenciales incorrectas: mostrar error "Email o contraseña incorrectos"
