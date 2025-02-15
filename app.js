import Express from "express"
import { musicRouter } from "./routes/musicRouter.js"
import { movieRouter } from "./routes/movieRouter.js"
import { getChart, listCharts } from "billboard-top-100"
import { catchAsync } from "./utils/catchAsync.js"

export const app = Express()

app.use(Express.static("public"))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect('/music')
})

app.use('/movie', movieRouter)
app.use('/music', musicRouter)

app.get('/list', (req, res) => {
    listCharts((err, data) => {
        if (err) throw err;
        res.json(data)
    })
})

app.get('/item', catchAsync((req, res) => {
    getChart('greatest-hot-100-artists', '2025-02-01', (err, data) => {
        if (err) throw err;
        res.json(data)
    })
}))

app.use((err, req, res, next) => {
    res.render('error.ejs',{err})
})


