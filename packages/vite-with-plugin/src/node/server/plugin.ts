import {ViteDevServer} from "./index.ts";

export type ServerHook = (server: ViteDevServer) => void | Promise<void>

export interface Plugin {
    configureServer?: ServerHook;
}
