import { movieSources    } from "../source/movieSources.js";
import { catchAsync } from "../utils/catchAsync.js";
import { MovieDb } from "moviedb-promise";
import { getRTData } from "../scrappers/rottenTomatoes.js"
import dotenv from "dotenv";
dotenv.config();

const moviedb = new MovieDb(process.env.TMDB_API);

export const getTmdbChart = catchAsync(async (req,res)=>{
    const [source, chart]  = req.query.name.split('-');
    let movieList;
    if(source === 'movie')
        movieList = await getMovieChart(chart,req)
    else if(source === 'trending')
        movieList = await getTrendingChart(chart,req)

    res.render('movie/movie-list.ejs', { movieList })
})

export const getRTCharts = catchAsync(async (req,res)=>{
    const source = req.query.name;
    let movieList = await getRTData(source);
    res.render('movie/movie-list.ejs', { movieList })
})


export const getSources = catchAsync(async (_, res) => {
    const dropDownList = movieSources
    const nav = {
        isMusic : false, 
        isMovie : true
    }
    res.render('movie/movie.ejs', { dropDownList, nav})
})

//#region Helpers
async function getMovieChart(chart,req){
    const country = req.query.country;
    const data = []
    if(chart === 'upcoming'){
        const res = await moviedb.upcomingMovies({
            language : 'en-US',
            page : 1,
            region : country})

        res.results.map((d,i) => {
            data.push({
                base : "https://media.themoviedb.org/t/p/w440_and_h660_face",
                rank : i + 1,
                title : d.title,
                year : d.release_date,
                cover : d.poster_path
            })
        })
    }
    else if(chart === 'now'){
        const res = await moviedb.movieNowPlaying({
            language : 'en-US',
            page : 1,
            region : country})

        res.results.map((d,i) => {
            data.push({
                base : "https://media.themoviedb.org/t/p/w440_and_h660_face",
                rank : i + 1,
                title : d.title,
                year : d.release_date,
                cover : d.poster_path
            })
        })
    }

    return data;
}

async function getTrendingChart(chart,req){
    const period = req.query.period;
    const data = []

    const res = await moviedb.trending({
        media_type : chart,
        page : 1,
        time_window : period
    })

    res.results.map((d,i) => {
        data.push({
            base : "https://media.themoviedb.org/t/p/w440_and_h660_face",
            rank : i + 1,
            title : d.title ?? d.name,
            year : d.release_date ?? d.first_air_date.split('-')[0],
            cover : d.poster_path
        })
    })

    return data;
}

//#endregion 
