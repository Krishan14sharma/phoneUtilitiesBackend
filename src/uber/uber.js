import express from 'express'
import axios from "axios";
import sendNotification from "../notification";
import {homeAddress,officeAddress} from './LatLng'

const uber = express.Router();
const uberUrl="https://sandbox-api.uber.com/v1.2/";

uber.get('/bookPoolFromHomeToWork',(req, res)=>{
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
    instance.defaults.headers.common['Authorization'] = process.env.ACCESS_TOKEN;
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

const uberStatus={
    processing:"The Request is matching to the most efficient available driver",
    no_drivers_available:"The Request was unfulfilled because no drivers were available",
    accepted:"The Request has been accepted by a driver and is “en route” to the start location",
    arriving:"The driver has arrived or will be shortly",
    in_progress:"",
    driver_canceled:"The Request has been canceled by the driver.",
    rider_canceled:"The Request canceled by rider",
    completed:	""
};

uber.post('/webHook',(req, res)=>{
    let status=req.body.meta.status;
    let event_id=req.body.event_id;
    if(uberStatus[status])
    {
        sendNotification(res,uberStatus[status],event_id,true)
    }
});

// todo create get current eta method

export default uber;