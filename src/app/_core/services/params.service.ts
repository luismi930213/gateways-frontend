import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ParamsService {

    getParams(skip?: number, limit?: number, order?: string): HttpParams {
        let params = new HttpParams();
        if (!!skip) {
            params = params.append('skip', skip.toString());
        }
        if (!!limit) {
            params = params.append('limit', limit.toString());
        }
        if (!!order) {
            params = params.append('order', order);
        }

        return params;
    }
}
