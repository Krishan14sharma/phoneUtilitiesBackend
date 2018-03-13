import express from 'express'
import axios from "axios";
const routes = express.Router();

const response={
    'lead':'sherlock',
    'villian':'moriarity'
};
const homeAddress = LatLng(12.916881, 77.674860);
const officeAddress = LatLng(12.902426, 77.705588);

//todo
const accessToken = "KA.eyJ2ZXJzaW9uIjoyLCJpZCI6InIwVFZ2ZE81UWtPTDVNV2Fnd29pTGc9PSIsImV4cGlyZXNfYXQiOjE1MjMxODMyNjYsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.jr-llu1PshubppmIdwnxAp-Ng976uMEekiFdTezpNJA";


routes.get('/hello', (req, res) => {
    res.json(response);
});
routes.get('/bookCab',(req,res)=>{
    let product_id="";
    let instance = axios.create();
    instance.defaults.headers.common['Authorization'] = accessToken;
    instance.post('https://api.uber.com/v1.2/requests/estimate',{
        product_id:product_id,
        start_latitude:homeAddress.lat,
        start_longitude:homeAddress.lng,
        end_latitude:officeAddress.lat,
        end_longitude:homeAddress.lng,
        seat_count:2
    }).then((response)=>{
        console.log(response)
    }).catch((error)=>{
        console.log(error)
    })
});

class LatLng {
    constructor(lat ,lng){
        this.lat=lat;
        this.lng=lng;
    }
}

export default routes;