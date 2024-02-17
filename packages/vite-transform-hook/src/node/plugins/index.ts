import { Plugin} from "../server/plugin.ts";
import {cssPlugin, cssPostPlugin} from "./css.ts";
import {staticPlugin} from "./static.ts";
import {esbuildPlugin} from "./esbuild.ts";

export function loadInternalPlugins(): Plugin[] {
    return [
        esbuildPlugin(),
        cssPlugin(),
        cssPostPlugin(),
        staticPlugin()
    ]
}
