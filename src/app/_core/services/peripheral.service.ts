import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Peripheral } from '../models/peripheral';
import { catchError, map, tap } from 'rxjs/operators'
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
@Injectable({
    providedIn: 'root'
})
export class PeripheralService {

    url = 'peripherals';

    constructor(private http: HttpClient,
        @Inject(TuiNotificationsService)
        private readonly notificationsService: TuiNotificationsService) {
    }

    getUrl() {
        return environment.apiUrl + this.url;
    }

    all(): Observable<any> {
        return this.http.get<any>(this.getUrl()).pipe(map(m => m.rows));
    }

    get(id: number): Observable<any> {
        return this.http.get<Peripheral>(this.getUrl() + '/' + id);
    }

    save(item: Peripheral): Observable<Peripheral> {
        if (item.id) {
            return this.http.put<Peripheral>(this.getUrl() + '/' + item.id, item)
                .pipe(
                    tap(() => this.notificationsService
                        .show('Great! Peripheral edited successfully.', { status: TuiNotification.Success }).subscribe()),
                    catchError((err) => {
                        this.notificationsService
                            .show(err.error.errors[0].msg, { status: TuiNotification.Error }).subscribe()
                        return throwError(err)
                    })
                );
        } else {
            return this.http.post<Peripheral>(this.getUrl(), item)
                .pipe(
                    tap(() => this.notificationsService
                        .show('Great! Peripheral created successfully.', { status: TuiNotification.Success }).subscribe()),
                    catchError((err) => {
                        this.notificationsService.show(err.error.errors[0].msg, { status: TuiNotification.Error }).subscribe()
                        return throwError(err)
                    })
                );
        }
    }

    delete(id: number) {
        return this.http.delete<Peripheral>(this.getUrl() + '/' + id)
            .pipe(
                tap(() => this.notificationsService
                    .show('Great! Peripheral deleted successfully.', { status: TuiNotification.Success }).subscribe()),
                catchError((err) => {
                    this.notificationsService.show('Ups! Something wrong happens.', { status: TuiNotification.Error }).subscribe()
                    return throwError(err)
                })
            );
    }

}