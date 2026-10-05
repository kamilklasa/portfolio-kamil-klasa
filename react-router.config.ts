import type { Config } from "@react-router/dev/config";
import { prerenderPaths } from "./app/config/prerender";
export default {
  ssr: false,
  prerender: prerenderPaths,
  future: {
    v8_middleware: false,
    v8_splitRouteModules: false,
    v8_viteEnvironmentApi: false,
    v8_passThroughRequests: false,
    v8_trailingSlashAwareDataRequests: false,
  },
} satisfies Config;
