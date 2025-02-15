import Express from "express"
import { getkworbChart, getBillboardChart, getSources } from "../controllers/musicController.js"

export const musicRouter = Express.Router()

musicRouter.get("/", getSources)
musicRouter.get("/list/billboard", getBillboardChart)
musicRouter.get("/list/kworb", getkworbChart)