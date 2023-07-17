import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    template: `
    <nav class="tabs tabs-boxed mb-4">
        <a [routerLinkActive]="['tab-active']" routerLink="dashboard" class="tab tab-lg">Dashboard</a>
        <a [routerLinkActive]="['tab-active']" routerLink="about" class="tab tab-lg">About</a>
    </nav>
    `,
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    selector: 'app-navigation'
})
export class NavigationComponent {

}