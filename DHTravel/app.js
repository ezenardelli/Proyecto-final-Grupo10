const express = require("express"); 
const app = express ();
const path = require("path"); 
const morgan = require("morgan");
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const mainRouter = require('./src/routes/mainRouter.js');
const userRouter = require('./src/routes/userRouter.js');
const productRouter = require('./Src/routes/productRouter.js');
const adminRouter = require('./src/routes/adminRouter.js');
const productApiRouter = require('./Src/routes/api/productApiRouter.js');
const userApiRouter = require('./Src/routes/api/userApiRouter.js');

const loggedMiddleware = require('./src/middlewares/loggedMiddleware');

const connectConfig = require('./src/database/config/testConnection')


app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'MySecret',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(loggedMiddleware);

const publicPath = path.resolve(__dirname, "./public");
app.use( express.static(publicPath) )

const port = process.env.PORT || 3031;

app.listen(port, () => {
    connectConfig.connect((error) =>{
        if(error) throw error;
        console.log('Connect to database dhtravel');
    });
    console.log(`Server listening on port ${port}`); 
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(mainRouter);
app.use(userRouter);
app.use(productRouter);
app.use(adminRouter);
app.use(userApiRouter);
app.use(productApiRouter);

app.use((req, res, next) => {
    res.status(404).render('./main/error-404');
});
