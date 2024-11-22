import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDatabase from "./database/dbConnection.js"


dotenv.config({
    path: './env'
})

const corsOptions = {
    origin: [process.env.CORS_ORIGIN, "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
    preflightContinue: false,
    optionsSuccessStatus: 204
};


const app = express();

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

connectDatabase()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
    app.get('/test', (req, res) => {
        res.json("You are Good to go!!")
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!", err);
})


app.use(express.json( {limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))
app.use(cookieParser());


import UserRouter from "./routes/user.routes.js";


app.use("/api/v1/users", UserRouter);


