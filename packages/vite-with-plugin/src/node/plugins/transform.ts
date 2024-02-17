import { Plugin } from "../server/plugin.ts";
import {transformMiddleware} from "../server/middlewares/transform.ts";

export function transformPlugin(): Plugin {
    return  {
        configureServer(server) {
            server.app.use(transformMiddleware())
        }
    }
}
