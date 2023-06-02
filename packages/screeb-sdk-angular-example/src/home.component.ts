import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Screeb } from "@screeb/sdk-angular";

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
  `,
})
export class HomeComponent implements OnInit {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject(Screeb) private screeb: Screeb) {}

  ngOnInit(): void {
    this.screeb.debug();

    this.screeb.eventTrack("screeb-sdk-angular-example started", {
      test: 123,
    });
    this.screeb.identityProperties({ hello: "I'm a dev." });
    this.screeb.identityGroupAssign("cohort", "Screeb Developers");

    // eslint-disable-next-line no-console
    setTimeout(() => this.screeb.identityGet().then(console.log), 500);
  }
}
