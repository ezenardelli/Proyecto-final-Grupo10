const express = require("express"); 
const path = require("path"); 
const morgan = require("morgan");

const app = express ();

const mainRouter = require('./src/routes/mainRouter.js')
const userRouter = require('./src/routes/userRouter.js');
const productRouter = require('./src/routes/productRouter.js')
const adminRouter = require('./src/routes/adminRouter.js')

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
app.use(adminRouter);
