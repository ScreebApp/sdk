import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { Screeb } from "@screeb/sdk-angular";

const WEBSITE_ID = "0e2b609a-8dce-4695-a80f-966fbfa87a88";
const USER_ID = "dev@screeb.app";
const SURVEY_ID = "1b1fe0c4-d41d-4307-9ca0-b0b66cce8cff";
const MESSAGE_ID = "642929b9-28f1-4cb5-b153-f482777e0003";

@Component({
  imports: [CommonModule],
  selector: "app-home",
  standalone: true,
  styles: [
    `
      h1 {
        font-size: 4em;
        font-weight: 500;
        font-family: Rubik;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
      }

      h2 {
        font-size: 1.2em;
        font-weight: 500;
        font-family: Rubik;
      }

      em {
        font-style: normal;
        color: #5e21f1;
        font-weight: 700;
      }

      a {
        font-weight: 700;
        color: #5e21f1;
      }

      .actions {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5em;
        margin-top: 1em;
      }

      button {
        background: #5e21f1;
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        font-family: Rubik;
        font-size: 1em;
        font-weight: 500;
        padding: 10px 18px;
      }

      pre {
        background: #f7f5ff;
        border: 1px solid #ded6ff;
        border-radius: 8px;
        color: #303140;
        margin-top: 1em;
        overflow: auto;
        padding: 16px;
        text-align: left;
        white-space: pre-wrap;
      }
    `,
  ],
  template: `
    <h1>Hello <em>you</em>!</h1>
    <h2>Welcome aboard!</h2>
    <p>
      Visit our&nbsp;
      <a
        href="https://github.com/ScreebApp/developers/wiki/Javascript-SDK-install"
        target="_blank"
      >
        Developer documentation
      </a>
      &nbsp;to learn how to integrate&nbsp;
      <a href="https://screeb.app" target="_blank">Screeb</a>.
    </p>
    <div class="actions">
      <button type="button" (click)="initSdk()">Init SDK</button>
      <button type="button" (click)="setIdentity()">Set identity</button>
      <button type="button" (click)="setVisitorProperties()">
        Set visitor properties
      </button>
      <button type="button" (click)="assignGroup()">Assign group</button>
      <button type="button" (click)="unassignGroup()">Unassign group</button>
      <button type="button" (click)="resetIdentity()">Reset identity</button>
      <button type="button" (click)="getIdentity()">Get identity</button>
      <button type="button" (click)="trackEvent()">Track event</button>
      <button type="button" (click)="startSurvey()">Start survey</button>
      <button type="button" (click)="startMessage()">Start message</button>
      <button type="button" (click)="sessionReplayStart()">
        Session replay start
      </button>
      <button type="button" (click)="sessionReplayStop()">
        Session replay stop
      </button>
      <button type="button" (click)="debugSdk()">Debug SDK</button>
      <button type="button" (click)="debugTargeting()">Debug targeting</button>
      <button type="button" (click)="closeSdk()">Close SDK</button>
    </div>
    <pre *ngIf="result">{{ result }}</pre>
  `,
})
export class HomeComponent {
  result = "";

  // eslint-disable-next-line no-unused-vars
  constructor(@Inject(Screeb) private screeb: Screeb) {}

  async initSdk(): Promise<void> {
    await this.screeb.load();
    await this.screeb.init(WEBSITE_ID, USER_ID, {
      authenticated: true,
      firstname: "John",
      last_seen_at: new Date(),
      lastname: "Smith",
      org_size: 20,
    });
    this.result = "SDK initialized.";
  }

  async setIdentity(): Promise<void> {
    await this.screeb.identity(USER_ID, {
      authenticated: true,
      firstname: "John",
      lastname: "Smith",
    });
    this.result = "Identity set.";
  }

  async setVisitorProperties(): Promise<void> {
    await this.screeb.identityProperties({ hello: "I'm a dev." });
    this.result = "Visitor properties set.";
  }

  async assignGroup(): Promise<void> {
    await this.screeb.identityGroupAssign("cohort", "Screeb Developers");
    this.result = "Group assigned.";
  }

  async unassignGroup(): Promise<void> {
    await this.screeb.identityGroupUnassign("cohort", "Screeb Developers");
    this.result = "Group unassigned.";
  }

  async resetIdentity(): Promise<void> {
    await this.screeb.identityReset();
    this.result = "Identity reset.";
  }

  async getIdentity(): Promise<void> {
    const identity = await this.screeb.identityGet();
    this.result = JSON.stringify(identity, null, 2);
  }

  async trackEvent(): Promise<void> {
    await this.screeb.eventTrack("example-angular started", { test: 123 });
    this.result = "Event tracked.";
  }

  async startSurvey(): Promise<void> {
    await this.screeb.surveyStart(SURVEY_ID);
    this.result = "Survey started.";
  }

  async startMessage(): Promise<void> {
    await this.screeb.messageStart(MESSAGE_ID);
    this.result = "Message started.";
  }

  async sessionReplayStart(): Promise<void> {
    await this.screeb.sessionReplayStart();
    this.result = "Session replay started.";
  }

  async sessionReplayStop(): Promise<void> {
    await this.screeb.sessionReplayStop();
    this.result = "Session replay stopped.";
  }

  async debugSdk(): Promise<void> {
    const result = await this.screeb.debug();
    this.result = String(result ?? "See console for debug output.");
  }

  async debugTargeting(): Promise<void> {
    const result = await this.screeb.targetingDebug();
    this.result = String(result ?? "See console for targeting output.");
  }

  async closeSdk(): Promise<void> {
    await this.screeb.close();
    this.result = "SDK closed.";
  }
}
