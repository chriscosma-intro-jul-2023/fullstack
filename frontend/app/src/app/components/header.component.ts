import { Component, inject, signal } from '@angular/core';
import { selectCounterCurrent } from '../features/counter/state';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header class="p-4 border-b-2 border-black">
      <h1 class="text-3xl text-primary font-black">Intro to programming</h1>
      <p>
        Sample Full-Stack Application For Class
        <span>Your counter is at {{ current() }}</span>
      </p>
    </header>
  `,
})
export class HeaderComponent {
  current = inject(Store).selectSignal(selectCounterCurrent);
}
