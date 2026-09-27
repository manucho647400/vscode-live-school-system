# How to Run the Live School System Extension in VS Code

## Prerequisites
- **Node.js** (v16+) installed on your system
- **VS Code** (v1.95 or later)
- **Git** (optional, for cloning)

## Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone https://github.com/manucho647400/vscode-live-school-system.git
cd vscode-live-school-system
```

### 2. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

This installs TypeScript and VS Code types needed to build the extension.

### 3. Compile TypeScript
```bash
npm run compile
```

This compiles `src/extension.ts` into JavaScript in the `dist/` folder.

### 4. Open the Extension Folder in VS Code
```bash
code .
```

Or if already open, just make sure you're in the project root.

### 5. Launch the Extension

**Press `F5`** to start the extension in debug mode.

This will:
- Compile the TypeScript automatically
- Open a new VS Code window called **"Extension Development Host"**
- Load your extension in that window

### 6. Open the Dashboard

In the **Extension Development Host** window:

1. **Press `Ctrl+Shift+P`** (Mac: `Cmd+Shift+P`) to open the Command Palette
2. Type: `School: Open Live School System Dashboard`
3. Press **Enter**

The live dashboard will open in a webview panel inside VS Code.

## What You'll See

- **Real-time stats**: Teachers online, active students, class schedules
- **Class schedule**: Live class timetable with status indicators
- **Attendance**: Animated donut chart showing attendance rate
- **Student progress**: Tracking student performance and status
- **Assignments**: Due dates and completion rates
- **Announcements**: School-wide alerts and notifications
- **Live updates**: Student data updates every 3 seconds (simulated)

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Launch extension | `F5` | `F5` |
| Reload extension | `Ctrl+Shift+F5` | `Cmd+Shift+F5` |
| Open Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Toggle DevTools | `Ctrl+Shift+I` | `Cmd+Option+I` |

## Debugging

While the extension is running:

1. **Open the Debug Console**: Go to **View → Debug Console** or press `Ctrl+Shift+Y`
2. **Toggle DevTools**: Press `Ctrl+Shift+I` in the webview to inspect the dashboard HTML/CSS
3. **View Extension Logs**: Check the **Debug Console** for any errors

## Troubleshooting

### `npm install` fails
- Update Node.js to the latest LTS version
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

### Extension doesn't appear
- Make sure `dist/extension.js` exists after running `npm run compile`
- Restart the Extension Development Host (press `Ctrl+Shift+F5`)
- Check the Debug Console for errors

### Dashboard is blank
- Open DevTools (`Ctrl+Shift+I`)
- Check the Console tab for JavaScript errors
- Verify the webview HTML is rendering

## Development Workflow

### Make code changes:
```bash
npm run watch
```

This starts TypeScript in watch mode, automatically recompiling when you save.

### Reload the extension:
- Press `Ctrl+Shift+F5` in the Extension Development Host window
- Changes appear immediately

## Project Structure

```
vscode-live-school-system/
├── src/
│   └── extension.ts          # Main extension logic & webview dashboard
├── dist/
│   └── extension.js          # Compiled JavaScript (auto-generated)
├── package.json              # Extension manifest & dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Overview
```

## Next Steps

- **Customize data**: Edit mock data in `src/extension.ts` (students, assignments, etc.)
- **Add real data**: Connect to a backend API to fetch live school data
- **Enhance UI**: Modify the HTML/CSS in the `getHtml()` method
- **Add features**: Implement real-time WebSocket updates, user authentication, etc.

## Publishing

When ready to publish to the VS Code Marketplace:

1. Install `vsce`: `npm install -g vsce`
2. Create a publisher account at https://marketplace.visualstudio.com
3. Run: `vsce publish`

---

**Happy coding!** 🎓
