import { Plugin } from "../server/plugin.ts";
import {staticMiddleware} from "../server/middlewares/static.ts";
import path from "path";

export function staticPlugin(): Plugin {
    const root = path.resolve('./')
    return {
        configureServer(server) {
            server.app.use(staticMiddleware(root))
        }
    }
}
