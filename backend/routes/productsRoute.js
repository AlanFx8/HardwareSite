const express = require("express")
const asyncHander = require("express-async-handler")

//Grab products and create the router
const products = require('./../database')
const router = express.Router()

//Set the routes
//Get all products
router.get("/", asyncHander(async (req, res) => {
    res.status(200).send(products)
}))

//Get Product by ID
router.get("/:id", (req, res) => {
    const id = req.params.id
    const items = products.filter(x => x.id.toString() === id.toString())
    const data = (items.length > 0)?items[0]:null
    res.send(data)
})

//Get Product by Department
router.get("/departments/:id", (req, res) => {
    const id = req.params.id
    const items = products.filter(x => x.department.toString() === id.toString())
    res.send(items.length > 0 ? items : null)
})

//Get Product by Brand
router.get("/brands/:id", (req, res) => {
    const id = req.params.id
    const items = products.filter(x => x.brandID.toString() === id.toString())
    res.send(items.length > 0 ? items : null)
})

//Get Product by Search Query
router.get("/search/:query", (req, res) => {
    const q = req.params.query.split(" ")
    const items = []

    for (let x = 0; x < products.length; x++){
        for (let y = 0; y < q.length; y++){
            const currentProduct = products[x];
            const currentSearchTerm = q[y].toLocaleLowerCase();

            if (currentProduct.name.toLocaleLowerCase().includes(currentSearchTerm)
            || currentProduct.department.toLocaleLowerCase().includes(currentSearchTerm)            
            || currentProduct.brand.toLocaleLowerCase().includes(currentSearchTerm)
            || currentProduct.brandID.toLocaleLowerCase().includes(currentSearchTerm)){
                if (!items.find(ob => ob.id === currentProduct.id)){
                    items.push(currentProduct)
                }
            }
        }
    }

    res.send(items.length > 0 ? items : null)
})

//Export the Router
module.exports = router