import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signalStore, withState } from '@ngrx/signals';
  import { signal } from '@angular/core';


const CountStore = signalStore(
  withState({ count: 0 })
);

@Component({
  selector: 'app-root', 
  imports: [FormsModule], 
  providers: [CountStore],
  templateUrl: './app.html', 
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App { 

private count = signal(0); 
}
