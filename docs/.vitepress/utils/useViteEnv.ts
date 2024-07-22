import { loadEnv } from "vite";

export default function useViteEnv() {
	function getEnv() {
		return loadEnv(process.env.NODE_ENV ?? "dev", process.cwd());
	}
	function getEnvBy(key: string, defaultValue: unknown = null): unknown {
		return getEnv()?.[key] ?? defaultValue;
	}

	return { getEnv, getEnvBy };
}
