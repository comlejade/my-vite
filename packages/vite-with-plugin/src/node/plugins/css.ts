import { Plugin } from "../server/plugin.ts";
import {cssMiddleware} from "../server/middlewares/css.ts";

export function cssPlugin(): Plugin {
    return {
        configureServer(server) {
            server.app.use(cssMiddleware())
        }
    }
}
