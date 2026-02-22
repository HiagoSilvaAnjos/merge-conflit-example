# 🔀 Simulação de Merge Conflict

Este repositório simula um cenário real de **conflito de merge** entre dois desenvolvedores que modificam o mesmo arquivo a partir do mesmo estado da branch `main`.

---

## 📋 Fluxo do Cenário

```
main
 └── Dev 1 cria branch feat/clock-component
 │    ├── Cria src/components/clock.tsx
 │    └── Modifica src/utils/time-format.ts
 │
 └── Dev 2 cria branch feat/date-component (também a partir da main)
      ├── Cria src/components/date.tsx
      └── Modifica src/utils/time-format.ts (de forma diferente)

PR do Dev 1 é mergeado na main ✅
PR do Dev 2 é aberto → CONFLITO em time-format.ts ❌
```

---

## 📄 Estado inicial — `src/utils/time-format.ts` (main)

Arquivo original de onde **ambos os devs partem**:

```ts
// src/utils/time-format.ts

export function formatDateTime(date: Date): string {
    return "Data e hora formatada"
}
```

---

## 👨‍💻 Dev 1 — Branch `feat/clock-component`

### `src/utils/time-format.ts`

Dev 1 reescreve a função para formatar **somente a hora no formato 24h**:

```ts
// src/utils/time-format.ts

export function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}
```

### `src/components/clock.tsx`

```tsx
// src/components/clock.tsx
import { useEffect, useState } from "react";
import { formatTime } from "../utils/time-format";

export function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Hora atual: {formatTime(time)}</p>
        </div>
    );
}
```

---

## 👨‍💻 Dev 2 — Branch `feat/date-component`

### `src/utils/time-format.ts`

Dev 2 **também reescreve** a mesma função, mas com formato **12h (AM/PM)** e adiciona uma segunda função:

```ts
// src/utils/time-format.ts

export function formatTime(date: Date): string {
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
}

export function formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
```

### `src/components/date.tsx`

```tsx
// src/components/date.tsx
import { useState, useEffect } from "react";
import { formatDate, formatTime } from "../utils/time-format";

export function DateDisplay() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Data: {formatDate(now)}</p>
            <p>Hora: {formatTime(now)}</p>
        </div>
    );
}
```

---

## ❌ Conflito gerado em `src/utils/time-format.ts`

Após o PR do Dev 1 ser mergeado, ao tentar mergear o PR do Dev 2, o Git marca o conflito:

```ts
<<<<<<< feat/clock-component
export function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}
=======
export function formatTime(date: Date): string {
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
}

export function formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
>>>>>>> feat/date-component
```

### Por que conflita?

| | Dev 1 | Dev 2 |
|---|---|---|
| Função `formatTime` | `HH:MM:SS` (24h) | `HH:MM AM/PM` (12h) |
| Outras funções | nenhuma | `formatDate()` |
| Ponto de conflito | mesma função, corpo diferente | mesma função, corpo diferente |

O Git não sabe qual versão de `formatTime` é a correta — é necessário **resolver o conflito manualmente**, decidindo qual lógica manter (ou combinando as duas).
