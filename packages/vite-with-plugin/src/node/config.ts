import { pathToFileURL } from 'url'
import { Plugin } from "./server/plugin.ts";
import * as process from "process";
import path from 'path'

export type ResolvedConfig = Readonly<{ plugins?: Plugin[] }>

export async function resolveConfig(): Promise<ResolvedConfig> {
    const configFilePath = pathToFileURL(path.resolve(process.cwd(), './vite.config.js'))
    console.log('configFilePath: ', configFilePath)
    const config = await import(configFilePath.href)
    console.log('config: ', config.default)
    return config.default
}
