const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const port = 8000;

const url = 'https://www.theguardian.com/uk';
axios(url)
    .then(response => {
        const html = response.data;
        const load_data = cheerio.load(html);
        const articles = [];
        const article_container = load_data('.fc-item__title', html).each(function(){
            const title = load_data(this).text()
            const url_link = load_data(this).find('a').attr('href')
            articles.push({
                title,
                url_link
            })
        })
        console.log(articles);
    }).catch(err => console.log(err))

app.listen(port, () => console.log(`server running on port ${port}`));
