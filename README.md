# Supreme Broccoli Collaborative Real-Time Editor (Next.js + Yjs + TipTap)

This project is a **Google Docs–style collaborative editor** built using modern full‑stack tools:

* **Next.js (App Router)** — frontend & backend routes
* **TipTap** — rich text editor UI
* **Y.js (CRDT)** — real-time collaboration engine
* **y-websocket** — sync server for shared documents
* **Prisma + SQLite** — persistent storage of document states
* **Export API** — export documents as **PDF**, **HTML**, **SQL**

This repository gives you a clean starting point for building your own real‑time note editor, document workspace, or collaborative app.

---

## 🚀 Features

### ✨ Real-time collaboration

* Multiple users edit the same document simultaneously
* Conflict-free edits using **CRDT (Y.js)**
* Automatic merging, no overwrites or locking required

### 📝 Rich text editor

* Built using **TipTap Starter Kit**
* Bold, italic, lists, headings, and more
* Easily extendable with TipTap extensions

### 🔄 Persistent storage

* Y.js state is stored as binary snapshot in Prisma
* Documents auto-save and sync to the database

### 📤 Export formats

* **Export to PDF** using Puppeteer
* **Export to HTML** directly from TipTap
* **Export to SQL** with table + INSERT statements

### 🔌 Full-stack architecture

* Next.js frontend & backend
* Standalone y-websocket server
* API routes for export and CRUD
* Docker support for both services

---

## 📂 Project Structure

```
/ (repo)
├─ frontend/                # Next.js 14 application
│  ├─ app/
│  ├─ components/
│  ├─ lib/
│  ├─ package.json
├─ server/                  # y-websocket collaboration server
│  ├─ index.js
│  ├─ package.json
├─ prisma/                  # Database schema
│  └─ schema.prisma
├─ docker-compose.yml
└─ README.md
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone <your repo url>
cd <repo>
```

### 2️⃣ Install backend (y-websocket)

```
cd server
npm install
npm run dev
```

Default WebSocket URL:

```
ws://localhost:1234
```

### 3️⃣ Install frontend (Next.js)

```
cd ../frontend
npm install
npm run dev
```

Then open:

```
http://localhost:3000
```

### 4️⃣ Setup Prisma database

```
cd frontend
npx prisma migrate dev --name init
```

This will create `dev.db` SQLite file.

---

## 🧠 How Real-Time Sync Works

This project uses **Y.js CRDT documents** to store and sync content.

* Every document is represented as a **Y.Doc**
* Clients connect to `y-websocket` server and exchange updates
* The document state is saved as a **binary blob** in Prisma
* When a user opens a document, it loads the saved Y.js state
* All active clients instantly sync via WebSocket

This is the same model used by **Notion, Figma, and Google Docs (OT alternative)**.

---

## 🧪 API Routes

### `/api/document/[id]` (GET)

Returns stored document (title + binary state)

### `/api/document/save` (POST)

Stores the latest Y.js state in the database

### `/api/export/pdf/[id]`

Returns a downloadable PDF

### `/api/export/html/[id]`

Returns raw HTML

### `/api/export/sql/[id]`

Returns SQL with:

```
CREATE TABLE ...
INSERT INTO ...
```

---

## 🖨 Export Examples

### PDF

Generated using headless Chrome via Puppeteer.

### SQL

Example:

```
CREATE TABLE notes (id TEXT PRIMARY KEY, content TEXT);
INSERT INTO notes VALUES ("doc123", "<p>Hello world</p>");
```

---

## 🐳 Docker Deployment

Build and run everything via `docker-compose`:

```
docker-compose up --build
```

Services:

* `frontend` → Next.js
* `yserver` → y-websocket

---

## 🧩 Technologies Used

| Component     | Tech                                        |
| ------------- | ------------------------------------------- |
| Editor        | TipTap, ProseMirror                         |
| Collaboration | Y.js, y-websocket                           |
| Frontend      | Next.js 14 (App Router)                     |
| Backend       | Next.js API routes                          |
| Database      | Prisma + SQLite (can upgrade to PostgreSQL) |
| Export        | Puppeteer, HTML serialization               |

---
