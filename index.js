
const express=require('express');
const app=express();
app.use(express.json())
require('dotenv').config()
const cors=require('cors')
app.use(cors())
const {connection}=require("./server/server")
const PORT=process.env.PORT||8080
app.get("/",(req,res)=>{
    res.send("Job server backend")
})
const {jobRouter}=require("./router/Job.router")
app.use("/job",jobRouter)
app.listen(PORT,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log("unable to connect to database")
        console.log(error.message)
    }
    console.log(`server is listening on port ${PORT}`)
})