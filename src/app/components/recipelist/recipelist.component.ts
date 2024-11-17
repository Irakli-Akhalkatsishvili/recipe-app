import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import { AsyncPipe, NgFor } from '@angular/common';
import { RecipeComponent } from "../recipe/recipe.component";
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";

@Component({
  selector: 'app-recipelist',
  standalone: true,
  imports: [NgFor, AsyncPipe, RecipeComponent, RecipeFormComponent],
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;
  favButton: boolean = false;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.showAll();
  }

  toggleFavourite(recipe: Recipe): void {
    recipe.favourite = !recipe.favourite;

    this.recipeService.updateRecipe(recipe.id!, recipe).subscribe();
    if (this.favButton) {
      this.showFavs();
    }
  }

  toggleView(): void {
    this.favButton = !this.favButton;
    if (this.favButton) {
      this.showFavs();
    } else {
      this.showAll();
    }
  }

  showFavs(): void {
    this.recipes$ = this.recipeService.getRecipes()
    .pipe(
      map(recipes => recipes.filter(recipe => recipe.favourite))
    );
  }

  showAll(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }

  showInstructions(recipe: Recipe): string {
    return recipe.instructions;
  }

  toggleFavButton(): void {
    this.favButton = !this.favButton;
  }

  deleteRecipe(recipeId: string) {
    this.recipeService.deleteRecipe(recipeId).subscribe(() => this.showAll());
  }
}
