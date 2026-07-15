import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskFilter, TaskStore } from './task.store';

type Lesson = { eyebrow: string; title: string; concept: string; code: string };

@Component({
  selector: 'app-root', imports: [FormsModule], templateUrl: './app.html', styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly store = inject(TaskStore);
  readonly newTask = signal('');
  readonly activeLesson = signal(0);
  readonly stateOpen = signal(true);
  readonly filters: TaskFilter[] = ['all', 'active', 'done'];
  readonly lessons: Lesson[] = [
    { eyebrow: '01 / STATE', title: 'Start with state', concept: 'withState creates a signal for every top-level property. Read each value by calling it like a function.', code: `withState({\n  tasks: [],\n  filter: 'all'\n})\n\nstore.tasks()` },
    { eyebrow: '02 / UPDATES', title: 'Patch, never mutate', concept: 'patchState replaces only the fields you provide. Create new arrays and objects so updates stay predictable.', code: `patchState(store, {\n  tasks: [...store.tasks(), task]\n});` },
    { eyebrow: '03 / DERIVED', title: 'Compute what follows', concept: 'Derived state should not be stored twice. A computed signal recalculates only when its dependencies change.', code: `withComputed(({ tasks }) => ({\n  completed: computed(() =>\n    tasks().filter(t => t.done).length\n  )\n}))` },
    { eyebrow: '04 / METHODS', title: 'Expose clear actions', concept: 'withMethods gives components a small, meaningful API. The component asks what should happen; the store owns how.', code: `withMethods((store) => ({\n  toggle(id: number) {\n    patchState(store, { ... });\n  }\n}))` },
    { eyebrow: '05 / SCOPE', title: 'Choose the lifetime', concept: 'providedIn root creates one app-wide instance. Omit it and provide the store on a component for isolated local state.', code: `signalStore(\n  { providedIn: 'root' },\n  withState(initialState)\n)` }
  ];
  readonly lesson = computed(() => this.lessons[this.activeLesson()]!);

  addTask(): void { this.store.addTask(this.newTask()); this.newTask.set(''); }
  selectLesson(index: number): void { this.activeLesson.set(index); }
}
