
import nodemailer from "nodemailer";

import {Job} from "bull";


const emailProcess = async (job:Job)=>{
 console.log('Processing job:', job.data);
    if(job.attemptsMade>2){
        throw new Error(`server is down`)
    }
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
   
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "d@gmail.com",
    pass: "1234",
  },
  tls:{
    rejectUnauthorized:false
  }
});

    console.log(job.data);
    const info = await transporter.sendMail(job.data);
    const testMessageUrl = nodemailer.getTestMessageUrl(info);

  console.log("Message sent: %s", info.messageId);
  console.log("Test message URL: ", testMessageUrl);
  return testMessageUrl;

}


export default emailProcess;