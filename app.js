const express = require('express')
const axios = require("axios");

const port = 3000
const app = express()

let name = 'wind-breaker'
const options = {
    method: 'GET',
    url: `https://manga-scrapper.p.rapidapi.com/series/${name}/chapters/`,
    params: { provider: 'luminous' },
    headers: {
        'X-RapidAPI-Key': '67755d92b8msh914d80f36460fc7p1d4223jsn3722120bdad3',
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
    }
};

app.get('/', (req, res) => {
    axios.request(options)
        .then(function (response) {
            let manga = response.data.data.series[0]
            //console.log(manga);
            res.send(manga)
            res.render('comic/index', { manga })
            console.log(manga.ChapterUrl)
        })
        .catch(function (error) {
            console.error(error);
        });
})

app.listen(port, function () {
    console.log('manga running')
})
