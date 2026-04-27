# Nur İletişim Vodafone — Site vitrine

Site vitrine pour la boutique **Nur İletişim Vodafone** (Kartal/İstanbul) — vente de téléphones (neufs et reconditionnés), services Vodafone, recharges mobiles et atelier de réparation. Interface 100 % en turc avec un design inspiré d'Apple.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Drizzle ORM** + **Turso** (libSQL/SQLite cloud) — fallback local SQLite en dev
- **Vercel Blob** pour l'upload d'images — fallback `public/uploads/` en dev
- **iron-session** + **bcrypt** pour l'auth admin

## Démarrage local

```bash
npm install
cp .env.local.example .env.local
npm run db:migrate     # crée local.db et applique le schéma
npm run db:seed        # ajoute 6 téléphones de démo
npm run dev
```

Ouvrir http://localhost:3000.

En dev, sans `ADMIN_PASSWORD_HASH` défini dans `.env.local`, le mot de passe admin est **`admin`**. Page de login : http://localhost:3000/admin/giris.

## Configuration production

Dans `.env.local` (et sur Vercel) :

```
TURSO_DATABASE_URL=libsql://<your-db>.turso.io
TURSO_AUTH_TOKEN=<token>
BLOB_READ_WRITE_TOKEN=<auto-injected by Vercel Blob>
ADMIN_PASSWORD_HASH=<bcrypt hash, voir ci-dessous>
SESSION_SECRET=<32+ caractères aléatoires>
NEXT_PUBLIC_SITE_URL=https://nuriletisim.vercel.app
```

### Générer le hash du mot de passe admin

```bash
npm run hash-password
# entrer le mot de passe à l'invite
# copier la ligne ADMIN_PASSWORD_HASH=... dans .env.local
```

### Setup Turso (database)

1. Créer un compte sur https://turso.tech
2. `turso db create nuriletisim`
3. `turso db show --url nuriletisim` → `TURSO_DATABASE_URL`
4. `turso db tokens create nuriletisim` → `TURSO_AUTH_TOKEN`
5. `npm run db:migrate` (en pointant vers Turso)

### Setup Vercel Blob

Sur le dashboard Vercel : Storage → Blob → Create. Le token `BLOB_READ_WRITE_TOKEN` est injecté automatiquement dans le projet.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run db:generate` | Génère une nouvelle migration Drizzle |
| `npm run db:migrate` | Applique les migrations |
| `npm run db:seed` | Réinitialise et insère les 6 téléphones de démo |
| `npm run db:studio` | Drizzle Studio (UI web pour inspecter la DB) |
| `npm run hash-password` | Génère un hash bcrypt pour `ADMIN_PASSWORD_HASH` |

## Structure

```
app/
├── (site)/              # Pages publiques (avec Header/Footer)
│   ├── page.tsx         # Anasayfa (homepage)
│   ├── telefonlar/      # Catalogue + détail produit
│   ├── hizmetler/       # Page services
│   └── iletisim/        # Page contact
├── admin/
│   ├── giris/           # Login
│   └── (panel)/         # Dashboard admin (auth requise)
│       ├── page.tsx     # Liste des téléphones
│       └── telefon/     # Création / édition
├── api/
│   ├── auth/            # Login / logout
│   ├── phones/          # CRUD téléphones
│   └── upload/          # Upload images
└── layout.tsx           # Root layout
components/              # Header, Footer, PhoneCard, ServiceCard, etc.
lib/
├── db/                  # Drizzle (schema, client, queries)
├── auth.ts              # iron-session + bcrypt
├── blob.ts              # Upload Vercel Blob (+ fallback local)
├── slug.ts              # Slug TR-aware
├── format.ts            # Formatage TRY
└── constants.ts         # Infos boutique, marques
scripts/                 # migrate, seed, hash-password
```

## Déploiement Vercel

1. `git init && git add . && git commit -m "Initial"`
2. Push vers GitHub.
3. Importer dans Vercel → connecter le repo.
4. Renseigner les variables d'env (voir ci-dessus).
5. Activer Vercel Blob dans Storage.
6. Déployer.

Après le premier deploy, lancer les migrations sur la Turso de production : `TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npm run db:migrate`.

## Mağaza bilgileri (constantes)

Toutes les infos boutique (adresse, téléphone, horaires, embed Google Maps) sont dans [`lib/constants.ts`](./lib/constants.ts). Pour modifier : éditer ce fichier puis redéployer.
