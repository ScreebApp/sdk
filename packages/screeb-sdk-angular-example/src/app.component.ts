import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

import angularLogo from "./assets/angular.svg";
import screebLogo from "./assets/screeb.png";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, RouterLink],
  selector: "app-root",
  standalone: true,
  styles: [
    `
      img {
        margin-top: 1em;
        max-width: 100px;
      }

      main {
        color: #303140;
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
      }

      @media (min-width: 640px) {
        main {
          max-width: none;
        }
      }

      header {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      header span {
        margin: 16px;
        font-size: 48px;
        font-weight: 600;
      }
    `,
  ],
  template: `
    <main>
      <header>
        <img [src]="screebLogo" alt="This is the Screeb.app logo" />
        <span>+</span>
        <img [src]="angularLogo" alt="This is the Angular logo" />
      </header>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  screebLogo = screebLogo;
  angularLogo = angularLogo;
}
