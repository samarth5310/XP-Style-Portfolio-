# 🖥️ Windows XP Portfolio

A fully interactive Windows XP-themed personal portfolio website built with Next.js, TypeScript, Tailwind CSS & Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

## ✨ Features

- **Boot Sequence** — Authentic XP loading screen with animated progress bar
- **Login Screen** — Click-to-login with startup sound
- **Draggable & Resizable Windows** — Full window management with react-rnd
- **Snap to Fullscreen** — Drag window to top edge to maximize
- **Taskbar** — Start button, open window list, system tray with live clock
- **Start Menu** — Two-column layout with All Programs flyout & Recently Used submenu
- **Right-Click Context Menu** — XP-style desktop context menu with Refresh
- **CRT Scanline Effect** — Toggleable retro CRT overlay
- **Fullscreen Mode** — Toggle from system tray
- **Shutdown/Restart Modal** — Grayscale desktop effect

## 🗂️ Apps

| App | Description |
|-----|-------------|
| About Me | Explorer-style with collapsible sidebar, skills & social links |
| My Projects | Dark-themed project gallery with cards & live links |
| My Resume | A4 paper resume with auto-zoom scaling |
| Contact Me | Outlook-style email composer |
| Terminal | CMD with custom commands (help, about, skills, projects, contact) |
| Paint | Embedded [jspaint.app](https://jspaint.app) |
| Music Player | Interactive [mikutap](https://aidn.jp/mikutap/) |
| Smash Karts | Online multiplayer game via [smashkarts.io](https://smashkarts.io) |

## 🏗️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Window Management:** react-rnd
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main app (Boot → Login → Desktop)
│   ├── layout.tsx            # SEO metadata
│   └── globals.css           # Tailwind + CRT effect
├── constants.ts              # Portfolio data, icons, projects
├── types.ts                  # TypeScript interfaces
├── components/
│   ├── XPIcons.tsx           # Windows flag SVG
│   ├── screens/
│   │   ├── LoadingScreen.tsx # XP boot animation
│   │   ├── LoginScreen.tsx   # User login with sound
│   │   ├── DesktopScreen.tsx # Desktop orchestrator
│   │   └── ShutdownModal.tsx # Restart/Log Off modal
│   ├── os/
│   │   ├── Window.tsx        # Draggable/resizable window
│   │   ├── Taskbar.tsx       # Start button, tray, clock
│   │   ├── StartMenu.tsx     # Two-column start menu
│   │   └── DesktopIcon.tsx   # Desktop shortcut icons
│   └── apps/
│       ├── AboutMe.tsx       # Portfolio about page
│       ├── MyProjects.tsx    # Project showcase
│       ├── MyResume.tsx      # A4 resume viewer
│       ├── ContactMe.tsx     # Email composer
│       └── Terminal.tsx      # Command prompt
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## 📝 Customization

Edit `src/constants.ts` to update:
- Your name, role, and contact info
- Project list with links
- Social media URLs
- Icon assets

## 📄 License

MIT

---

Built with ❤️ by **Samarth K**
