import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&format=json';

export async function getLastFMData() {
    const url = `${LASTFM_BASE_URL}&api_key=${process.env.LASTFM_API}`;
    const data = []

    const obj = await axios.get(url);  
    const res = obj.data;
    
    for (let i = 0 ; i< res.tracks.track.length; i++) {
        data.push({
            rank : i+1,
            artist : res.tracks.track[i].artist.name,
            title : res.tracks.track[i].name,
            info : res.tracks.track[i].listeners+ " Listeners",
        })
    }
    return data
}
