import express from 'express'
import sendNotification from "./notification";
import config from './config'

const checkHealth=express.Router();
const helloResponse={
    'lead':'sherlock',
    'villian':'moriarity',
    'mode':config.app.mode
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