import connect from 'connect'
import http from 'http'
import path from 'path'
import {staticMiddleware} from "./middlewares/static";
import {transformMiddleware} from "./middlewares/transform";
import {cssMiddleware} from "./middlewares/css.ts";

export async function createServer() {
    const app = connect()
    const root = path.resolve('./')

    app.use(transformMiddleware())
    app.use(cssMiddleware())
    app.use(staticMiddleware(root))

    http.createServer(app).listen(3000)

    console.log('open http://localhost:3000/')
}
