const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const PORT = 3000;

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const urls = [
        "https://www.amazon.in/Apple-iPhone-13-128GB-Starlight/dp/B09G9BL5CP/ref=sr_1_1_sspa?crid=2PLOROLB0LDZ8&dib=eyJ2IjoiMSJ9.OCoJgZ8ghdguKvc7Ozmt3MuV4EX2bqVAighnAy-84StpiRsfqUDXAr6MP3uGF_CaAWj_-SdqqZMgTxvDn4ecoY5o3NKofpinu7Qxj8VBX8WiS8j3aGwsnpVZL6sCobx7IaRqd3HYYtEjKVD_vvX-Qv7Rj_DtHUap8purz1ogJrLA85DOQkcpX9HmfvPntKjHgzeTx8hxLX_cYs-6y-aE1YZTBJIltgN4Nt6-br25Uig.QDKYY56CiC77klaDPUlZ2LKH8lbZn4C3U5XwqOxGCwo&dib_tag=se&keywords=iphone%2B13&qid=1708607284&sprefix=iphone%2B13%2B%2Caps%2C216&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
        "https://www.flipkart.com/apple-iphone-13-starlight-128-gb/p/itmc9604f122ae7f?pid=MOBG6VF5ADKHKXFX&lid=LSTMOBG6VF5ADKHKXFXZVXGTL&marketplace=FLIPKART&q=iphone+13&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&fm=Search&iid=b0547e56-3614-4dde-a761-89fe2f49e54d.MOBG6VF5ADKHKXFX.SEARCH&ppt=sp&ppn=sp&ssid=aop3up4e000000001708607266831&qH=c68a3b83214bb235",
        "https://www.apple.com/in/shop/buy-iphone/iphone-13"
    ];

    const scrapedData = [];

    for (const url of urls) {
        await page.goto(url);
        let price;
        let title;
        switch(url) {
            case urls[0]:
                price = await page.evaluate(() => {
                    const priceElement = document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole");
                    return priceElement ? priceElement.innerText : 'Price not found';
                });
                title = await page.evaluate(() => {
                    const titleElement = document.querySelector("#productTitle");
                    return titleElement ? titleElement.innerText : 'Title not found';
                });
                break;
            case urls[1]:
                price = await page.evaluate(() => {
                    const priceElement = document.querySelector("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d");
                    return priceElement ? priceElement.innerText : 'Price not found';
                });
                break;
            case urls[2]:
                price = await page.evaluate(() => {
                    const priceElement = document.querySelector("#root > div.rf-bfe > div.rf-bfe-header-wrapper > div.rf-bfe-header > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span.price-point.price-point-fullPrice > span.nowrap");
                    return priceElement ? priceElement.innerText : 'Price not found';
                });
                break;
        }
        scrapedData.push({ title, price });
    }

    await browser.close();
    return scrapedData;
}

app.get('/', async (req, res) => {
    const data = await scrapeData();
    let html = '<html><body>';
    //html += '<h2>${data[0].title}</h2>'
    data.forEach(item => {
        html += `<h2>${item.title}</h2>`;
        html += `<p>Price: ${item.price}</p>`;
        html += '<hr>';
    });
    html += '</body></html>';
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
