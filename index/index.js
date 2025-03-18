import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routes/orderRouter.js';
const app = express();

mongoose.connect("mongodb+srv://admin:123@cluster0.vnhd9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("Connected to the database");
    }
).catch(
    ()=>{
        console.log("Connection failed");
    }
)




app.use(bodyParser.json());
app.use(verifyJWT)



app.use("/api/user" , userRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)



app.listen(5000, 
    ()=>{
        console.log("Server is running on port 5000");
    }
)

app.get('/', (req, res) => {
    res.send('Server is running on port 5000');
});

app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
});

