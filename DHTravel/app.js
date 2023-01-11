const express = require("express");  

const app = express ();             

const path = require("path");           


app.listen(3030, () => {
    console.log("servidor a la escucha del puerto 3030");
}); 

const publicPath = path.resolve(__dirname, "./Public");
app.use( express.static(publicPath) );

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Views/index.html"));
});

app.get('/carrito', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/productCart.html')); 
});