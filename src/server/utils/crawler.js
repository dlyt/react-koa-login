import http from 'http'
import Request from 'request'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'


export function getSearchLists(url) {
  return new Promise(function(resolve, reject) {
    Request(url, function (err, res, body) {
     if (!err) {
       let results = []

       const $ = cheerio.load(body)

       const list = $('.result-item-title a')

       for (let i = 0, len = list.length; i < len; i++ ) {
         let name = list[i].attribs.title
         let url = list[i].attribs.href

         results.push({
           name: name,
           url: url,
         })
       }
       resolve(results)
     }
     else {
       reject(err)
     }
   })
  })
}

export async function getNovel($, id) {
  const list = $('#list a')

  for (let i = 0, len = list.length; i < len; i++ ) {
    let title = list[i].children[0].data
    let href = list[i].attribs.href
    let num = href.substring(0,href.length - 5)

    let chapter = new Chapter({
      title: title,
      postfix: href,
      number: i,
      novel: id,
    })

    await chapter.save()
  }
}

export function getChapterContent(url) {
  return new Promise(function(resolve, reject) {
    Request({url: url, encoding: null}, function (err, res, body) {
      if (!err) {
        const html = iconv.decode(body, 'gb2312')
        const $ = cheerio.load(html, {decodeEntities: false})
        const content = $('#content').text()
        resolve(content)
      }
      else {
        reject(err)
      }
    })
  })
}

export function getHtml(url) {
  return new Promise(function(resolve, reject) {
    Request({url: url, encoding: null}, function (err, res, body) {
     if (!err) {
       const html = iconv.decode(body, 'gb2312')
       const $ = cheerio.load(html, {decodeEntities: false})
       resolve($)
     }
     else {
       console.log(err);
       reject(err)
     }
   })
  })
}

export function getBody(url) {
  return new Promise(function(resolve, reject) {
    Request({url: url, encoding: null}, function (err, res, body) {
     if (!err) {
       const _body = iconv.decode(body, 'gb2312')
       resolve(_body)
     }
     else {
       reject(err)
     }
   })
  })
}

export function request(url) {
  return new Promise(function(resolve, reject) {
    http.get(url, function(res) {
      let body = ''

      res.on('data', function(data) {
        body += data
      })
      res.on('end', function() {
        resolve(body)
      })
    }).on('error', function(e) {
      reject(e)
    })
  })
}

async function saveChapters (url, list, first, last) {
  for (let i = first; i < last; i++ ) {
    let title = list[i].children[0].data
    let href = list[i].attribs.href
    let num = href.substring(0,href.length - 5)
    let contentUrl = `${url}${href}`
    let content = await getContent(contentUrl)

    let chapter = new Chapter({
      title: title,
      number: num,
      content: content
    })

    await chapter.save()
  }

  return true
}
