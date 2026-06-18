import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import { Screeb } from "@screeb/sdk-angular";

@Component({
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonItem,
    IonLabel,
    IonNote,
    IonButton,
  ],
  selector: "app-profile",
  standalone: true,
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-item>
        <ion-label>
          <h2>Start a survey</h2>
          <ion-note>Trigger a survey programmatically</ion-note>
        </ion-label>
        <ion-button slot="end" (click)="startSurvey()">Start</ion-button>
      </ion-item>

      <ion-item>
        <ion-label>
          <h2>Reset identity</h2>
          <ion-note>Log out the current visitor</ion-note>
        </ion-label>
        <ion-button slot="end" color="danger" (click)="logout()"
          >Logout</ion-button
        >
      </ion-item>
    </ion-content>
  `,
})
export class ProfilePage implements OnInit {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject(Screeb) private screeb: Screeb) {}

  ngOnInit(): void {
    this.screeb.eventTrack("ionic-profile-viewed");
  }

  startSurvey(): void {
    this.screeb.surveyStart("<survey-id>", "", true);
  }

  logout(): void {
    this.screeb.identityReset();
    // eslint-disable-next-line no-console
    console.log("Identity reset");
  }
}
