import { getChart } from "billboard-top-100";
import { musicSources } from "../source/musicSources.js";
import { catchAsync } from "../utils/catchAsync.js";
import { getGivenOrLastSaturdayToISO, PopulateCovers } from "../utils/util.js";
import { kworbScrapper } from "../scrappers/kworb.js";

export const getBillboardChart = catchAsync(async (req,res)=>{
    const listName  = req.query.name ?? 'hot-100';
    const chartDate = getGivenOrLastSaturdayToISO(req.query.date ?? new Date());

    getChart(listName, chartDate, (err, data) => {
        if (err) 
            throw err;

        const musicList = data.songs.map(d => {
            return {
                rank : d.rank,
                title : d.title,
                artist : d.artist,
                cover : d.cover
            }
        })
        res.render('music/music-list.ejs', { musicList })
    })
})

export const getkworbChart = catchAsync(async (req,res)=>{
    const [name, chart]  = req.query.name.split('-');
    const period = req.query.period;
    const country = req.query.country;
    try{
        var list = await kworbScrapper(name, chart, period, country);
        res.render('music/music-list.ejs', { musicList : list })
    }
    catch (err){
        throw err;
    }
})



export const getSources = catchAsync(async (req, res) => {
    const dropDownList = musicSources
    const nav = {
        isMusic : true, 
        isMovie : false
    }
    res.render('music/music.ejs', { dropDownList, nav})
})