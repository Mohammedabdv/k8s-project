require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//----Documentation----
//https://www.npmjs.com/package/dotenv
//https://www.npmjs.com/package/mongoose
//https://www.npmjs.com/package/express
//https://www.npmjs.com/package/body-parser
//https://www.npmjs.com/package/cookie-parser
//https://www.npmjs.com/package/cors

//----My Routes----
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const stripeRoutes = require('./routes/stripepayment');
const paymentBRoutes = require('./routes/braintreepayment');

//----MOngoDB Connection----
mongoose.connect(
    process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
    console.log('Failed to connect to MongoDB');
});

//----Middlewares----
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//----My Routes----
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', stripeRoutes);
app.use('/api', paymentBRoutes);

//----Port----
const port = process.env.PORT || 8000;

//----Starting a server----
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//----Exports----
