import serve from 'koa-static'


export async function getChapters (ctx) {
  ctx.body = '<h1>Index</h1>'
}

export async function getImgs (ctx) {
  const type = ctx.query.type
  const data = await Crawler.request('http://112.74.34.241:3000/meizi/random?type=%E5%8F%B0%E6%B9%BE')
  const url = JSON.parse(data).url

  ctx.body = {
    url: url
  }
}
