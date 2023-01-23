const express = require("express"); 
const path = require("path"); 
const morgan = require("morgan");

const mainRouter = require('./src/routes/main.js')
const userRouter = require('./src/routes/user.js');
const productRouter = require('./src/routes/product.js')


const app = express ();

const publicPath = path.resolve(__dirname, "./public");
app.use( express.static(publicPath) )

const port = process.env.PORT || 3031;

app.listen(port, () => {
    console.log(`servidor escuchando en puerto ${port}`);
}); 

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(mainRouter);
app.use(userRouter);
app.use(productRouter);
