# Fruiting Body — V1 Build Specification

## Core rule
When two technical approaches create substantially the same visitor experience, choose the simpler, faster, more accessible, and more maintainable approach.

## Architectural route model

- `/` Exterior / street
- `/vestibule` Environmental transition and orientation
- `/membrane` First compressed collection encounter
- `/courtyard` Primary orientation and branching point
- `/dark-garden` Transition toward psychological interior
- `/grotto` Specialized inner-chamber system
- `/light-garden` Emergence / Taste and See
- `/threshold` Exit-side liminal collection
- `/collections/[slug]` Reusable standard-gallery system
- `/map` Blueprint/orientation fallback (later becomes overlay)
- `/index` Fast-access collection index
- `/reading-room` Poetry and literary work
- `/archive` Biography/CV/project documents
- `/exit` Narthex/departure

## Reusable spatial components

1. Threshold
2. Gallery
3. Garden
4. Corridor / cloister
5. Utility room
6. Grotto specialized template

## V1 interaction rules

- Native links remain the underlying navigation mechanism.
- Scroll communicates sustained attention inside long galleries.
- No forced auto-advance.
- No camera simulation.
- No required sound.
- Map and Index remain available as recovery mechanisms.
- Mobile translates spatial qualities instead of reproducing desktop geometry.

## Implementation phases

### Phase 1 — Skeleton (this package)
Routes, semantic structure, responsive architecture, plain CSS environments.

### Phase 2 — Real artwork
Replace placeholders with optimized real exhibition images and validate pacing.

### Phase 3 — Spatial transitions
Add environmental transitions with CSS first: gradients, masks, opacity, light fields, texture.

### Phase 4 — Circadian layer
One site-wide architectural-time state drives CSS variables. Avoid per-room animation engines.

### Phase 5 — Optional media
Add corridor video/sound only where CSS cannot accomplish the intended perceptual effect.

### Phase 6 — Audit and launch
WCAG 2.2 AA, keyboard, screen-reader, reduced-motion, mobile, performance, metadata, social sharing, final deployment.
