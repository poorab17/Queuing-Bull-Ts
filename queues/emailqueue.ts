import Bull from "bull";
import emailProcess from "../process/emailprocess";



const emailQueue = new Bull("email", {
    redis:{
         host: '127.0.0.1', 
         port: 6379,
       },
       limiter:{
        max:1000,
        duration:5000,
       }
})



emailQueue.process(emailProcess);

const sendNewEmail =(data:any)=>{
    emailQueue.add(data,{
           attempts:5,
           priority:3
    })
     console.log('Job added to the queue:', data);
}

export {
    sendNewEmail,emailQueue
}