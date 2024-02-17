import {defineConfig} from "../src/node/server";
import {lessPlugin} from "./plugins/less";

export default defineConfig({
    plugins: [lessPlugin()]
})
