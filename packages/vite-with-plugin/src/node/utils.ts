
export const queryRE = /\?.*$/s
export const hashRE = /#.*$/s

// 去掉hash和query参数
export const cleanUrl = (url: string): string => url.replace(hashRE, '').replace(queryRE, '')

const knownJsSrcRE = /\.((j|t)sx?)$/
export const isJSRequest = (url: string): boolean => {
    url = cleanUrl(url)
    return knownJsSrcRE.test(url)
}


const cssLangRE = new RegExp(/\.css$/)
export const isCSSRequest = (request: string): boolean => cssLangRE.test((request))
