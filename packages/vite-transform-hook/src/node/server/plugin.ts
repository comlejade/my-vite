import {ViteDevServer} from "./index.ts";

export type ServerHook = (server: ViteDevServer) => void | Promise<void>

export type TransformResult = string | null | void

export type TransformHook = (code: string, id: string) => Promise<TransformResult> | TransformResult


export interface Plugin {
    configureServer?: ServerHook;
    transform?: TransformHook;
}
