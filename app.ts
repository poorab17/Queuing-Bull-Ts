import express from "express";
import bodyParser from "body-parser";
import { sendNewEmail,emailQueue } from "./queues/emailqueue";
const { createBullBoard } = require('bull-board')
const { BullAdapter } = require('bull-board/bullAdapter')

const app = express();


app.use(bodyParser.json());
const { router } = createBullBoard([new BullAdapter(emailQueue)]);


app.use('/admin/queues', router)


app.post("/send-email",async (req,res)=>{
  const {message, ...restBody} =req.body;
    await sendNewEmail({
     ...restBody,
html:`<p>${message}</p>`,
    })
     res.send({status:"ok"})
});

 

app.listen(5000,()=>{
    console.log("listnening on port 5000");
})