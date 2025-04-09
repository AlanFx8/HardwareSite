//Setup ENV File
require("dotenv").config()

//Imports
const express = require("express")

//Set Port
const port = process.env.PORT || 5000

//Build the app
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Load and set-routes
app.use("/api/products", require("./routes/productsRoute"))

//Set default to build
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Listen to the server
app.listen(port, () => console.log(`App running on PORT: ${port}`))