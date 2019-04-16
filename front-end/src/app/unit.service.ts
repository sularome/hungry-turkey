import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Unit } from './units/Unit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UnitService {

  private unitsUrl = 'http://localhost:5005/units';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET units from the server */
  getUnits (): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.unitsUrl)
      .pipe(
        tap(units => this.log(`fetched units`)),
        catchError(this.handleError('getUnits', []))
      );
  }

  /** GET unit by id. Return `undefined` when id not found */
  getUnitNo404<Data>(id: number): Observable<Unit> {
    const url = `${this.unitsUrl}/?id=${id}`;
    return this.http.get<Unit[]>(url)
      .pipe(
        map(units => units[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} unit id=${id}`);
        }),
        catchError(this.handleError<Unit>(`getUnit id=${id}`))
      );
  }

  /** GET unit by id. Will 404 if id not found */
  getUnit(id: string): Observable<Unit> {
    const url = `${this.unitsUrl}/${id}`;
    return this.http.get<Unit>(url).pipe(
      tap(_ => this.log(`fetched unit id=${id}`)),
      catchError(this.handleError<Unit>(`getUnit id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new unit to the server */
  addUnit (unit: Unit): Observable<Unit> {
    const cloneUnit = JSON.parse(JSON.stringify(unit));
    delete cloneUnit._id;
    return this.http.post<Unit>(this.unitsUrl, cloneUnit, httpOptions).pipe(
      tap((unit: Unit) => this.log(`added unit w/ id=${unit._id}`)),
      catchError(this.handleError<Unit>('addUnit'))
    );
  }

  /** DELETE: delete the unit from the server */
  deleteUnit (unit: Unit | number): Observable<Unit> {
    const id = typeof unit === 'number' ? unit : unit._id;
    const url = `${this.unitsUrl}/${id}`;

    return this.http.delete<Unit>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted unit id=${id}`)),
      catchError(this.handleError<Unit>('deleteUnit'))
    );
  }

  /** PUT: update the unit on the server */
  updateUnit (unit: Unit): Observable<any> {
    const id = typeof unit === 'number' ? unit : unit._id;
    const url = `${this.unitsUrl}/${id}`;
    return this.http.put(url, unit, httpOptions).pipe(
      tap(_ => this.log(`updated unit id=${unit._id}`)),
      catchError(this.handleError<any>('updateUnit'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UnitService message with the MessageService */
  private log(message: string) {
    this.messageService.add('UnitService: ' + message);
  }
}
