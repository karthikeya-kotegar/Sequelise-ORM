const db = require('../models');

//create main model
const Product = db.products
const Review = db.reviews

//main control
//1. create product
const addProduct = async (req, res) => {
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    // Insert data
    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
}

// get all products
const getAllProducts = async (req, res) => {
    // Get all data
    let products = await Product.findAll({})
    res.status(200).send(products)
}

// get Single products
const getOneProduct = async (req, res) => {
    let id = req.params.id
    // Get one data
    let product = await Product.findOne({
        where: { id: id }
    })
    res.status(200).send(product)
}

// update products
const updateProduct = async (req, res) => {
    let id = req.params.id
    // Update data with specific ID
    let product = await Product.update(req.body, { where: { id: id } })
    res.status(200).send("updated succesfully")
}

// delete product by id
const deleteProduct = async (req, res) => {
    let id = req.params.id
    await Product.destroy({ where: { id: id } })
    res.status(200).send("Product is deleted")
}

// published products
const getPublishedProducts = async (req, res) => {
    // Get all data with condition
    const products = await Product.findAll({ where: { published: true } })
    res.status(200).send(products)
}

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProducts
}