const { parse } = require("node-html-parser");
// create class
class Sraper {
  constructor(url) {
    this.response = this.init(url);
  }
  // init fetch request
  async init(url) {
    const rest = await fetch(url);
    return await rest.text();
  }
  // get meta tags from html
  async getAttribute(tag) {
    const root = parse(await this.response);
    const text = root.querySelector(tag).getAttribute("content");
    return text;
  }
  // get tags from html
  async getText(tag) {
    const root = parse(await this.response);
    const text = root.querySelector(tag).text;
    return text;
  }
}
// create instance of class and set site to scrape
const scrape = new Sraper("https://www.youtube.com/watch?v=WWpn6X-jzQ0");
// get title tag from html
const title = await scrape.getText("title");
// get meta tag "keywords" from html
const metaKeywords = await scrape.getAttribute("meta[name='keywords']");
// print results
console.log(title);
console.log(metaKeywords);
