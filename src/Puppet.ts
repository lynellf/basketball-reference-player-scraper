import jsdom from 'jsdom'
import puppeteer from 'puppeteer'

export function getWindow(htmlString: string) {
  const { JSDOM } = jsdom
  const dom = new JSDOM(htmlString)
  const { window } = dom
  return window
}

export async function getHTMLFromChrome(url: string) {
  const init = await puppeteer.launch()
  const puppet = await init.newPage()
  await puppet.goto(url)
  const htmlString = await puppet.content()
  return htmlString
}

export async function getDocument(url: string) {
  const htmlString = await getHTMLFromChrome(url).catch((_e) => '')
  const { document } = getWindow(htmlString)
  return document
}
