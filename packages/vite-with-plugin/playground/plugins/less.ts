import { Plugin } from '../../src/node/server/plugin.ts'
import {NextHandleFunction} from "connect";
import {cleanUrl} from "../../src/node/utils.ts";
import {readFile} from "fs-extra";
import * as less from "less";
import { dirname } from 'path'
import postcss from "postcss";
import atImport from "postcss-import";

export function lessPlugin(): Plugin {
    return {
        configureServer(server) {
            server.app.use(lessMiddleware())
        }
    }
}

const lessLangeRE = new RegExp(/\.less$/)
export const isLessRequest = (request: string): boolean => lessLangeRE.test(request)

function lessMiddleware(): NextHandleFunction {
    return async function viteLessMiddleware(req, res, next) {
        if (req.method !== 'GET') {
            return next()
        }

        const url = cleanUrl(req.url!)

        if (isLessRequest(url)) {
            const filePath = url.startsWith('/') ? '.' + url : url
            const rawCode = await readFile(filePath, 'utf-8')

            // 预处理器处理 less
            const lessResult = await less.render(rawCode, {
                // 用于 @import 查找路径
                paths: [dirname(filePath)]
            })

            // 后处理器处理css
            const postcssResult = await postcss([atImport()]).process(lessResult.css, {
                from: filePath,
                to: filePath
            })

            res.setHeader('Content-Type', 'application/javascript')
            return res.end(`
                var style = document.createElement('style')
                style.setAttribute('type', 'text/css')
                style.innerHTML = \`${postcssResult.css}\`
                document.head.appendChild(style)
            `)
        }

        next()
    }
}
