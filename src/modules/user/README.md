# Users Module

## File Structure

| File | Purpose |
|------|---------|
| `user.routes.ts` | Registers Express routes and maps them to controller methods |
| `user.controller.ts` | Handles HTTP request/response — calls service, returns `ApiResponse` |
| `user.service.ts` | Business logic — validation, hashing passwords, orchestration |
| `user.repository.ts` | Database access only — all Drizzle queries live here |
| `user.schema.ts` | Zod schemas for request validation (body, params, query) |
| `user.table.ts` | *(to add)* Drizzle table definition |
| `user.relations.ts` | *(to add)* Drizzle relations to other tables |

## Data Flow

```
Request → routes → controller → service → repository → DB
Response ← controller ← service ← repository ←
```

## Responsibilities

- **routes** — no logic, just wiring
- **controller** — no business logic, only HTTP concerns (status codes, response shape)
- **service** — no DB calls, only logic (e.g., check if user exists before creating)
- **repository** — no logic, only queries (insert, select, update, delete)
- **schema** — no logic, only shape definitions used by `validate.middleware.ts`
