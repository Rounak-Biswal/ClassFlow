import express from "express";
import { db } from "./db.js";
import { carSchema } from "./schema.js";
import { eq } from "drizzle-orm";
import respStructure from "./utils/response.js"
import { validate, validStr, validInt, validDate } from "./utils/middleware.js"
// const express = require("express")
// const { db } = require("./db")
// const { carSchema } = require("./schema")

const app = express()
const router = express.Router()
const port = 8100

//middlewares
app.use(express.json())
app.use((req, res, next) => {
    let time = new Date().toISOString()
    console.log(`[${time}] ${req.method} ${req.url}`)
    next()
})

//routes
router.get("/", async (req, res) => {
    let formatResp = new respStructure()
    try {
        const result = await db.select().from(carSchema);
        formatResp.title = "Success"
        formatResp.data = result
        formatResp.count = result.length
        formatResp.msg = (formatResp.count === 0) ? "No records found.." : "Data retrieved successfully.."
        return res.status(200).json(formatResp)
    } catch (err) {
        console.log(err);
        formatResp.title = "Failure"
        formatResp.msg = "Failed to retrieve data.."
        return res.status(500).json(formatResp)
    }
})

router.post("/", validate, async (req, res) => {
    let formatResp = new respStructure()
    let { brand, model, year, price, manufactured } = req.body
    year = Number(year)
    price = Number(price)
    if (manufactured !== undefined)
        manufactured = new Date(manufactured)

    try {
        const result = await db.insert(carSchema).values({ brand, model, year, price, manufactured }).returning()
        formatResp.title = "Success"
        formatResp.msg = "Record created successfully.."
        formatResp.data = result
        formatResp.count = result.length
        return res.status(201).json(formatResp)
    } catch (err) {
        console.log(err)
        formatResp.title = "Failure"
        formatResp.msg = "Failed to create record.."
        return res.status(500).json(formatResp)
    }
})

router.get("/:id", async (req, res) => {
    let formatResp = new respStructure()
    let id = Number(req.params.id);
    if (!isFinite(id) || id < 0) {
        formatResp.title = "Failure"
        formatResp.msg = "Invalid Id.."
        return res.status(400).json(formatResp)
    }
    try {
        let result = await db.select().from(carSchema).where(eq(carSchema.id, id));
        if (result.length === 0) {
            formatResp.title = "Failure"
            formatResp.msg = "No record exists with this id.."
            return res.status(404).json(formatResp)
        }
        else {
            formatResp.title = "Success"
            formatResp.data = result
            formatResp.count = result.length
            formatResp.msg = "Data retrieved successfully.."
            return res.status(200).json(formatResp)
        }
    } catch (err) {
        console.log(err);
        formatResp.title = "Failure"
        formatResp.msg = "Failed to retrieve data.."
        return res.status(500).json(formatResp)
    }
})

router.delete("/:id", async (req, res) => {
    let formatResp = new respStructure()
    let id = Number(req.params.id)
    if (!isFinite(id) || id < 0) {
        formatResp.title = "Failure"
        formatResp.msg = "Invalid Id.."
        return res.status(400).json(formatResp)
    }
    try {
        let result = await db.delete(carSchema).where(eq(carSchema.id, id)).returning()
        if (result.length === 0) {
            formatResp.title = "Failure"
            formatResp.msg = "No record exists with this id.."
            return res.status(404).json(formatResp)
        }
        else {
            formatResp.title = "Success"
            formatResp.data = result
            formatResp.count = result.length
            formatResp.msg = "Data deleted successfully.."
            return res.status(200).json(formatResp)
        }
    } catch (err) {
        console.log(err);
        formatResp.title = "Failure"
        formatResp.msg = "Failed to delete data.."
        return res.status(500).json(formatResp)
    }
})

router.put("/:id", async (req, res) => {
    let formatResp = new respStructure()
    if (!req.body || Object.keys(req.body).length === 0) {
        formatResp.title = "Failure"
        formatResp.msg = "No fields provided for update.."
        return res.status(400).json(formatResp);
    }

    let id = Number(req.params.id)
    if (!isFinite(id) || id < 0) {
        formatResp.title = "Failure"
        formatResp.msg = "Invalid Id.."
        return res.status(400).json(formatResp)
    }
    const { brand, model, price, year, manufactured } = req.body;
    let updateObj = {}
    if (brand !== undefined && validStr(brand)) updateObj.brand = brand
    if (model !== undefined && validStr(model)) updateObj.model = model
    if (year !== undefined && validInt(year)) updateObj.year = Number(year)
    if (price !== undefined && validInt(price)) updateObj.price = Number(price)
    if (manufactured !== undefined && validDate(manufactured)) updateObj.manufactured = new Date(manufactured)
    if (Object.keys(updateObj).length === 0) {
        formatResp.title = "Failure"
        formatResp.msg = "No changes applied.."
        return res.status(400).json(formatResp);
    }

    try {
        const result = await db.update(carSchema).set(updateObj).where(eq(carSchema.id, id)).returning()
        if (result.length === 0) {
            formatResp.title = "Failure"
            formatResp.msg = "No record exists with this id.."
            return res.status(404).json(formatResp)
        }
        else {
            formatResp.title = "Success"
            formatResp.msg = "Data updated successfully.."
            formatResp.data = result
            formatResp.count = result.length
            return res.status(200).json(formatResp)
        }
    }
    catch (err) {
        console.log(err);
        formatResp.title = "Failure"
        formatResp.msg = "Failed to update.."
        return res.status(500).json(formatResp)
    }
})

app.use("/v1/cars", router)

app.listen(port, () => {
    console.log("server live at port : ", port)
})