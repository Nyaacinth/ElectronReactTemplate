import path from "node:path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import electron from "vite-plugin-electron/simple"

export default defineConfig({
    plugins: [
        react(),
        electron({
            main: {
                entry: "electron/main.ts"
            },
            preload: {
                input: path.join(__dirname, "electron/preload.ts")
            },
            renderer: process.env.NODE_ENV === "test" ? undefined : {}
        })
    ]
})
