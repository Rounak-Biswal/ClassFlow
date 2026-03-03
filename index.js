const express = require("express")
const { db } = require("./db")
const { carSchema } = require("./schema")

const app = express()
const router = express.Router()
const port = 8100

app.use(express.json())
app.use((req, res, next) => {
    let time = new Date().toISOString()
    console.log(`[${time}] ${req.method} ${req.url}`)
    next()
})

router.get("/", (req, res) => {
    res.json({ "title": "success", "data": data, "count": data.length })
})

router.post("/", async (req, res) => {
    let { brand, model, year, price, manufactured } = req.body
    if (!brand && !model && !year && !price) {
        res.json({ "title": "failure", "msg": "provide valid data" })
    }

    const newCar = await db.insert(carSchema).values({ brand, model, year, price, manufactured }).returning()
    console.log(newCar)
    res.json({ "title": "success", "msg": "successfully created new data", "data": newCar })
})

router.get("/:id", (req, res) => {
    let id = Number(req.params.id);
    console.log('id:', id);
    let result = data.find((car) => { if (car.id === id) return car })
    if (!result)
        res.json({ "title": "failure", "msg": "car with this id doesnt exist" })
    else
        res.json({ "title": "success", "data": result })
})

router.delete("/:id", (req, res) => {
    let id = Number(req.params.id)
    let newData = data.filter((car) => car.id !== id)
    if (data.length === newData.length) {
        res.json({ "title": "failure", "msg": "car with this id doesnt exist" })
    }
    else {
        data = newData
        res.json({ "title": "failure", "msg": `successfully deleted data with id : ${id}` })
    }
})

router.put("/:id", (req, res) => {
    let id = Number(req.params.id)
    let existingData = data.find((car) => car.id === id)
    console.log('existingData:', existingData);
    if (!existingData)
        res.json({ "title": "failure", "msg": "car with this id doesnt exist" })
    let { brand, model } = req.body
    if (!brand || !model)
        res.json({ "title": "failure", "msg": "brand and model are required" })

    existingData.brand = brand
    existingData.model = model
    res.json({ "title": "success", "msg": `successfully updated data with id : ${id}` })
})

app.use("/v1/cars", router)

app.listen(port, () => {
    console.log("server live at port : ", port)
})