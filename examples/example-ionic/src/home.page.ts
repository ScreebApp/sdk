import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
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
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonButton,
  ],
  selector: "app-home",
  standalone: true,
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Screeb + Ionic</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Screeb + Ionic</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-label>
            <h2>Track an event</h2>
            <ion-note>Send a custom event to Screeb</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="trackEvent()">Track</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Update identity</h2>
            <ion-note>Set visitor properties</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="updateIdentity()">Update</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Assign group</h2>
            <ion-note>Segment users into cohorts</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="assignGroup()">Assign</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Profile page</h2>
            <ion-note>Navigate to another Ionic page</ion-note>
          </ion-label>
          <ion-button slot="end" routerLink="/profile">Go</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class HomePage implements OnInit {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject(Screeb) private screeb: Screeb) {}

  ngOnInit(): void {
    this.screeb.eventTrack("ionic-home-viewed");
  }

  trackEvent(): void {
    this.screeb.eventTrack("ionic-button-clicked", { page: "home" });
    // eslint-disable-next-line no-console
    console.log("Event tracked");
  }

  updateIdentity(): void {
    this.screeb.identityProperties({
      last_action_at: new Date(),
      app_version: "1.0.0",
    });
    // eslint-disable-next-line no-console
    console.log("Identity updated");
  }

  assignGroup(): void {
    this.screeb.identityGroupAssign("cohort", "Screeb Developers");
    // eslint-disable-next-line no-console
    console.log("Group assigned");
  }
}
