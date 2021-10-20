/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import {
  BluetoothCallbackType,
  BluetoothLE,
  BluetoothMatchMode,
  BluetoothMatchNum,
  BluetoothScanMode,
} from '@ionic-native/bluetooth-le/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-blue',
  templateUrl: './blue.page.html',
  styleUrls: ['./blue.page.scss'],
})
export class BluePage implements OnInit {
  constructor(
    public blueSerial: BluetoothLE,
    public plt: Platform,
    private alertCtrl: AlertController
  ) {}

  devices: any;
  name;
  address;
  status;
  initializeBlueTooth() {
    this.blueSerial.initialize().subscribe(
      (data) => {
        console.log('initialieze');
        this.alertCtrl
          .create({
            message: 'bluetooth initialized successfully ' + data.status,
          })
          .then((el) => {
            el.present();
          });
      },
      (err) => {
        this.alertCtrl
          .create({ message: 'err on initialize ' + err })
          .then((el) => {
            el.present();
          });
      }
    );
  }

  // function(){
  //   this.blueSerial.startScan().subscribe()
  // }
  turnBluetoothOn() {
    console.log('turn on');
    this.blueSerial.enable();
  }

  turnBluetoothOff() {
    console.log('turn off');
    this.blueSerial.disable();
  }

  activateBluetooth() {
    console.log('in activate bluetooth');
    this.blueSerial.isEnabled().then(
      (res) => {
        this.ListDevices();
      },
      (err) => {
        this.alertCtrl
          .create({ message: 'error on activate bluetooth ' + err })
          .then((el) => {
            el.present();
          });
      }
    );
  }
  ListDevices() {
    let params = {
      services: [],
    };
    this.blueSerial
      .retrieveConnected(params)
      .then((resp) => {
        console.log('retrieveConnected: ' + resp);
      })
      .catch((err) => {
        console.log(err);
      });
    // this.blueSerial
    //   .startScan({
    //     services: ['180D', '180F'],
    //     allowDuplicates: true,
    //     isConnectable: true,
    //     matchMode: BluetoothMatchMode.MATCH_MODE_STICKY,
    //     callbackType: BluetoothCallbackType.CALLBACK_TYPE_ALL_MATCHES,
    //     matchNum: BluetoothMatchNum.MATCH_NUM_MAX_ADVERTISEMENT,
    //     scanMode: BluetoothScanMode.SCAN_MODE_OPPORTUNISTIC,
    //   })
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }

  async stopScan() {
    this.blueSerial.stopScan().then(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  connectTo(address) {
    this.blueSerial.connect(address).subscribe(
      (res) => {
        this.alertCtrl
          .create({ message: 'connected successfully to  ' + address })
          .then((el) => {
            el.present();
          });
      },
      (err) => {
        this.alertCtrl
          .create({ message: 'error on connectTo ' + err })
          .then((el) => {
            el.present();
          });
      }
    );
  }

  sendData() {
    // this.blueSerial.write().then(
    //   (res) => {
    //     this.alertCtrl.create({ message: 'message sent' }).then((el) => {
    //       el.present();
    //     });
    //   },
    //   (err) => {
    //     this.alertCtrl
    //       .create({ message: 'error on connectTo sendData ' + err })
    //       .then((el) => {
    //         el.present();
    //       });
    //   }
    // );
  }

  disconnect() {
    // this.blueSerial.disconnect();
    // this.alertCtrl
    //   .create({ message: 'disconnected successfully!! from ' })
    //   .then((el) => {
    //     el.present();
    //   });
  }

  ngOnInit() {}
}
