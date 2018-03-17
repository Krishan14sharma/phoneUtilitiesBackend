import express from 'express'
import checkHealth from "../checkHealth";
import sendNotification from "../notification";

let terminal = express.Router();

checkHealth.get('/speak',(req, res)=>{
    sendNotification(res,req.message,null,true);
});

export default terminal;