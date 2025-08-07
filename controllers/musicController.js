import { scrapeBillboardChart } from "../scrappers/billboard.js";
import { musicSources } from "../source/musicSources.js";
import { catchAsync } from "../utils/catchAsync.js";
import { getGivenOrLastSaturdayToISO } from "../utils/util.js";
import { kworbScrapper } from "../scrappers/kworb.js";
import { getLastFMData } from "../scrappers/lastFm.js";

export const getBillboardChart = catchAsync(async (req,res)=>{
    const listName  = req.query.name ?? 'hot-100';
    const chartDate = getGivenOrLastSaturdayToISO(req.query.date ?? new Date());
    let list = await scrapeBillboardChart(listName, chartDate)
    res.render('music/music-list.ejs', { musicList : list })
})

export const getkworbChart = catchAsync(async (req,res)=>{
    const [name, chart]  = req.query.name.split('-');
    const period = req.query.period;
    const country = req.query.country;
    let list = await kworbScrapper(name, chart, period, country);
    res.render('music/music-list.ejs', { musicList : list })
})

export const getLastFMChart = catchAsync(async (req,res)=>{
    let list = await getLastFMData();
    res.render('music/music-list.ejs', { musicList : list })
})

export const getSources = catchAsync(async (req, res) => {
    const dropDownList = musicSources
    const nav = {
        isMusic : true, 
        isMovie : false
    }
    res.render('music/music.ejs', { dropDownList, nav})
})