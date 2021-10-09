import jsdom from 'jsdom'
import puppeteer from 'puppeteer'

export function getWindow(htmlString: string) {
  const { JSDOM } = jsdom
  const dom = new JSDOM(htmlString)
  const { window } = dom
  return window
}

export async function getHTMLFromChrome(url: string) {
  const browser = await puppeteer.launch()
  const puppet = await browser.newPage()
  await puppet.goto(url)
  const htmlString = await puppet.content()
  await browser.close()
  return htmlString
}

export async function getDocument(url: string) {
  const htmlString = await getHTMLFromChrome(url).catch((_e) => '')
  const { document } = getWindow(htmlString)
  return document
}
