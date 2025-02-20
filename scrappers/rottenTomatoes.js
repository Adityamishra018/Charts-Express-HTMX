import axios from "axios";
import * as cheerio from "cheerio";

const RT_BASE_URL = 'https://editorial.rottentomatoes.com/guide';
const RT_MOVIES_URL = `${RT_BASE_URL}/popular-movies`;
const RT_TV_URL = `${RT_BASE_URL}/popular-tv-shows`;

export async function getRTData(name='movies') {
    return await getData(name);
}

async function getData(name){
    let [data, res] = [[], '']
	
	if(name == 'movies')
    	res = await axios.get(RT_MOVIES_URL);  
	else
		res = await axios.get(RT_TV_URL);

    const $ = cheerio.load(res.data)
    const rows = $('.articleContentBody .row.countdown-item')

    for(let i = 0; i < rows.length; i++){
        let poster = $(rows[i]).find(' .article_movie_poster img').attr('src')
        let title = $(rows[i]).find(' .countdown-item-title-bar a').text()
        let year = $(rows[i]).find(' .countdown-item-title-bar a+span').text()
		let info = $(rows[i]).find(' .tMeterScore:first').text()

        data.push({rank : i+1 , year, title, info , cover : poster, base : ''})
    }
    return data.slice(0,50);
}