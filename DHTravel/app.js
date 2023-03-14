const express = require("express"); 
const app = express ();
const path = require("path"); 
const morgan = require("morgan");
const methodOverride = require('method-override');
const session = require('express-session');

const mainRouter = require('./src/routes/mainRouter.js');
const userRouter = require('./src/routes/userRouter.js');
const productRouter = require('./src/routes/productRouter.js');
const adminRouter = require('./src/routes/adminRouter.js');

const loggedMiddleware = require('./src/middlewares/loggedMiddleware');


app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'MySecret',
    resave: false,
    saveUninitialized: false,
}));
app.use(loggedMiddleware);

const publicPath = path.resolve(__dirname, "./public");
app.use( express.static(publicPath) )

const port = process.env.PORT || 3031;

app.listen(port, () => {
    console.log(`servidor escuchando en puerto ${port}`);
}); 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(mainRouter);
app.use(userRouter);
app.use(productRouter);
app.use(adminRouter);
