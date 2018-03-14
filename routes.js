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
const accessToken = "Bearer KA.eyJ2ZXJzaW9uIjoyLCJpZCI6IkJuL1g0bWJQVHVxN2ZWUExkdkRSNGc9PSIsImV4cGlyZXNfYXQiOjE1MjM2MTcwNDMsInBpcGVsaW5lX2tleV9pZCI6Ik1RPT0iLCJwaXBlbGluZV9pZCI6MX0.FtULoui9-KxdvO4iklbv3NfmX-3JoBUuERzJg-O1cgk";
const uberUrl="https://sandbox-api.uber.com/v1.2/";

routes.get('/hello', (req, res) => {
    res.json(response);
});

routes.get('/bookPoolFromHomeToWork',(req,res)=>{
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
        console.log(error)
    })
});


const serverKey="AAAA-PWVphs:APA91bHlTsW9nFTTAVXtDLZreoOzbFOT4ZACL8BvNVPBL1h2cYDJK8ajM615gvu_f9oJYGG7MJShpVxdfu8-ndFDSoe2kdzhsYQfE0Ln-TXhqJ4cCYYJfWgbSqadkN0MZDThWXmbCN56";
const notificationPostUrl="https://gcm-http.googleapis.com/gcm/send";
const hardCodedFCMDeviceKey="excGG_ogIrs:APA91bFjn2jxN8zPLwDBiSGkxGoTDhGpoQ_EPml0RmCzbiXd9VWo2FcjQOVzoRqdGwteC4DD1zhDs9gbWITCkmoEK9fUPQZ_zEZlPbV4L7jJ9kx5D3UmkyJZ8oyVcFZ3xgBm1ZFY8inl";

function sendNotification(res,message) {
    let instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + serverKey
        }
    });
    instance.post(notificationPostUrl, {
        "to": hardCodedFCMDeviceKey,
        "data": {
            "message": message
        },
    }).then((response) => {
        res.send(response)
    }).catch((error) => {
        res.send(error.message);
    })
}

routes.post('/sendNotification',(req,res)=>{
    sendNotification(res,"Hi from Iftt");
});


// {
//     "event_id": "2a2f3da4-14ac-4056-bbf2-d0b9cdcb0777",
//     "event_time": 1427343990,
//     "event_type": "requests.receipt_ready",
//     "meta": {
//     "user_id": "d13dff8b",
//         "resource_id": "d0b9cdc",
//         "status": "ready"
// },
//     "resource_href": "https://api.uber.com/v1.2/requests/d0b9cdc/receipt"
// }

const uberstatus={
    processing:	"The Request is matching to the most efficient available driver",
    no_drivers_available:	"The Request was unfulfilled because no drivers were available",
    accepted:	"The Request has been accepted by a driver and is “en route” to the start location",
    arriving:	"The driver has arrived or will be shortly",
    in_progress:	"The Request is “en route” from the start location to the end location.",
    driver_canceled:	"The Request has been canceled by the driver.",
    rider_canceled:	"The Request canceled by rider",
    completed:	"Request has been completed by the driver"
};

routes.post('/webHook',(req,res)=>{
    let status=req.body.meta.status;
    sendNotification(res,uberstatus[status])
});

export default routes;