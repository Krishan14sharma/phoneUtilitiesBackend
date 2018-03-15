import express from 'express'
import sendNotification from "./notification";

const checkHealth=express.Router();
const helloResponse={
    'lead':'sherlock',
    'villian':'moriarity'
};

checkHealth.get('/sendNotification',(req, res)=>{
    sendNotification(res,"Hi from Iftt",null,false);
});
checkHealth.get('/sendSpeakingNotification',(req, res)=>{
    sendNotification(res,"Hi from Iftt",null,true);
});
checkHealth.get('/hello', (req, res) => {
    res.json(helloResponse);
});

export default checkHealth;