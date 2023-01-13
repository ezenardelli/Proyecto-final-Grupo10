const express = require("express");  

const app = express ();             

const path = require("path");           


app.listen(3031, () => {
    console.log("servidor a la escucha del puerto 3031");
}); 

const publicPath = path.resolve(__dirname, "./Public");
app.use( express.static(publicPath) );

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Views/index.html"));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "./Views/register.html"));
});

app.get("/detalle", (req, res) => {
    res.sendFile(path.join(__dirname, "./Views/productDetail.html"));
});

app.get("/ingresa", (req, res) => {
    res.sendFile(path.join(__dirname, "./Views/login.html"));
});

app.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname, "./Views/productCart.html"));
});

