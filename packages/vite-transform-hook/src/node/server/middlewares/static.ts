import { NextHandleFunction } from 'connect'
import sirv from 'sirv'

export function staticMiddleware(dir: string): NextHandleFunction {
    const serveFromRoot = sirv(dir, {dev: true})
    return async (req, res, next) => {
        serveFromRoot(req, res, next)
    }
}
