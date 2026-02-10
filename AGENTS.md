# AGENTS.md

This document provides guidelines for agentic coding agents operating in this repository.

## Build, Lint, and Test Commands

### Running the Server

```bash
npm start          # Run the server with tsx
npx tsx index.ts   # Direct execution
```

### Type Checking

```bash
npx tsc --noEmit   # Type check without emitting files (requires tsconfig.json)
```

### Code Formatting

```bash
npx prettier --write .   # Format all files
npx prettier --write index.ts  # Format specific file
```

### Linting (if ESLint is configured)

```bash
npm run lint       # Run ESLint on entire project
npx eslint index.ts    # Lint specific file
```

### Running Tests

```bash
npm test           # Run all tests
npm test -- --testNamePattern="buzz"    # Run tests matching pattern
npx vitest run specific.test.ts        # Run single test file (if using Vitest)
npx jest specific.test.ts              # Run single test file (if using Jest)
```

---

## Code Style Guidelines

### Imports

- Use named imports for clarity: `import { createServer } from "node:http"`
- Group imports in this order: Node.js built-ins, third-party packages, local modules
- Use empty line between import groups

```typescript
import { createServer } from "node:http";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Server } from "socket.io";
```

### Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons at statement endings
- Keep line length under 100 characters
- Use trailing commas in multi-line objects/arrays

### TypeScript Types

- Always annotate function parameters with types
- Use explicit types for public API inputs/outputs
- Let TypeScript infer simple variable types (boolean, string literals)
- Use interfaces for object shapes, types for unions/primitives

```typescript
interface GameEvent {
  winnerId: string;
  timestamp: number;
}

socket.on("buzz", (playerId: string) => { ... });
io.emit("buzzed", { winnerId: playerId });
```

### Naming Conventions

- **Variables/Constants**: camelCase (`isLocked`, `httpServer`)
- **Functions**: camelCase, descriptive verbs (`startGame`, `handleConnection`)
- **Classes** (if used): PascalCase
- **Socket events**: lowercase with underscores (`start_game`, `game_started`)
- **Constants**: UPPER_SNAKE_CASE for config values

### Error Handling

- Use try/catch for async operations that may fail
- Log errors with meaningful context using `console.error`
- Emit error events to clients when appropriate
- Never expose stack traces or internal details to clients

```typescript
socket.on("buzz", (playerId: string) => {
  try {
    if (!isLocked) {
      isLocked = true;
      io.emit("buzzed", { winnerId: playerId });
    }
  } catch (error) {
    console.error("Buzz handler error:", error);
    socket.emit("error", { message: "Internal server error" });
  }
});
```

### Socket.IO Patterns

- Log connection/disconnection events for debugging
- Always acknowledge important events back to clients
- Use object payloads for events with multiple values
- Validate incoming event data before processing

### Project Structure

- Entry point: `index.ts`
- Keep server logic in the entry point for small projects
- Extract to separate files when exceeding 200 lines
- Use `src/` directory for larger applications

### General Practices

- Add TODO comments for incomplete code: `// TODO: Add validation`
- Use meaningful variable names (avoid single letters except loop counters)
- Keep functions focused: single responsibility principle
- Use descriptive console logs for debugging (remove or use logger in production)
