import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import electron from "vite-plugin-electron"

export default defineConfig({
    plugins: [
        react(),
        electron({
            vite: {
                build: {
                    outDir: "dist-electron",
                    lib: {
                        entry: ["electron/main.ts"],
                        fileName: (f, n) => `${n}.${f}`,
                        formats: ["cjs"]
                    }
                }
            }
        })
    ]
})
