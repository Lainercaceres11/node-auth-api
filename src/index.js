import app from "./app.js"
import connectDB from "./db.js"

import dotenv from "dotenv"

dotenv.config()

//Se conecta a la base de datos
connectDB()

app.listen(process.env.PORT, ()=>{
    console.log("server run in the port", process.env.PORT)
})