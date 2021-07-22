var log4js = require('log4js')
// var logger = log4js.getLogger()
// logger.level = 'debug'
log4js.configure({
    appenders:{cheese:{ type:"file", filename:"cheese.log"}},
    categories:{default:{appenders:["cheese"], level:'error'}}
})
var logger = log4js.getLogger("cheese")
const  url = require('url')
const  urlObj = {

}

const urlString = 'https://www.baidu.com:443/path/'
console.log(url.format(urlString))
// logger.debug(url.parse(urlString))
// logger.debug(url.format(urlObj))