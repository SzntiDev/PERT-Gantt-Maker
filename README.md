<div align="center">

<!-- Replace with your own banner screenshot -->
<!-- <img src="docs/banner.png" alt="PERT & Gantt Generator" width="100%" /> -->

# 🗓️ PERT & Gantt Chart Generator

**Automatically generate PERT network diagrams and Gantt charts from task tables with Critical Path Method (CPM) analysis.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev)

[Features](#-features) · [Getting Started](#-getting-started) · [Usage](#-usage) · [Algorithm](#-algorithm) · [Contributing](#-contributing) · [License](#-license)

</div>

---

## ✨ Features

- **📊 Interactive Task Table** — Add, edit, and remove tasks with ID, duration, and precedence relationships
- **🔗 PERT Network Diagram** — Auto-generated Activity-on-Arrow (AOA) network using [vis-network](https://visjs.github.io/vis-network/docs/network/)
- **📅 Gantt Chart** — Custom SVG-based Gantt chart with animated bars and time scale
- **🔴 Critical Path Detection** — Automatically identifies and highlights the critical path in both diagrams
- **⏱️ CPM Calculations** — Full forward/backward pass with Early Start, Early Finish, Late Start, Late Finish, and Slack
- **👻 Dummy Activities (Ficticias)** — Proper handling of fictitious activities to maintain network integrity
- **🌙 Dark Mode UI** — Premium glassmorphism design with smooth animations
- **📱 Responsive** — Works across desktop and tablet screens

## 📸 Screenshots

<div align="center">

<!-- Add your own screenshots here -->
<!-- Example: -->
<!-- <img src="docs/screenshot-table.png" alt="Task Table" width="30%" /> -->
<!-- <img src="docs/screenshot-pert.png" alt="PERT Diagram" width="30%" /> -->
<!-- <img src="docs/screenshot-gantt.png" alt="Gantt Chart" width="30%" /> -->

| Task Input Table | PERT Network | Gantt Chart |
|:---:|:---:|:---:|
| `docs/screenshot-table.png` | `docs/screenshot-pert.png` | `docs/screenshot-gantt.png` |

> 📷 *Replace the placeholders above with actual screenshots of the application.*

</div>

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pert-gantt-generator.git
cd pert-gantt-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

### 1. Define Your Tasks

Enter your project tasks in the table:

| Field | Description | Example |
|-------|-------------|---------|
| **ID** | Unique task identifier | `A`, `B`, `C` |
| **Duration** | Task duration (in time units) | `3`, `5`, `8` |
| **Precedences** | Comma-separated list of predecessor task IDs | `A, B` |

### 2. Generate Diagrams

Click the **"Generar"** (Generate) button to automatically compute:
- The critical path
- Early/Late start and finish times
- Slack for each task
- PERT network with dummy activities
- Gantt chart with bar visualization

### 3. Interact with the Charts

- **PERT Diagram**: Drag nodes, zoom in/out, and hover for details
- **Gantt Chart**: Scroll horizontally to view the full timeline

## ⚙️ Algorithm

The application implements the **Critical Path Method (CPM)** with the following steps:

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Parse Tasks &  │────▶│ Topological  │────▶│  Forward Pass    │
│  Build Graph    │     │    Sort      │     │  (ES, EF)        │
└─────────────────┘     └──────────────┘     └────────┬─────────┘
                                                       │
┌─────────────────┐     ┌──────────────┐     ┌────────▼─────────┐
│  Build AOA      │◀────│ Identify     │◀────│  Backward Pass   │
│  PERT Network   │     │ Critical Path│     │  (LS, LF, Slack) │
└─────────────────┘     └──────────────┘     └──────────────────┘
```

### PERT Node Structure

Each event node in the PERT diagram displays:

```
┌──────────────┐
│   Event ID   │
│──────────────│
│ ET: X | LT: Y│
└──────────────┘
```

- **ET (Early Time)**: Earliest the event can occur
- **LT (Late Time)**: Latest the event can occur without delaying the project

### Dummy Activities (Ficticias)

Dummy activities (shown as **dashed arrows** with duration = 0) are automatically inserted to:
- Maintain correct dependency relationships in the AOA network
- Avoid ambiguity when multiple tasks share start/end events
- Preserve the uniqueness constraint of the network

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React](https://react.dev) | UI framework & state management |
| [Vite](https://vite.dev) | Build tool & dev server |
| [vis-network](https://visjs.github.io/vis-network/) | PERT network graph rendering |
| [Lucide React](https://lucide.dev) | UI icons |
| Vanilla CSS | Glassmorphism styling & animations |
| SVG | Custom Gantt chart rendering |

## 📁 Project Structure

```
src/
├── components/
│   ├── PertChart.jsx      # PERT network diagram (vis-network)
│   └── GanttChart.jsx     # SVG-based Gantt chart
├── utils/
│   └── cpm.js             # CPM algorithm engine
├── App.jsx                # Main application component
├── App.css                # Global styles & design system
├── index.css              # CSS entry point
└── main.jsx               # React entry point
```

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- PERT/CPM methodology based on coursework materials by **César Grané** (Cátedra Juan José Gilli)
- Network visualization powered by [vis.js](https://visjs.org/)

---

<div align="center">

Made with ❤️ for project management enthusiasts

</div>
