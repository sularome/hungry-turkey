import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Meal } from './meal/Meal';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MealService {

  private mealsUrl = 'http://localhost:5005/meals';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET meals from the server */
  getMeals (): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.mealsUrl)
      .pipe(
        tap(meals => this.log(`fetched meals`)),
        catchError(this.handleError('getMeals', []))
      );
  }

  /** GET meal by id. Return `undefined` when id not found */
  getMealNo404<Data>(id: number): Observable<Meal> {
    const url = `${this.mealsUrl}/?id=${id}`;
    return this.http.get<Meal[]>(url)
      .pipe(
        map(meals => meals[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} meal id=${id}`);
        }),
        catchError(this.handleError<Meal>(`getMeal id=${id}`))
      );
  }

  /** GET meal by id. Will 404 if id not found */
  getMeal(id: number): Observable<Meal> {
    const url = `${this.mealsUrl}/${id}`;
    return this.http.get<Meal>(url).pipe(
      tap(_ => this.log(`fetched meal id=${id}`)),
      catchError(this.handleError<Meal>(`getMeal id=${id}`))
    );
  }

  /* GET meals whose name contains search term */
  searchMeals(term: string): Observable<Meal[]> {
    if (!term.trim()) {
      // if not search term, return empty meal array.
      return of([]);
    }
    return this.http.get<Meal[]>(`api/meals/?name=${term}`).pipe(
      tap(_ => this.log(`found meals matching "${term}"`)),
      catchError(this.handleError<Meal[]>('searchMeales', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new meal to the server */
  addMeal (meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.mealsUrl, meal, httpOptions).pipe(
      tap((meal: Meal) => this.log(`added meal w/ id=${meal.id}`)),
      catchError(this.handleError<Meal>('addMeal'))
    );
  }

  /** DELETE: delete the meal from the server */
  deleteMeal (meal: Meal | number): Observable<Meal> {
    const id = typeof meal === 'number' ? meal : meal.id;
    const url = `${this.mealsUrl}/${id}`;

    return this.http.delete<Meal>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted meal id=${id}`)),
      catchError(this.handleError<Meal>('deleteMeal'))
    );
  }

  /** PUT: update the meal on the server */
  updateMeal (meal: Meal): Observable<any> {
    return this.http.put(this.mealsUrl, meal, httpOptions).pipe(
      tap(_ => this.log(`updated meal id=${meal.id}`)),
      catchError(this.handleError<any>('updateMeal'))
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

  /** Log a MealService message with the MessageService */
  private log(message: string) {
    this.messageService.add('MealService: ' + message);
  }
}
