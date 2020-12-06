//Get all internal weblinks from medium.com
const https = require('https')
const cheerio = require('cheerio');
const { writeFileSync } = require('fs');


function getLink(path = '') {
  const directory = __dirname + '/output.txt'

  //If user has provided an output path use that else use base directory as the output path
  const writablePath = path ? path : directory

  //Creates random delay upto 200ms to avoid throttling
  const randomDelay = async () => {
    const randomNumber = parseInt(Math.random() * 1000)
    const finalDelay = randomNumber > 200 ? 200 : randomNumber
    new Promise(resolve => setTimeout(resolve, finalDelay))
  }

  //Fetches all the links from the current url
  this.getlinks = async (url) => {

    await randomDelay()

    return new Promise((resolve, rej) => {
      const _baseUrl = new URL(url).origin

      https.get(url, response => {

        if (response.statusCode == 200) {
          let html = ''
          response.on('data', (chunk) => {

            html += chunk
          })
          response.on('end', () => {

            let internalUrls = [url]
            const $ = cheerio.load(html)
            $('div.ap, div.ew').get().forEach(async (div) => {

              try {
                const regxStr = /^https?:\/\/([a-zA-Z\d-]+\.){0,}medium\.com/i
                const httpsCheck = 'https://'
                const redirectCheck = /redirect/ig
                const a = $(div)
                let link = a.find('a').attr('href')

                if (link != undefined && (regxStr.test(link) || !link.startsWith(httpsCheck)) && !redirectCheck.test(link)) {
                  link = !link.startsWith(httpsCheck) ? `${_baseUrl}${link}` : link

                  if (!internalUrls.includes(link)) {
                    //Append current link to the list of links
                    internalUrls = [link, ...internalUrls]
                    writeFileSync(writablePath, link + '\n', { flag: 'a+' })
                    internalUrls.concat(await this.getlinks(link))
                  }
                }

              } catch (err) {
                console.error('parse error', err)
              }
            })

            return resolve(internalUrls)
          })
        }
      }).on('error', e => {
        console.error(e)
        return rej(e)
      })
    })
  }

}

module.exports = { getLink }