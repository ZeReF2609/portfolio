import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Canal compartido para lanzar el tour guiado desde cualquier parte (p. ej. el botón del header).
// TourComponent se suscribe a `startRequested$` y abre el tour desde el primer paso.
@Injectable({ providedIn: 'root' })
export class TourService {
  private readonly startSubject = new Subject<void>();
  readonly startRequested$: Observable<void> = this.startSubject.asObservable();

  start(): void {
    this.startSubject.next();
  }
}
