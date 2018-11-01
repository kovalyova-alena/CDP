import { Component, OnInit } from '@angular/core';

declare const Notification;
const applicationServerPublicKey =
  'BNKV7LJ5IFajn46I7FWroeSCMKtyOQPAGguMCn_-mVfyVjr_pvvQn0lW_KMoOAMqEAd4qhFHZhG6GEsDTPSJJ8I';

@Component({
  selector: 'app-pwa-push',
  templateUrl: './push-component.html'
})
export class PushComponent implements OnInit {
  pushButtonText = '';
  response = '';

  constructor() {
  }

  ngOnInit() {
    this.setupPush();
  }

  ngOnPush() {
    this.askPermission()
      .then(this.subscribeUserToPush.bind(this))
      .then(this.sendSubscriptionToBackEnd.bind(this));
  }

  private setupPush() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/ServiceWorker.js').then(reg => {
        console.log('Service Worker and Push is supported');
        return reg;
      });
    } else {
      console.warn('Push messaging is not supported');
      this.pushButtonText = 'Push Not Supported';
    }
  }

  private askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
      .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
          throw new Error('We were not granted permission.');
        }
      });
  }

  subscribeUserToPush(config) {
    const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);  // or config.publicKey
    return navigator.serviceWorker.register('/ServiceWorker.js')
      .then(function(registration) {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey,
        };

        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(function(pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
      });
  }

  private sendSubscriptionToBackEnd(subscription) {
    if (subscription) {
      this.response = JSON.stringify(subscription);
    }

    return fetch('https://node-web-push-app.azurewebsites.net/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Bad status code from server.');
        }

        console.log('Push subscription request succeeded with JSON response', response);
      });
  }

  private urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
