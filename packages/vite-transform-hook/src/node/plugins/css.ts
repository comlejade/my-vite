import { Plugin } from "../server/plugin.ts";
import {isCSSRequest} from "../utils.ts";
import {isLessRequest} from "../../../playground/plugins/less.ts";
import * as less from "less";
import {dirname} from "path";
import postcss from "postcss";
import atImport from "postcss-import";

export function cssPlugin(): Plugin {
    return {
        async transform(code, url) {
            if (isCSSRequest(url)) {
                const file = url.startsWith('/') ? '.' + url : url

                if (isLessRequest(url)) {
                    const lessResult = await less.render(code, {
                        paths: [dirname(file)]
                    })

                    code = lessResult.css
                }

                const { css } = await postcss([atImport()]).process(code, {
                    from: file,
                    to: file
                })

                return css
            }
        }
    }
}


export function cssPostPlugin(): Plugin {
    return {
        async transform(code, url) {
            if (isCSSRequest(url)) {
                return `
                    var style = document.createElement('style')
                    style.setAttribute('type', 'text/css')
                    style.innerHTML = \`${code}\`
                    document.head.appendChild(style)
                `
            }
        }
    }
}
