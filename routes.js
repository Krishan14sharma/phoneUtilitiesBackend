import express from 'express'
import axios from "axios";
const routes = express.Router();

const response={
    'lead':'sherlock',
    'villian':'moriarity'
};

class LatLng {
    constructor(lat ,lng){
        this.lat=lat;
        this.lng=lng;
    }
}

const homeAddress = new LatLng(12.916881, 77.674860);
const officeAddress = new LatLng(12.902426, 77.705588);

//todo
const accessToken = "Bearer KA.eyJ2ZXJzaW9uIjoyLCJpZCI6ImVZdThKNmxyUzdPbFJKblJ2cUdRclE9PSIsImV4cGlyZXNfYXQiOjE1MjM1NTUxNjUsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.XLklNW_1FPN6dlaaP22NZtL082f_0_nwCfB-TVpMuWw";
const uberUrl="https://sandbox-api.uber.com/v1.2/";

routes.get('/hello', (req, res) => {
    res.json(response);
});
routes.get('/bookCab',(req,res)=>{
    let product_id="ed5e79f0-c124-4377-89eb-511cbdeb5fe2";
    let payload={
        product_id:product_id,
        start_latitude:homeAddress.lat,
        start_longitude:homeAddress.lng,
        end_latitude:officeAddress.lat,
        end_longitude:officeAddress.lng,
        seat_count:2
    };
    let instance = axios.create();
    instance.defaults.headers.common['Authorization'] = accessToken;
    instance.post(uberUrl+'requests/estimate',payload).then((response)=>{
        return response.data.fare.fare_id;
    }).then((fare_id)=>{
        payload.fare_id=fare_id;
        return instance.post(uberUrl+'requests',payload)
    }).then((response)=>{
        res.send(response.data)
    }).catch((error)=>{
        res.send(error.message);
        console.log(error)
    })
});



export default routes;