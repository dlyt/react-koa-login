import Bookshelf from '../models/bookshelfs'
import Novel from '../models/novels'
import Chapter from '../models/chapters'
import Schedule from 'node-schedule'
import * as Crawler from './crawler'

import nodemailer from  'nodemailer'
import wellknown from 'nodemailer-wellknown'
import smtpTransport from 'nodemailer-smtp-transport'

export function start() {
  Schedule.scheduleJob('30 * * * * *', function () {
    update()
  })
}

async function update() {
  let crawlerList,      //获取所有需要更新提醒的小说
      $,                //DOM
      length,           //章节数量
      chapterArr,       //所有a标签里包含的数组
      count,
      postfix,          //爬取网站的后缀
      title,            //章节名称
      chapter           //章节数据，用于存储
  try {
    crawlerList = await Novel.find({type: 'VIP'})
  } catch (e) {
    Handle.sendEmail(e.message)
  }

  if (crawlerList) {
    for (let item of crawlerList.values()) {
      sendRemindEmail(item)
      try {
        $ = await Crawler.getHtml(item.url)
      } catch (e) {
        Handle.sendEmail(e.message)
      }

      chapterArr = $('#list dd a')
      length = $('#list dd').length
      count = parseInt(item.countChapter)
      if (count !== length) {
        for (let i = count; i < length; i++) {
          chapter = new Chapter({
            postfix: chapterArr[i].attribs.href,
            title: chapterArr[i].children[0].data,
            number: i + 1,
            novel: item.id
          })
          try {
            await chapter.save()
          } catch (e) {
            Handle.sendEmail(e.message)
          }
        }
      }
      else {
        return true
      }
      item.updateTime = $('#info p')[2].children[0].data.substring(5, $('#info p')[2].children[0].data.length)
      item.countChapter = length
      item.lastChapterTitle = chapterArr[length - 1].children[0].data
      try {
        await item.save()
      } catch (e) {
        Handle.sendEmail(e.message)
      }
    }
  }
  else {
    return true
  }
}


async function sendRemindEmail(novel) {
  let userEmails
  try {
    userEmails = await Bookshelf.find({novel: '58d5bea44aedd9c45cfa5968'})
                                .populate('user', ['email'])
                                .populate('novel', ['name'])
                                .exec()
  } catch (e) {
    Handle.sendEmail(e.message)
  }

  userEmails.forEach(function(item) {
    const email = item.user.email
    const name = item.novel.name
    const config = wellknown("QQ")
    config.auth = {
      user: '',
      pass: '',
    }

    const transporter = nodemailer.createTransport(smtpTransport(config))

    const mailOptions = {
        from: '',
        to: email,
        subject: `${name}更新了，Happy!`,
        text: '',
        html: '',
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
          Handle.sendEmail(error.message)
        }
        else {
          console.log('Message sent: ' + info.response)
        }

    })
  })
}
