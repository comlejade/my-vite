import { subModule} from "./sub-module.js";

const app = document.getElementById('app')

if (app) {
    app.innerText = 'Hello world'
}

subModule(app)
