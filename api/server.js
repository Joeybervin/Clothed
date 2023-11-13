const express = require('express');
require('dotenv').config({ path: './.env' });
const cors = require('cors');
const session = require('express-session');
const app = express();
const port = process.env.API_PORT || 5555;

const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRouter.js');
const orderRouter = require('./routes/orderRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const checkoutRouter = require('./routes/checkoutRouter.js');
const couponRouter = require('./routes/couponRouter.js');
const messageRouter = require('./routes/messageRouter.js');

app.use(cors());
app.use(cors({
    origin: process.env.FRONT_URL, 
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public/')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } // Pour HTTPS, false pour HTTP
}));

// Router
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/chekout', checkoutRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/message', messageRouter);

// handdle errors 
app.use((req, res, next) => {
    return res.status(404).json({ message: 'Ressource non trouvée' });
}); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
});

app.listen(port, () => {
    console.log(`Clothed server listenning on port ${port}`);
});
