import axios from "axios";

const notificationPostUrl="https://gcm-http.googleapis.com/gcm/send";
const hardCodedFCMDeviceKey="fdlB9t8Kr5Q:APA91bHBhcdNQwdMzAaCKkFpvSXbOD_zCMTAHbezFha6OwDX-NNTGPAo06zb4KogbWqfXkdNI0eX6K9hI3nwn5jkkpNa6QgYjtkqgsqtInuRtgTDYtdEAix_dXH5F5TdKhKatBQkMida";

function sendNotification(res, message, id=null, speak=false) {
    let instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + process.env.FIREBASE_SERVER_KEY
        }
    });
    let payload;
    if(speak){
        payload =  {
            "to": hardCodedFCMDeviceKey,
            "data": {
                "message": message,
                "id":id,
                "speak":speak
            }
        };
    }else{
        payload =  {
            "to":hardCodedFCMDeviceKey,
            "notification":
                {
                    "title":"Alert",
                    "body":message
                }
        }
    }


    instance.post(notificationPostUrl,payload).then((response) => {
        res.json({
            status:true
        })
    }).catch((error) => {
        res.send(error.message);
    })
}
export default sendNotification;