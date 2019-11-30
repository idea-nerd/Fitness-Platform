import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

import { LocalDataSource } from 'ng2-smart-table';

import { Store, Select } from '@ngxs/store';
import { Attendance } from './../../models/attendance.model';
import { AttendanceState } from './../../state/attendance.state';
import { Observable } from 'rxjs/Observable';

import { Settings } from './settings';

import { NbDialogService } from '@nebular/theme';
import { WebsocketService } from '../../services/websocket/websocket.service';

import { processQrCode } from './../../helpers/helpers';
import { CreateAttendance, ReadAttendance } from '../../actions/attendance.actions';

@Component({
  selector: 'ngx-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  @Select(AttendanceState.getAttendances) checkin$: Observable<Attendance>;

  ngVersion = VERSION.full;

  @ViewChild('scanner', {static: true})
  scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;


  source: LocalDataSource;
  settings: any = Settings;

  constructor(private store: Store, private dialogService: NbDialogService, private websocketService: WebsocketService) { }

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;

          // selects the devices's back camera by default
          // for (const device of devices) {
          //     if (/back|rear|environment/gi.test(device.label)) {
          //         this.scanner.changeDevice(device);
          //         this.selectedDevice = device;
          //         break;
          //     }
          // }
      });

      this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
          console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
      });

      this.scanner.permissionResponse.subscribe((answer: boolean) => {
        this.hasPermission = answer;
      });

      //Socket Io | Listen to event
      /*this.websocketService.listen('test event').subscribe((data) => {
        console.log('test', data)
      })*/
  }

  handleQrCodeResult(resultString: string) {
        console.log('Result: ', resultString);
        this.qrResultString = resultString;
        const payload = processQrCode(this.qrResultString);

        this.store.dispatch(new CreateAttendance({ ...payload})).subscribe(() => {
          this.store.dispatch(new ReadAttendance());
        });
    }

    onDeviceSelectChange(selectedValue: string) {
        console.log('Selection changed: ', selectedValue);
        //this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    }

}
