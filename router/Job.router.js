const express = require("express");

const jobRouter = express.Router()

const { JobModel } = require("../model/Job.model")

jobRouter.post("/add", async (req, res) => {
    try {
        const job = await new JobModel(req.body)
        job.save()
        res.send({ "msg": "new job created successfully" })
    } catch (error) {
        res.status(404).send(error.message)
    }
})

jobRouter.get("/", async (req, res) => {
    try {
        const { role, sort, order, page, title } = req.query
        if (role) {
            const jobs = await JobModel.find({ "role": role }).skip((page-1)*10).limit(10)
            res.status(200).send({ "job": jobs })
        } else if (sort && order) {
            const jobs = await JobModel.find().sort({ postedAt: order == "asc" ? 1 : -1 }).skip((page-1)*10).limit(10)
            res.status(200).send({ "job": jobs })
            
        }else if (title){
            const jobs=await JobModel.find({"language":title}).skip((page-1)*10).limit(10)
            res.status(200).send({ "job": jobs })
            
        }else{
            const jobs=await JobModel.find().skip((page-1)*10).limit(10)
            res.status(200).send({ "job": jobs })

        }
    } catch (error) {
        res.status(404).send(error.message)

    }
})

module.exports = { jobRouter }