# GSMB Mining License Verification System (MERN) — v2 (Sri Lanka ready)

This build adds **GSMB owner registration**, **license creation linked to owners**, **police detailed lookup for valid/invalid**, and **temporary suspension + reinstatement after fines**.

References (Sri Lanka):
- Mines & Minerals Act requires a licence to **mine or transport** minerals. citeturn0search9
- GSMB states transport of minerals requires a **transport licence**; licensing information and forms are provided officially. citeturn0search2turn0search0
- Govt announced changes and online processing for transport permits in recent years (context for e-permit flows). citeturn0search13turn0search1

## Quick Start
Backend
```bash
cd server
cp .env.example .env  # set PORT, JWT_SECRET, DB_URL, ORIGIN
npm i
npm run seed
npm run dev
```
Frontend
```bash
cd client
npm i
npm run dev
```
Demo Accounts (after seed): `admin@gov.lk`, `police@gov.lk`, `gsmb@gov.lk`, `owner@mine.lk` with `Password@123`.

## New API (v2)
- `POST /api/gsmb/owners` (GSMB/Admin): create owner `{email,name,phone,password}`
- `GET /api/gsmb/owners` (GSMB/Admin): list owners
- `POST /api/gsmb/licenses/:id` enhanced: accepts `{ ownerEmail | ownerId, lorryNumber, siteName, expiresAt, routeGeoJson }`. If `ownerEmail` doesn't exist, **creates owner** automatically.
- `GET /api/police/lookup?lorryNumber=LL-2345`: returns **full details** for police even if status is **ACTIVE (valid)**.
