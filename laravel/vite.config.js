import { defineConfig } from "vite";

import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

const host = "127.0.0.1";

export default defineConfig({
    server: {
        host,
        hmr: {
            host,
        },
        https: false,
    },
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
});
