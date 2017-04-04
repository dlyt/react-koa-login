//全局函数

import nodemailer from  'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import wellknown from 'nodemailer-wellknown'
import app from '../../../../bin/server'
import * as Redis from '../redis'

const handle = {}

//统计api访问量
handle.count = async (key) => {
  try {
    let num = await Redis.get(key)
    let newNum = num === 'NaN' ? 0 : parseInt(num) + 1
    await Redis.set(key, newNum)
  } catch (e) {
    Handle.sendEmail(e.message)
  }
}

handle.success = (data = {}) => {
  return {
    success: true,
    code: 0,
    data: data
  }
}

//报错时，发送邮件
handle.sendEmail = (mes) => {

  const config = wellknown("QQ")
  config.auth = {
    user: '',
    pass: '',
  }

  const transporter = nodemailer.createTransport(smtpTransport(config))

  const mailOptions = {
      from: '',
      to: '',
      subject: '妈的又出Bug了，赶紧去调。',
      text: '',
      html: mes,
  }

  if (app.env === 'production') {
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error)
        }
        else {
          console.log('Message sent: ' + info.response)
        }

    })
  }

}




module.exports = handle
