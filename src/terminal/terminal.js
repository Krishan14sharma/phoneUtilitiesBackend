import express from 'express'
import sendNotification from "../notification";

let terminal = express.Router();

terminal.get('/speak',(req, res)=>{
    sendNotification(res,req.message,null,true);
});

export default terminal;