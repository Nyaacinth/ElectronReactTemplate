import { BrowserWindow, app } from "electron"
import serve from "electron-serve"
import windowStateKeeper from "electron-window-state"

const loadURL = serve({ directory: "dist" })

function createMainWindow() {
    const mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
    })

    const mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindowState.manage(mainWindow)

    if (import.meta.env.DEV) {
        const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL
        if (!VITE_DEV_SERVER_URL) {
            throw new Error("VITE_DEV_SERVER_URL is not defined. Please check vite development server status.")
        }
        mainWindow.loadURL(VITE_DEV_SERVER_URL)
    } else {
        loadURL(mainWindow)
    }

    mainWindow.once("ready-to-show", () => mainWindow.show())
}

app.whenReady().then(() => {
    createMainWindow()
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})
