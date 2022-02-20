import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParamsService } from './params.service';
import { Peripheral } from '../models/peripheral';

@Injectable({
    providedIn: 'root'
})
export class PeripheralService {

    url = 'peripherals';

    constructor(private http: HttpClient,
        private paramsService: ParamsService) {
    }

    getUrl() {
        return environment.apiUrl + this.url;
    }

    all(): Observable<any> {
        return this.http.get<any>(this.getUrl());
    }

    get(id: number): Observable<any> {
        return this.http.get<Peripheral>(this.getUrl() + '/' + id);
    }

    // save(item: any, toastBool = true): Observable<any> {
    //     const ask = !item.id;
    //     const toast = this.toastService.observe({
    //         loading: !!ask ? 'Guardando..' : 'Actualizando...',
    //         success: `${!!ask ? 'Guardado' : 'Actualizado'} con éxito`,
    //         error: `Error al ${!!ask ? 'guardar' : 'actualizar'}`
    //     });
    //     if (ask) {
    //         const obs = this.http.post<Gateway>(this.getUrl(), item);
    //         return !!toastBool ? obs.pipe(toast) : obs;
    //     } else {
    //         const obs = this.http.put<Gateway>(this.getUrl() + '/' + item.id, item);
    //         return !!toastBool ? obs.pipe(toast) : obs;
    //     }
    // }

    delete(id: number) {
        return this.http.delete<Peripheral>(this.getUrl() + '/' + id);
    }

}