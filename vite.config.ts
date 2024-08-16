import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import { fileURLToPath, URL } from "url";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslint({
			exclude: ["**/node_modules/**", "./dist/**"],
		}),
		svgLoader({ defaultImport: "url" }),
	],
	resolve: {
		alias: [{ find: "@/", replacement: fileURLToPath(new URL("./src/", import.meta.url)) }],
	},
	build: {
		outDir: "dist/main/",
	},
});
