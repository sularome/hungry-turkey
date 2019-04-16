import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Ingredient } from './ingredient/Ingredient';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IngredientService {

  private ingredientsUrl = 'http://localhost:5005/ingredients';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET ingredients from the server */
  getIngredients (): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl)
      .pipe(
        tap(ingredients => this.log(`fetched ingredients`)),
        catchError(this.handleError('getIngredients', []))
      );
  }

  /** GET ingredient by id. Return `undefined` when id not found */
  getIngredientNo404<Data>(id: number): Observable<Ingredient> {
    const url = `${this.ingredientsUrl}/?ingredientId=${id}`;
    return this.http.get<Ingredient[]>(url)
      .pipe(
        map(ingredients => ingredients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} ingredient id=${id}`);
        }),
        catchError(this.handleError<Ingredient>(`getIngredient id=${id}`))
      );
  }

  /** GET ingredient by id. Will 404 if id not found */
  getIngredient(id: string): Observable<Ingredient> {
    const url = `${this.ingredientsUrl}/${id}`;
    return this.http.get<Ingredient>(url).pipe(
      tap(_ => this.log(`fetched ingredient id=${id}`)),
      catchError(this.handleError<Ingredient>(`getIngredient id=${id}`))
    );
  }

  /* GET ingredients whose name contains search term */
  searchIngredients(term: string): Observable<Ingredient[]> {
    if (!term.trim()) {
      // if not search term, return empty ingredient array.
      return of([]);
    }
    return this.http.get<Ingredient[]>(`api/ingredients/?name=${term}`).pipe(
      tap(_ => this.log(`found ingredients matching "${term}"`)),
      catchError(this.handleError<Ingredient[]>('searchIngredientes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new ingredient to the server */
  addIngredient (ingredient: Ingredient): Observable<Ingredient> {
    const ingredientRecipe = JSON.parse(JSON.stringify(ingredient));
    delete ingredientRecipe._id;
    return this.http.post<Ingredient>(this.ingredientsUrl, ingredientRecipe, httpOptions).pipe(
      tap((ingredient: Ingredient) => this.log(`added ingredient w/ id=${ingredient._id}`)),
      catchError(this.handleError<Ingredient>('addIngredient'))
    );
  }

  /** DELETE: delete the ingredient from the server */
  deleteIngredient (ingredient: Ingredient | number): Observable<Ingredient> {
    const id = typeof ingredient === 'number' ? ingredient : ingredient._id;
    const url = `${this.ingredientsUrl}/${id}`;

    return this.http.delete<Ingredient>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted ingredient id=${id}`)),
      catchError(this.handleError<Ingredient>('deleteIngredient'))
    );
  }

  /** PUT: update the ingredient on the server */
  updateIngredient (ingredient: Ingredient): Observable<any> {
    const url = `${this.ingredientsUrl}/${ingredient._id}`;
    return this.http.put(url, ingredient, httpOptions).pipe(
      tap(_ => this.log(`updated ingredient id=${ingredient._id}`)),
      catchError(this.handleError<any>('updateIngredient'))
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

  /** Log a IngredientService message with the MessageService */
  private log(message: string) {
    this.messageService.add('IngredientService: ' + message);
  }
}
