import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-favourite-recipes',
  standalone: true,
  imports: [RecipeComponent, AsyncPipe, NgFor],
  templateUrl: './favourite-recipes.component.html',
  styleUrl: './favourite-recipes.component.css'
})
export class FavouriteRecipesComponent implements OnInit {

  favourites$!: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.favourites$ = this.recipeService.recipes$.pipe(
      map(recipes => recipes.filter(recipe => recipe.favourite))
    );
  }

  toggleFavourite(recipe: Recipe): void {
    recipe.favourite = !recipe.favourite;
    this.recipeService.updateRecipe(recipe.id!, recipe).subscribe();
  }

  deleteRecipe(recipeId: string): void {
    this.recipeService.deleteRecipe(recipeId).subscribe();
  }
}
