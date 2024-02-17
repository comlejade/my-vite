import { Plugin} from "../server/plugin.ts";
import {transformPlugin} from "./transform.ts";
import {cssPlugin} from "./css.ts";
import {staticPlugin} from "./static.ts";

export function loadInternalPlugins(): Plugin[] {
    return [
        transformPlugin(),
        cssPlugin(),
        staticPlugin()
    ]
}
