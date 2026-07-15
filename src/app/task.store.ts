import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export type TaskFilter = 'all' | 'active' | 'done';
export interface LabTask { id: number; title: string; done: boolean; }
type TaskState = { tasks: LabTask[]; filter: TaskFilter; nextId: number; };

const initialState: TaskState = {
  tasks: [
    { id: 1, title: 'Read state as a signal', done: true },
    { id: 2, title: 'Update state with patchState', done: false },
    { id: 3, title: 'Derive values with computed', done: false }
  ],
  filter: 'all',
  nextId: 4
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ tasks, filter }) => ({
    completedCount: computed(() => tasks().filter((task) => task.done).length),
    visibleTasks: computed(() => {
      if (filter() === 'active') return tasks().filter((task) => !task.done);
      if (filter() === 'done') return tasks().filter((task) => task.done);
      return tasks();
    })
  })),
  withMethods((store) => ({
    addTask(title: string): void {
      const cleanTitle = title.trim();
      if (!cleanTitle) return;
      patchState(store, {
        tasks: [...store.tasks(), { id: store.nextId(), title: cleanTitle, done: false }],
        nextId: store.nextId() + 1
      });
    },
    toggleTask(id: number): void {
      patchState(store, { tasks: store.tasks().map((task) => task.id === id ? { ...task, done: !task.done } : task) });
    },
    removeTask(id: number): void {
      patchState(store, { tasks: store.tasks().filter((task) => task.id !== id) });
    },
    setFilter(filter: TaskFilter): void { patchState(store, { filter }); },
    clearCompleted(): void { patchState(store, { tasks: store.tasks().filter((task) => !task.done) }); },
    reset(): void { patchState(store, initialState); }
  }))
);
