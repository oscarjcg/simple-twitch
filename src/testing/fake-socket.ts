import { Observable, Subject } from 'rxjs';
import { vi } from 'vitest';

export class FakeSocket {
  private subjects = new Map<string, Subject<unknown>>();

  connect = vi.fn();
  disconnect = vi.fn();

  fromEvent<T = unknown>(eventName: string): Observable<T> {
    return this.subject(eventName).asObservable() as Observable<T>;
  }

  emit(eventName: string, value?: unknown) {
    this.subject(eventName).next(value);
  }

  private subject(eventName: string): Subject<unknown> {
    if (!this.subjects.has(eventName)) {
      this.subjects.set(eventName, new Subject<unknown>());
    }
    return this.subjects.get(eventName);
  }
}
