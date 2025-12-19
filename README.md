# 🪓 Caveman Genesis
_A survival, crafting, and discovery web game built with Angular + NestJS._

---

## 🌍 Concept

**Caveman Genesis** is a browser-based game that blends the survival mechanics of **Don’t Starve**, the growth logic of **Hősember Képző**, and the creative combination gameplay of **Doodle God**.

You play as a primitive caveman who must **explore, craft, and evolve** within a dynamic world — discovering new tools, foods, buildings, and skills as you progress.

---

## 🧱 Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | Angular 20 | Reactive UI for world interactions, crafting, and progression |
| **Backend** | NestJS | Domain-driven backend architecture with REST + WebSocket support |
| **Database** | PostgreSQL + Prisma ORM | Stores entities, progress, and item data |
| **Auth** | JWT + Role-based access | Secure player profiles and multiplayer support |
| **State Management** | NGRX | Central store for game state, inventory, and skill tree |
| **Realtime Sync** | WebSocket / Socket.io | Multiplayer and live world updates |
| **Hosting** | AWS / Vercel / Render | Containerized deployment for frontend and backend |

---

## 🧩 Core Domains

| Domain | Description |
|--------|-------------|
| **Caveman** | The player character: stats, tools, abilities, and traits |
| **Crafting** | Recipes, tools, buildings, and resource combinations |
| **Map** | World exploration, tile discovery, and events |
| **NPC** | AI-driven entities for trade, combat, and storytelling |
| **Inventory** | Manage items, tools, and resources |
| **Skill Tree** | Unlock new abilities and progression paths |
| **Auth / Profile** | Player authentication and multiple caveman profiles |

---

## 🕹️ Core Gameplay

- 🔨 **Crafting System** — Combine resources to discover new items and recipes  
- 🧭 **Exploration** — Uncover map areas, NPCs, and world events  
- ⚡ **Progression** — Level up skills, unlock new crafting paths  
- 🧠 **Experimentation** — Discover combinations through trial and logic  
- 🗣️ **Interaction** — Dialogue, trade, and decision-based encounters  

---

## 🧠 Architecture Overview

The project follows **Clean Architecture** principles to ensure modularity and scalability.


```
frontend/ (Angular)
 ├── src/
 │   └── app/
 │       ├── domains/        # Feature domains (caveman, crafting, map, etc.)
 │       ├── core/           # Shared services, guards, interceptors
 │       ├── shared/         # Reusable components, pipes, and directives
 │       ├── app.component.ts               
 ├── assets/                 # Images, sprites, and game data
 └── angular.json


backend/ (NestJS)
 ├── src/
 │   ├── caveman/
 │   ├── crafting/
 │   ├── map/
 │   ├── npc/
 │   └── inventory/
 ├── prisma/
 └── main.ts
```

---

### 🖼️ Frontend Architecture Diagram

<p align="center">
  <img src="./frontend/src/assets/cave-genesis-frontend-architecture.png" alt="Angular Frontend Architecture Diagram" width="700"/>
</p>

---
### Layers

- **Domain Layer** – Business models and core logic (e.g. `Caveman`, `Craftable`, `Skill`)  
- **Application Layer** – Services and use cases (`CraftingService`, `MapService`)  
- **Infrastructure Layer** – Persistence, adapters, and API endpoints  
- **Presentation Layer** – Angular UI and NGRX store management  

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 20
- npm or yarn
- PostgreSQL running locally or via Docker

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/caveman-genesis.git
cd caveman-genesis
```

```bash
# Backend setup
cd backend
npm install
npm run start:dev
```

```bash
# Frontend setup
cd frontend
npm install
npm run start
```

Frontend runs at **http://localhost:4200**  
Backend runs at **http://localhost:3000**

---

## 💡 Development Roadmap

- [x] Initial domain design (Caveman, Crafting, Map, NPC)
- [ ] Add Inventory & Skill Tree systems
- [ ] Implement map exploration & world interactions
- [ ] Crafting UI and recipe discovery
- [ ] NPC dialogue system
- [ ] Save / load game state
- [ ] Multiplayer world events (WebSocket)

---

## 🎨 Inspirations

- **Don’t Starve** — survival and resource management
- **Doodle God** — creative combination discovery
- **Hősember Képző** — humorous skill development


