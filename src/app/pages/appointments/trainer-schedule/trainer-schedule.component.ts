import { Component, ViewEncapsulation, OnInit, ViewChild } from "@angular/core";
import {
  EventSettingsModel,
  View,
  GroupModel,
  TimelineViewsService,
  TimelineMonthService,
  DayService,
  ResizeService,
  DragAndDropService,
  ResourceDetails,
  ScheduleComponent,
  PopupOpenEventArgs
} from "@syncfusion/ej2-angular-schedule";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { createElement } from "@syncfusion/ej2-base";
import { Store } from "@ngxs/store";
import { User } from "./../../../models/users.model";
import { ReadTrainers } from "./../../../actions/user.actions";
import { ReadAppointmentClient } from "./../../../actions/client.actions";
import {
  CreateAppointment,
  ReadAppointment,
  UpdateAppointment,
  DeleteAppointment
} from "../../../actions/appointment.actions";

@Component({
  selector: "ngx-trainer-schedule",
  templateUrl: "./trainer-schedule.component.html",
  styleUrls: ["./trainer-schedule.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DayService,
    TimelineViewsService,
    TimelineMonthService,
    ResizeService,
    DragAndDropService
  ]
})
export class TrainerScheduleComponent implements OnInit {
  @ViewChild("scheduleObj", { static: false })
  user: User;
  public scheduleObj: ScheduleComponent;
  public appointmentsData: Object[] = [];
  public selectedDate: Date = new Date();
  public currentView: View = "Day";
  public employeeDataSource: Object[] = [];
  public clientDataSource: any[] = [];
  public group: GroupModel = {
    enableCompactView: false,
    resources: ["Employee"]
  };
  public allowMultiple: Boolean = false;
  public eventSettings: EventSettingsModel;
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new ReadAppointment()).subscribe(res => {
      for (const [key, value] of Object.entries(
        res.appointments.appointments
      )) {
        value["Id"] = parseInt(value["Id"]);
        value["ClientID"] = parseInt(value["ClientID"]);
        value["EmployeeId"] = parseInt(value["EmployeeId"]);
        value["StartTime"] = new Date(value["StartTime"]);
        value["EndTime"] = new Date(value["EndTime"]);
      }
      this.eventSettings = { dataSource: res.appointments.appointments };
    });
    this.store.dispatch(new ReadTrainers()).subscribe(res => {
      this.employeeDataSource = res.users.trainers;
    });
    this.store.dispatch(new ReadAppointmentClient()).subscribe(res => {
      this.clientDataSource = res.clients.appointmentClients;
    });
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === "Editor") {
      // Create required custom elements in initial time
      if (!args.element.querySelector(".custom-field-row")) {
        const row: HTMLElement = createElement("div", {
          className: "custom-field-row"
        });
        const formElement: HTMLElement = args.element.querySelector(
          ".e-schedule-form"
        );
        formElement.firstChild.insertBefore(
          row,
          args.element.querySelector(".e-title-location-row")
        );
        const container: HTMLElement = createElement("div", {
          className: "custom-field-container"
        });
        const inputEle: HTMLInputElement = createElement("input", {
          className: "e-field",
          attrs: { name: "Client" }
        }) as HTMLInputElement;
        container.appendChild(inputEle);
        row.appendChild(container);
        const dropDownList: DropDownList = new DropDownList({
          allowFiltering: true,
          dataSource: this.clientDataSource,
          fields: { text: "name", value: "id" },
          value: (<{ [key: string]: Object }>args.data).EventType as string,
          floatLabelType: "Always",
          placeholder: "Client"
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "ClientID");
      }
    }
  }

  onActionBegin(args) {
    if (args.requestType == "eventCreate") {
      this.store.dispatch(new CreateAppointment(args.data[0])).subscribe(() => {
        this.store.dispatch(new ReadAppointment()).subscribe(res => {
          this.clientDataSource = res.clients.appointmentClients;
        });
      });
    }
    if (args.requestType == "eventChange") {
      this.store
        .dispatch(new UpdateAppointment(args.data, parseInt(args.data.Id)))
        .subscribe(() => {
          this.store.dispatch(new ReadAppointment()).subscribe(res => {
            this.clientDataSource = res.clients.appointmentClients;
          });
        });
    }
    if (args.requestType == "eventRemove") {
      this.store
        .dispatch(new DeleteAppointment(parseInt(args.data[0].Id)))
        .subscribe(() => {
          this.store.dispatch(new ReadAppointment()).subscribe(res => {
            this.clientDataSource = res.clients.appointmentClients;
          });
        });
    }
  }

  onCellClick(args) {
    args.cancel = true;
  }

  getEmployeeName(value: ResourceDetails): string {
    if (value)
      return value.resourceData.firstName + " " + value.resourceData.lastName;
  }
  getEmployeeDesignation(value: ResourceDetails): string {
    if (value) return value.resourceData.role.toString();
  }
  getEmployeeImageName(value: ResourceDetails): string {
    if (value) return value.resourceData.image.toString();
  }
}
