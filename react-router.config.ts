import type { Config } from "@react-router/dev/config";
import { prerenderPaths } from "./app/config/prerender";
export default {
  ssr: false,
  prerender: prerenderPaths,
} satisfies Config;
