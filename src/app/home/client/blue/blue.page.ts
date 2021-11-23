/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
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
import {
  BleClient,
  numbersToDataView,
  numberToUUID,
} from '@capacitor-community/bluetooth-le';
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

  async activateBluetooth() {
    const HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
    const HEART_RATE_MEASUREMENT_CHARACTERISTIC =
      '00002a37-0000-1000-8000-00805f9b34fb';
    const BODY_SENSOR_LOCATION_CHARACTERISTIC =
      '00002a38-0000-1000-8000-00805f9b34fb';
    const BATTERY_SERVICE = numberToUUID(0x180f);
    const BATTERY_CHARACTERISTIC = numberToUUID(0x2a19);
    const POLAR_PMD_SERVICE = 'fb005c80-02e7-f387-1cad-8acd2d8df0c8';
    const POLAR_PMD_CONTROL_POINT = 'fb005c81-02e7-f387-1cad-8acd2d8df0c8';
    try {
      await BleClient.initialize();

      const device = await BleClient.requestDevice({
        services: [HEART_RATE_SERVICE],
        optionalServices: [BATTERY_SERVICE, POLAR_PMD_SERVICE],
      });

      await BleClient.connect(device.deviceId);
      console.log('connected to device', device);

      const result = await BleClient.read(
        device.deviceId,
        HEART_RATE_SERVICE,
        BODY_SENSOR_LOCATION_CHARACTERISTIC
      );
      console.log('body sensor location', result.getUint8(0));

      const battery = await BleClient.read(
        device.deviceId,
        BATTERY_SERVICE,
        BATTERY_CHARACTERISTIC
      );
      console.log('battery level', battery.getUint8(0));

      await BleClient.write(
        device.deviceId,
        POLAR_PMD_SERVICE,
        POLAR_PMD_CONTROL_POINT,
        numbersToDataView([1, 0])
      );
      console.log('written [1, 0] to control point');

      await BleClient.startNotifications(
        device.deviceId,
        HEART_RATE_SERVICE,
        HEART_RATE_MEASUREMENT_CHARACTERISTIC,
        (value) => {
          console.log('current heart rate', this.parseHeartRate(value));
        }
      );

      setTimeout(async () => {
        await BleClient.stopNotifications(
          device.deviceId,
          HEART_RATE_SERVICE,
          HEART_RATE_MEASUREMENT_CHARACTERISTIC
        );
        await BleClient.disconnect(device.deviceId);
        console.log('disconnected from device', device);
      }, 10000);
    } catch (error) {
      console.error(error);
    }
  }

  async anotherScan() {
    const HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
    try {
      await BleClient.initialize();

      await BleClient.requestLEScan(
        {
          services: [HEART_RATE_SERVICE],
        },
        (result) => {
          console.log('received new scan result', result);
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  parseHeartRate(value: DataView): number {
    const flags = value.getUint8(0);
    const rate16Bits = flags & 0x1;
    let heartRate: number;
    if (rate16Bits > 0) {
      heartRate = value.getUint16(1, true);
    } else {
      heartRate = value.getUint8(1);
    }
    return heartRate;
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
