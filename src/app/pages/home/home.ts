import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-home-page',
    templateUrl: './home.html',
    styleUrl: './home.css',
    imports: [
        RouterLink
    ]
})
export class HomePageComponent {
}
