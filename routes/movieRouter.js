import Express from "express"
import { getSources, getTmdbChart } from "../controllers/movieController.js"

export const movieRouter = Express.Router()

movieRouter.get("/", getSources)
movieRouter.get("/list/tmdb", getTmdbChart)