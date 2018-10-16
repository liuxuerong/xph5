/*
    环境切换
    baseUrl: 域名地址
    rounterMode: 路由模式
    imgBaseUrl: 图片所在域名地址
*/

let baseUrl = ''
let routerMode = 'hash'
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
  imgBaseUrl = '/img/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.test.jdhoe.com/'
  imgBaseUrl = 'https://resource.upinstar.com/'
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
