import { Component } from "@angular/core";

@Component({
    selector: "app-counter",
    templateUrl: "./counter-page.component.html",
    styleUrls: ["./counter-page.component.css"]
})
export class CounterPageComponent {
    count: number = 0;

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
    reset() {
        this.count = 0;
    }
}

