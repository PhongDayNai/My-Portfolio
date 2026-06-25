# Premium Bilingual Developer Portfolio & CMS

A high-fidelity, interactive, and bilingual (English/Vietnamese) personal portfolio website integrated with a fully-featured, password-secured web-based admin dashboard (CMS). 

🔗 **Live Website:** [https://portfolio.phongdaynai.id.vn/](https://portfolio.phongdaynai.id.vn/)

This project is built using **Next.js 16.2.7**, **React 19**, **TailwindCSS v4**, **Framer Motion v12**, and is designed with rich dark aesthetics, custom cursor spotlight animations, and 3D interactive gallery components.

---

## 🌟 Key Features

### 1. High-Fidelity Frontend & Interactive UX
* **Spotlight Layout & Spring Cursor:** An elegant dark theme with a custom mouse cursor using `mix-blend-difference` contrast inversion and a spring-physics mouse spotlight follower (dynamic scaling and angling depending on cursor speed).
* **3D About Gallery Views:** The About section dynamically displays one of three premium gallery views on page refresh:
  * **`PhotoSphere`:** A full CSS 3D ring carousel with smooth perspective rotation.
  * **`PhotoStack`:** A 3D stacked image slider utilizing spring-motion physics.
  * **`SpotlightPhoto`:** A hover-spotlight card that dynamically casts a radial light over the active image, accompanied by an animated blurred backdrop aura.
* **Auto-Calculated Experience:** Experience duration is mathematically calculated in real-time from a designated `experienceStartDate` to display localized strings like *"over 3 years of hands-on experience"* or *"hơn 3 năm kinh nghiệm thực chiến"*.
* **Bilingual Architecture:** Seamless hot-swapping between English (EN) and Vietnamese (VI) languages for all text nodes, navigation bars, headers, and CMS fields.
* **Sub-repositories:** Projects card component supports nesting child repositories (sub-repos) for complex projects.

### 2. Password-Secured Administration Dashboard (CMS)
* **Secure Session Auth:** Dashboard endpoints (`/settings`) are guarded via [JWT tokens](file:///home/dhpho/workspace/My-Portfolio/src/lib/jwt.ts) stored in secure, HTTP-only session cookies.
* **Auto Setup Mode:** The system automatically boots into a Setup Page if no password is configured, allowing the administrator to securely initialize their credential hash on first run.
* **PBKDF2 Password Protection:** Plaintext passwords are hashed on the server using PBKDF2 with SHA-512, combined with unique random salts. Hashing verification uses `crypto.timingSafeEqual` to guard against timing attacks.
* **Content Management System:** A comprehensive fields editor supporting live CRUD operations:
  * Edit basic info (Name, role, contacts, social links).
  * Upload profile pictures and CV documents (.pdf, .docx, .doc up to 5MB) with automatic physical file cleanups upon deletion.
  * Re-order and toggle visibility (`show` property) for projects, skills, timeline items, and social media icons.
  * Complete translations editor to modify VI and EN values on the fly.

### 3. File System Database Engine
* **No Database Server Required:** Reads and writes portfolio data in real-time to a local JSON file: [portfolio.json](file:///home/dhpho/workspace/My-Portfolio/src/data/portfolio-default.json) (fallback to default on start).
* **Automated Data Migrations:** Built-in schema versioning (e.g., v1 to v2) that automatically migrates legacy profiles and merges newly added translation keys on startup without losing current content.
* **Safety Backups:** Automatically replicates a backup copy (`portfolio.json.bak`) on disk before saving any changes.
* **Schema Validation:** Strictly validates the JSON structure at runtime using [Zod schemas](file:///home/dhpho/workspace/My-Portfolio/src/lib/schema.ts).

---

## 🛠️ Tech Stack

* **Core Framework:** [Next.js 16.2.7](https://nextjs.org/) (App Router, Standalone Output Mode)
* **Runtime Library:** [React 19.2.4](https://react.dev/)
* **Styling Engine:** [TailwindCSS v4](https://tailwindcss.com/) & PostCSS
* **Animation Engine:** [Framer Motion v12.30.0](https://www.framer.com/motion/)
* **Icon Set:** [Lucide React 0.563.0](https://lucide.dev/)
* **Data Validation:** [Zod 3.23.8](https://zod.dev/)

---

## 📂 Project Architecture

```
├── .github/workflows
│   └── deploy.yml              # CI/CD Deployment Workflow
├── public/                     # Static resources (Favicons, assets)
│   ├── images/                 # Uploaded profile photos (Persistent volume)
│   ├── images-default/         # Default backup images
│   └── uploads/                # Uploaded CV files / documents (Persistent volume)
├── src/
│   ├── app/                    # Next.js App Router Structure
│   │   ├── api/auth/           # Auth API: login, logout, setup, status, change-password
│   │   ├── api/documents/      # CV document CRUD endpoint
│   │   ├── api/images/         # Profile photo CRUD endpoint
│   │   ├── login/              # Admin Login View
│   │   ├── settings/           # Admin Dashboard View
│   │   ├── actions.ts          # Next.js Server Action to update portfolio JSON
│   │   ├── layout.tsx          # Global HTML/Body wrap & dynamic SEO metadata generator
│   │   └── page.tsx            # Portfolio Main View (Renders HomeClient)
│   ├── components/             # Reusable UI Components
│   │   ├── SpotlightLayout.tsx # Cursor spring follower & background light beam
│   │   ├── PhotoSphere.tsx     # 3D Circular ring gallery
│   │   ├── PhotoStack.tsx      # 3D Stacked carousel
│   │   ├── SpotlightPhoto.tsx  # Dynamic spotlight hover photo card
│   │   ├── SettingsClient.tsx  # Admin page wrapper, tabs switcher & CV uploader
│   │   └── PortfolioEditor.tsx # CMS editor UI for general info, projects, skills, timeline
│   ├── constants/              # Translation maps and settings static values
│   ├── context/                # Context API providers (Language, PortfolioData)
│   ├── hooks/                  # Custom hooks (e.g., useIsMobile)
│   ├── lib/                    # Core server helpers
│   │   ├── auth.ts             # PBKDF2 hashing, salt generation, verifyPassword
│   │   ├── jwt.ts              # HS256 JWT Token sign / verify
│   │   ├── portfolio.ts        # portfolio.json load, save, and backup functions
│   │   ├── migrations.ts       # Database structure v1 -> v2 schema migrator
│   │   ├── schema.ts           # Zod verification validation rules
│   │   └── experience.ts       # Mathematical experience duration helper
│   └── proxy.ts                # Route protection proxy logic for Next.js Middleware
├── bootstrap.js                # Auto restores missing default images & json on mount
├── Dockerfile                  # Multi-stage production standalone build recipe
├── docker-compose.yml          # Container configuration with host volume permissions
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript configurations
```

---

## ⚙️ Environment Configurations

Create a `.env` file in the root directory (refer to [.env.example](file:///home/dhpho/workspace/My-Portfolio/.env.example)):

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `ADMIN_USERNAME` | `admin` | Username required to access `/settings`. |
| `ADMIN_PASSWORD_HASH` | *PBKDF2 Hash* | The hashed password string. Generated during Setup Page or via helper API. |
| `JWT_SECRET` | *Random string* | Secret key to sign session cookies. Change in production. |
| `PORTFOLIO_DATA_PATH` | *Optional* | Override path to save `portfolio.json`. Defaults to `src/data/portfolio.json`. |

> [!TIP]
> **Generating password hashes manually:**
> You can generate a PBKDF2 hash for any custom password by running the development server and visiting:
> `http://localhost:3000/api/auth/hash?password=YOUR_PASSWORD`

---

## 🚀 Installation & Local Development

### Prerequisites
* **Node.js:** v22.20.0 or higher
* **npm:** v10.0.0 or higher

### Steps
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/PhongDayNai/My-Portfolio.git
   cd My-Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the local development server:
   ```bash
   npm run dev
   ```

5. Access the app:
   * Main Portfolio page: [http://localhost:3000](http://localhost:3000)
   * Admin Settings Dashboard: [http://localhost:3000/settings](http://localhost:3000/settings)

---

## 🐳 Docker Deployment (Production)

The application includes a [Dockerfile](file:///home/dhpho/workspace/My-Portfolio/Dockerfile) and [docker-compose.yml](file:///home/dhpho/workspace/My-Portfolio/docker-compose.yml) configured for high-performance production hosting. It utilizes Next.js **Standalone Output Mode**, which packages only the necessary node modules for execution, keeping the resulting container size extremely small.

### Bootstrapping Lifecycle
When starting the Docker container:
1. `init-permissions` container executes first. It mounts `/app/data/my-portfolio` and enforces ownership (`chown -R 1001:1001`) so that the unprivileged `nextjs` user inside the main container can read and write files without encountering host-permission errors.
2. The main container boots [bootstrap.js](file:///home/dhpho/workspace/My-Portfolio/bootstrap.js). 
3. `bootstrap.js` checks if the persistent volume directory is empty (which happens on initial deployments or when mounting clean volumes). If so, it restores default images from `public/images-default` to `public/images`, and copies `portfolio-default.json` to create `portfolio.json`.
4. It finally boots the Next.js standalone server (`server.js`).

### Deploying via Docker Compose
1. Configure environment variables in `docker-compose.yml` or declare them in your host shell:
   ```bash
   export ADMIN_USERNAME=your_username
   export JWT_SECRET=your_jwt_secret_key
   ```
2. Build and start the containers in background daemon mode:
   ```bash
   docker compose up -d --build
   ```
3. The application will be exposed on port `2664`. You can test it at `http://localhost:2664`.

---

## 🔒 Security Measures

* **HTTP-Only Cookies:** Auth tokens are saved with the `httpOnly` flag to protect against Cross-Site Scripting (XSS) tokens leakage.
* **CSRF Mitigation:** Secure cookie declarations combined with strict routing configurations.
* **Path Traversal Protection:** Image and document deletion APIs strictly sanitize URLs and utilize `path.relative` checks to block attempts to delete files outside designated resource folders (e.g. `../` traversal).
* **Timing Attack Prevention:** Hashed credentials are verified using `crypto.timingSafeEqual` ensuring that validation cycles consume constant computation times regardless of correct characters match.
* **Upload Validation:** Size constraints (Max 5MB) and strict mimetype/extension checks (.pdf, .doc, .docx, .png, .jpg, .webp, .svg) are validated on the server side prior to writing payloads to disk.
