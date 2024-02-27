const puppeteer=require('puppeteer')
const fs=require("fs/promises")
const { Console } = require('console')
async function start(){
    const browser =await puppeteer.launch()
    const page=await browser.newPage()
    urls=["https://www.amazon.in/Apple-iPhone-13-128GB-Starlight/dp/B09G9BL5CP/ref=sr_1_1_sspa?crid=2PLOROLB0LDZ8&dib=eyJ2IjoiMSJ9.OCoJgZ8ghdguKvc7Ozmt3MuV4EX2bqVAighnAy-84StpiRsfqUDXAr6MP3uGF_CaAWj_-SdqqZMgTxvDn4ecoY5o3NKofpinu7Qxj8VBX8WiS8j3aGwsnpVZL6sCobx7IaRqd3HYYtEjKVD_vvX-Qv7Rj_DtHUap8purz1ogJrLA85DOQkcpX9HmfvPntKjHgzeTx8hxLX_cYs-6y-aE1YZTBJIltgN4Nt6-br25Uig.QDKYY56CiC77klaDPUlZ2LKH8lbZn4C3U5XwqOxGCwo&dib_tag=se&keywords=iphone%2B13&qid=1708607284&sprefix=iphone%2B13%2B%2Caps%2C216&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1","https://www.flipkart.com/apple-iphone-13-starlight-128-gb/p/itmc9604f122ae7f?pid=MOBG6VF5ADKHKXFX&lid=LSTMOBG6VF5ADKHKXFXZVXGTL&marketplace=FLIPKART&q=iphone+13&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_6_na_na_na&fm=Search&iid=b0547e56-3614-4dde-a761-89fe2f49e54d.MOBG6VF5ADKHKXFX.SEARCH&ppt=sp&ppn=sp&ssid=aop3up4e000000001708607266831&qH=c68a3b83214bb235","https://www.apple.com/in/shop/buy-iphone/iphone-13"]
    await page.goto(urls[0])
    await page.waitForSelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole")
    const price =await page.evaluate(()=>{
        const price1=document.querySelector("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole");
        return price1.innerHTML;
    })
    await page.waitForSelector("#productTitle")
    
    const Title= await page.evaluate(()=>{
        const heading=document.querySelector("#productTitle");
        return heading.innerHTML;
    });
    console.log(Title)
    console.log("AmazonePrice: ₹"+price)


    await page.goto(urls[1])
    await page.waitForSelector("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d")
    const price1 =await page.evaluate(()=>{
        const price1=document.querySelector("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-8-12 > div:nth-child(2) > div > div.dyC4hf > div.CEmiEU > div > div._30jeq3._16Jk6d");
        return price1.innerHTML;
    })
    console.log("flipkart Price: "+price1)

    await page.goto(urls[2])
    await page.waitForSelector("#root > div.rf-bfe > div.rf-bfe-header-wrapper > div.rf-bfe-header > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span.price-point.price-point-fullPrice > span.nowrap")
    const price2 =await page.evaluate(()=>{
        const price1=document.querySelector("#root > div.rf-bfe > div.rf-bfe-header-wrapper > div.rf-bfe-header > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span.price-point.price-point-fullPrice > span.nowrap");
        if (price1) {
            return price1.textContent.trim(); // Trim removes leading and trailing white spaces
        } else {
            return 'Element not found'; // Handle case where the element with the specified query selector is not found
        }
        // return price1.innerHTML;
    })
    console.log("Iphone official website price:"+price2)

    browser.close()
}
start()