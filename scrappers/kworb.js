import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment";

const KWORB_BASE_URL = 'https://kworb.net';
const KWORB_YOUTUBE_URL = `${KWORB_BASE_URL}/youtube`;
const KWORB_SPOTIFY_URL = `${KWORB_BASE_URL}/spotify/country`;

export async function kworbScrapper(name='youtube', chart='', period='daily', country='global') {
    let url;
    if (name === 'youtube'){
        url = `${KWORB_YOUTUBE_URL}/${chart}`;
        return await getYoutubeData(url);
    }
    else if (name === 'spotify'){
        if(country === 'uk')
            country = 'gb';
        url = `${KWORB_SPOTIFY_URL}/${country}_${period}.html`;
        return await getSpotifyData(url);
    }
}

async function getSpotifyData(url){
    const data = []
    const res = await axios.get(url);  
    const $ = cheerio.load(res.data)
    const table = $('.sortable tbody')
    const rows = $(table).find('tr')
    let [artist,title, info, texts] = ['','', '','']

    for(let i = 0; i < rows.length; i++){   
        texts = $(rows[i]).find('>td.text a')
        artist = $(texts[0]).text()
        title = $(texts[1]).text()
        info = $(rows[i]).find('>td.mini+td').text()
        data.push({rank : i+1 , artist, title, info : info + " Streams", cover : ''})
    }
    return data.slice(0,50)
}


async function getYoutubeData(url){
    const data = []
    const res = await axios.get(url);  
    const $ = cheerio.load(res.data)
    const table = $('.sortable tbody')
    const rows = $(table).find('tr td.text')
    let [artist , title] = ['','']

    for(let i = 0; i < rows.length; i++){
        const text = $(rows[i]).find(' a')
        const views = $(rows[i]).find('+td')
        if(text.text().split('-').length > 1)
            [artist , title]= text.text().split('-')

        if (text.text().split('|').length > 1)
            [title , artist]= text.text().split('|')

        title = title.split('(')[0].trim()
        title = title.split('|')[0].trim()
        artist = artist.split('(')[0].trim()
        artist = artist.split('|')[0].trim()
        data.push({rank : i+1 , artist, title, info : views.text() + " Views" , cover : ''})
    }
    return data.slice(0,50);
}