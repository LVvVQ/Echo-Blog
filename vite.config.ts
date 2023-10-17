import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const VITE_BACKEND_URL: string = loadEnv(
    mode,
    process.cwd(),
  ).VITE_BACKEND_URL;

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: VITE_BACKEND_URL,
        },
      },
    },
  });
};
