const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'https://localhost:8081'
}

// middlewares
app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// testing apis
app.get('/', (req, res) => {
    res.json({ message: 'hello karthik!' })
})

// port
const PORT = process.env.PORT || 8080

// routers
const productRouter = require('./routes/productRoutes')
app.use('/api/products', productRouter)


// server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})