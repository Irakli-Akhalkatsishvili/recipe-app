import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import { AsyncPipe, NgFor } from '@angular/common';
import { RecipeComponent } from "../recipe/recipe.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipelist',
  standalone: true,
  imports: [NgFor, RecipeComponent, AsyncPipe],
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes$ = this.recipeService.recipes$;
    this.recipeService.getRecipes().subscribe();
  }

  toggleFavourite(recipe: Recipe): void {
    recipe.favourite = !recipe.favourite;
    this.recipeService.updateRecipe(recipe.id!, recipe).subscribe();
  }

  deleteRecipe(recipeId: string): void {
    this.recipeService.deleteRecipe(recipeId);
  }
}
