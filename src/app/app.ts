import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Lesson = { eyebrow: string; title: string; concept: string; code: string };

@Component({
  selector: 'app-root', 
  imports: [FormsModule], 
  templateUrl: './app.html', 
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App { 
}
