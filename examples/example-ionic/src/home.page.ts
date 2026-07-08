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
            <h2>Init SDK</h2>
            <ion-note>Initialize the Screeb tag</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="initSDK()">Init</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Set identity</h2>
            <ion-note>Identify the current user</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="setIdentity()">Set</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Set visitor properties</h2>
            <ion-note>Add properties to the identity</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="setVisitorProperties()"
            >Set</ion-button
          >
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
            <h2>Unassign group</h2>
            <ion-note>Remove the user from a group</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="unassignGroup()">Unassign</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Reset identity</h2>
            <ion-note>Start a fresh anonymous identity</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="resetIdentity()">Reset</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Get identity</h2>
            <ion-note>Read the current identity</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="getIdentity()">Get</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Track event</h2>
            <ion-note>Send a custom event to Screeb</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="trackEvent()">Track</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Start survey</h2>
            <ion-note>Force a survey to show</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="startSurvey()">Start</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Start message</h2>
            <ion-note>Force a message to show</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="startMessage()">Start</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Session replay start</h2>
            <ion-note>Begin recording the session</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="sessionReplayStart()"
            >Start</ion-button
          >
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Session replay stop</h2>
            <ion-note>Stop recording the session</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="sessionReplayStop()">Stop</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Debug SDK</h2>
            <ion-note>Print current session state</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="debugSDK()">Debug</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Debug targeting</h2>
            <ion-note>Inspect why surveys are (not) shown</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="debugTargeting()">Debug</ion-button>
        </ion-item>

        <ion-item>
          <ion-label>
            <h2>Close SDK</h2>
            <ion-note>Shutdown the current session</ion-note>
          </ion-label>
          <ion-button slot="end" (click)="closeSDK()">Close</ion-button>
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

  async initSDK(): Promise<void> {
    await this.screeb.init(
      "0e2b609a-8dce-4695-a80f-966fbfa87a88",
      "dev@screeb.app",
      {
        authenticated: true,
        firstname: "John",
        last_seen_at: new Date(),
        lastname: "Smith",
        plan: "growth",
      },
      {
        onReady: (payload) => {
          // eslint-disable-next-line no-console
          console.log("Screeb ready", payload);
        },
        version: "1.0.0",
      },
    );
    // eslint-disable-next-line no-console
    console.log("SDK initialized");
  }

  async setIdentity(): Promise<void> {
    await this.screeb.identity("dev@screeb.app", {
      authenticated: true,
      firstname: "John",
      lastname: "Smith",
      plan: "growth",
    });
    // eslint-disable-next-line no-console
    console.log("Identity set");
  }

  async setVisitorProperties(): Promise<void> {
    await this.screeb.identityProperties({
      app_version: "1.0.0",
      last_action_at: new Date(),
    });
    // eslint-disable-next-line no-console
    console.log("Visitor properties set");
  }

  async assignGroup(): Promise<void> {
    await this.screeb.identityGroupAssign("cohort", "Screeb Developers");
    // eslint-disable-next-line no-console
    console.log("Group assigned");
  }

  async unassignGroup(): Promise<void> {
    await this.screeb.identityGroupUnassign("cohort", "Screeb Developers");
    // eslint-disable-next-line no-console
    console.log("Group unassigned");
  }

  async resetIdentity(): Promise<void> {
    await this.screeb.identityReset();
    // eslint-disable-next-line no-console
    console.log("Identity reset");
  }

  async getIdentity(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(await this.screeb.identityGet());
  }

  async trackEvent(): Promise<void> {
    await this.screeb.eventTrack("ionic-button-clicked", { page: "home" });
    // eslint-disable-next-line no-console
    console.log("Event tracked");
  }

  async startSurvey(): Promise<void> {
    await this.screeb.surveyStart("1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff");
    // eslint-disable-next-line no-console
    console.log("Survey started");
  }

  async startMessage(): Promise<void> {
    await this.screeb.messageStart("642929b9-28f1-4cb5-b153-f482777e0003");
    // eslint-disable-next-line no-console
    console.log("Message started");
  }

  async sessionReplayStart(): Promise<void> {
    await this.screeb.sessionReplayStart();
    // eslint-disable-next-line no-console
    console.log("Session replay started");
  }

  async sessionReplayStop(): Promise<void> {
    await this.screeb.sessionReplayStop();
    // eslint-disable-next-line no-console
    console.log("Session replay stopped");
  }

  async debugSDK(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(await this.screeb.debug());
  }

  async debugTargeting(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(await this.screeb.targetingDebug());
  }

  async closeSDK(): Promise<void> {
    await this.screeb.close();
    // eslint-disable-next-line no-console
    console.log("SDK closed");
  }
}
