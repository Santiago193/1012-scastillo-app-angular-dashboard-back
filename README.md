# Expenses Dashboard — REST API

A lightweight REST API built with Node.js and Express for managing personal expense records. Designed to serve as the backend for an Angular-based dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB (via Mongoose) |
| Dev server | Nodemon |
| Config | dotenv |

---

## Project Structure

```
├── index.js              # App entry point — server & DB connection
├── models/
│   └── Gasto.js          # Mongoose schema for expense records
├── routes/
│   └── gastos.routes.js  # CRUD routes for /api/gastos
├── .env                  # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally (default: `mongodb://127.0.0.1:27017`)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <project-folder>

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root with the following:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/gastos_db
```

### Run

```bash
# Development (with auto-reload)
npm run dev

# Production
node index.js
```

The server will start at `http://localhost:3000`.

---

## API Reference

Base URL: `/api/gastos`

### Get all expenses

```
GET /api/gastos
```

**Response** `200 OK`
```json
[
  {
    "_id": "...",
    "descripcion": "Groceries",
    "categoria": "Food",
    "monto": 45.50,
    "fecha": "2024-01-15T00:00:00.000Z",
    "usuario": {
      "nombre": "Santi",
      "fotoUrl": "/avatar.png"
    }
  }
]
```

---

### Create an expense

```
POST /api/gastos
```

**Request body**
```json
{
  "descripcion": "Groceries",
  "categoria": "Food",
  "monto": 45.50,
  "fecha": "2024-01-15"
}
```

**Response** `200 OK`
```json
{ "message": "Gasto guardado correctamente" }
```

**Validation** — All four fields are required. Returns `400` if any are missing.

---

### Get user profile

```
GET /api/gastos/perfil
```

Returns the `usuario` object from the most recent expense record.

**Response** `200 OK`
```json
{
  "nombre": "Santi",
  "fotoUrl": "/avatar.png"
}
```

---

### Update user profile

```
PUT /api/gastos/perfil
```

Updates the `usuario` field across **all** expense records.

**Request body**
```json
{
  "nombre": "Santiago",
  "fotoUrl": "/new-avatar.png"
}
```

**Response** `200 OK`
```json
{ "message": "Perfil actualizado correctamente" }
```

**Note** — Requires at least one expense to exist. Returns `404` otherwise.

---

## Data Model

**Gasto** (Expense)

| Field | Type | Required |
|---|---|---|
| `usuario.nombre` | String | ✓ |
| `usuario.fotoUrl` | String | ✓ |
| `descripcion` | String | ✓ |
| `categoria` | String | ✓ |
| `monto` | Number | ✓ |
| `fecha` | Date | ✓ |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Nodemon |

---

## License

ISC
