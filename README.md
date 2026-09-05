# Fruiting Body — V1 structural prototype, Pass 2

This is intentionally a **plain coded architectural prototype**, not the visual design.

## What changed in Pass 2

- Added room-to-room adjacency instead of relying on one linear path.
- Added a **Narthex** and **Back Corridor** as circulation hubs.
- Combined **Red Thread / It Was Shelter Before It Was a Lie / Unravel** into one continuous **Red Room**.
- Major galleries now expose a small number of physically plausible exits.
- Map and Index remain global recovery routes.

## Run locally

Requirements: Node.js 20.9+

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What we are testing now

1. Does the museum feel explorable rather than linear?
2. Do the Vestibule, Courtyard/Cloister, Back Corridor, and Narthex work as understandable hubs?
3. Do rooms suggest a larger building without presenting too many choices?
4. Can a visitor recover orientation easily through Map / Index?
5. Does the Red Room feel like one continuous territory rather than three separate destinations?

Do **not** evaluate visual design yet.

## Pass 3: actual artwork

This build now contains web-optimized artwork exports and real exhibition-length scrolling sequences. See `PASS3_NOTES.md` before evaluating it.
