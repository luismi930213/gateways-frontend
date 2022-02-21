import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gateway } from '../models/gateway';
import { catchError, map } from 'rxjs/operators'
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
@Injectable({
    providedIn: 'root'
})
export class GatewayService {

    url = 'gateways';

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
        return this.http.get<Gateway>(this.getUrl() + '/' + id);
    }

    save(item: Gateway): Observable<Gateway> {
        if (item.id) {
            return this.http.put<Gateway>(this.getUrl() + '/' + item.id, item)
                .pipe(
                    map(m => {
                        this.notificationsService
                            .show('Great! Gateway edited successfully', { status: TuiNotification.Success }).subscribe()
                        return m
                    }),
                    catchError((err) => {
                        this.notificationsService
                            .show(err.error.errors[0].msg, { status: TuiNotification.Error }).subscribe()
                        throw Error(err)
                    })
                );
        } else {
            return this.http.post<Gateway>(this.getUrl(), item)
                .pipe(
                    map(m => {
                        this.notificationsService
                            .show('Great! Gateway created successfully', { status: TuiNotification.Success }).subscribe()
                        return m
                    }),
                    catchError((err) => {
                        this.notificationsService
                            .show(err.error.errors[0].msg, { status: TuiNotification.Error }).subscribe()
                        throw Error(err)
                    })
                );
        }
    }

    delete(id: number) {
        return this.http.delete<Gateway>(this.getUrl() + '/' + id)
            .pipe(
                map(m => {
                    this.notificationsService
                        .show('Great! Gateway deleted successfully', { status: TuiNotification.Success }).subscribe()
                    return m
                }),
                catchError((err) => {
                    this.notificationsService
                        .show('Ups! Something wrong happens.', { status: TuiNotification.Error }).subscribe()
                    throw Error(err)
                })
            );
    }

}