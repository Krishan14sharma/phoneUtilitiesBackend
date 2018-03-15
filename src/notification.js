import axios from "axios";

const serverKey="AAAA-PWVphs:APA91bHlTsW9nFTTAVXtDLZreoOzbFOT4ZACL8BvNVPBL1h2cYDJK8ajM615gvu_f9oJYGG7MJShpVxdfu8-ndFDSoe2kdzhsYQfE0Ln-TXhqJ4cCYYJfWgbSqadkN0MZDThWXmbCN56";
const notificationPostUrl="https://gcm-http.googleapis.com/gcm/send";
const hardCodedFCMDeviceKey="excGG_ogIrs:APA91bFjn2jxN8zPLwDBiSGkxGoTDhGpoQ_EPml0RmCzbiXd9VWo2FcjQOVzoRqdGwteC4DD1zhDs9gbWITCkmoEK9fUPQZ_zEZlPbV4L7jJ9kx5D3UmkyJZ8oyVcFZ3xgBm1ZFY8inl";

function sendNotification(res, message, id=null, speak=false) {
    let instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + serverKey
        }
    });
    instance.post(notificationPostUrl, {
        "to": hardCodedFCMDeviceKey,
        "data": {
            "message": message,
            "id":id,
            "speak":speak
        },
    }).then((response) => {
        res.send(response)
    }).catch((error) => {
        res.send(error.message);
    })
}
export default sendNotification;