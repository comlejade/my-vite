import { subModule } from './sub-module.ts';
import {ReactComponent} from "./react-component.tsx";

import './style/style.css'
import './style/less-test.less'

const app = document.getElementById('app')
app!.innerText = 'Hello world'

subModule(app!);

const comp = ReactComponent()
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('react-root'))
root.render(comp)
