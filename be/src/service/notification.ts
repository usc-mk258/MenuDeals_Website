import * as admin from 'firebase-admin';
import firebaseToken from '../../firebase-token';

class Notification {
  admin = admin;
  notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  }

  constructor() {
    this.admin.initializeApp({
      credential: admin.credential.cert(firebaseToken as any),
      databaseURL: "https://restaurantapp-afdfe.firebaseio.com"
    })
  }

  send(title:string ,message: string, registrationToken: string) {
    const notification =  {
      title: title,
      body: message
    }
    this.admin.messaging().sendToDevice(registrationToken, { notification }, this.notification_options)
      .then( response => {
        console.log('send successfully', JSON.stringify(response));
      })
      .catch( error => {
          console.log("error in notificatin/;;", JSON.stringify(error));
      });

  }

}

export default new Notification();
