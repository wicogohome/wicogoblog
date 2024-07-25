import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslint({
			exclude: ["**/node_modules/**", "./dist/**"],
		}),
	],
	resolve: {
		alias: [{ find: "@/", replacement: fileURLToPath(new URL("./src/", import.meta.url)) }],
	},
	build: {
		outDir: "dist/main/",
	},
});
