require('dotenv').config({ path: './.env' });
const cors = require('cors');
const express = require('express');
const app = express();
const port = 5555;
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRouter.js');
const orderRouter = require('./routes/orderRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const messageRouter = require('./routes/messageRouter.js');

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public/')));

// Router
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/message', messageRouter);

// handdle errors 
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ressource non trouvée' });
}); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

app.listen(port, () => {
    console.log(`Clothed server listenning on port ${port}`);
});
