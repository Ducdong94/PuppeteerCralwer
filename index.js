
const puppeteer = require("puppeteer");

async function start() {

    try {
        // Khởi động trình duyệt
        console.log('Khởi động trình duyệt...');
        let browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });

        let page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 }); //fullhd
        console.log('Mở đến link cần lấy dữu liệu');
        await page.goto('https://www.youtube.com');

        // Chờ cho đến khi page load xong và xuất hiện id logo-icon thì mới xử lý tiếp
        await page.waitForSelector('#logo-icon');

        // let contentHtml = await page.$('#content');
        // console.log(await contentHtml.content());

        // Chạy các script ngay trên trang nguồn
        let links = await page.evaluate(() => {
            let listLink  = [];
            document.querySelectorAll('#content .style-scope.ytd-thumbnail').forEach(a => {
                if (a.href) {
                    listLink.push(a.href);
                }
            });
            return listLink;
        });
        console.log(links);
        // Lưu ữ liệu lấy được vào mongoDB



    } catch (error) {
        console.log(error);
    }
}

start();