import { Plugin } from "../server/plugin.ts";
import {isJSRequest} from "../utils.ts";
import {transform} from "esbuild";
import path from "path";

export function esbuildPlugin(): Plugin {
    return {
        async transform(code, url) {
            if (isJSRequest(url)) {
                const extname = path.extname(url).slice(1)
                const { code: resCode } = await transform(code, {
                    target: 'esnext',
                    format: 'esm',
                    sourcemap: true,
                    loader: extname as 'js'
                })

                return resCode
            }
        }
    }
}
