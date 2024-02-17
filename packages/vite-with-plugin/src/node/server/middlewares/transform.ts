import {NextHandleFunction} from "connect";
import {cleanUrl, isJSRequest} from "../../utils";
import path from 'path'
import { transform } from "esbuild";
import { readFile} from "fs-extra";
import {getCodeWithSourcemap} from "../sourcemap";


export function transformMiddleware(): NextHandleFunction {
    return async function viteTransformMiddle(req, res, next) {
        if (req.method !== 'GET') {
            return next()
        }

        const url: string = cleanUrl(req.url!)

        if (isJSRequest(url)) {
            const result = await doTransform(url)
            if (result) {
                const code = getCodeWithSourcemap(result.code, result.map)
                res.setHeader('Content-Type', 'application/javascript')
                return res.end(code)
            }
        }
        next()
    }
}

export async function doTransform(url: string) {
    const extname = path.extname(url).slice(1)
    const file = url.startsWith('/') ? '.' + url : url
    const rawCode = await readFile(file, 'utf-8')

    // 将 js ts tsx jsx 都编译成浏览器可以识别的 esm 格式
    const { code, map } = await transform(rawCode, {
        target: 'esnext',
        format: 'esm',
        sourcemap: true,
        loader: extname as 'js' | 'ts' | 'tsx' | 'jsx'
    })

    return {
        code,
        map
    }
}
