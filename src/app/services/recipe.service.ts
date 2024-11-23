import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl: string = 'http://localhost:3000/recipes';
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$: Observable<Recipe[]> = this.recipesSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      tap((recipes) => this.recipesSubject.next(recipes))
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, recipe).pipe(
      tap(newRecipe => {
        const currentRecipes = this.recipesSubject.value;
        this.recipesSubject.next([...currentRecipes, newRecipe]);
      })
    );
  }

  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/${id}`, recipe).pipe(
      tap(updatedRecipe => {
        const currentRecipes = this.recipesSubject.value.map(rec => rec.id === id ? updatedRecipe : rec);
        this.recipesSubject.next(currentRecipes);
      })
    );
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentRecipes = this.recipesSubject.value.filter(rec => rec.id !== id);
        this.recipesSubject.next(currentRecipes);
      })
    );
  }
}
