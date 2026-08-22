import express from "express"
import path from "path"
import {ENV} from "./libs/env.js"
import console from "console";

const app = express();

app.get("/",(req,res)=>{
    res.send("Heyyyy Plan Your trip here!!!!")
})
app.listen(ENV.PORT,()=>{
    console.log("GlobeTrotter is listening!!!!!");
})