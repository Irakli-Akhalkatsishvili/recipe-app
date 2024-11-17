import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { NgIf, UpperCasePipe } from '@angular/common';
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [NgIf, RecipeFormComponent, UpperCasePipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  @Input() recipe!: Recipe;
  @Output() recipeChanged: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() statusChanged: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  selectedRecipeId?: string;
  isEditMode: boolean = false;
  showForm: boolean = false;
  showInstructions: boolean = false;

  editRecipe(recipeId: any) {
    this.selectedRecipeId = recipeId;
    this.isEditMode = true;
  }

  toggleRecipeForm(): void {
    this.showForm = !this.showForm;
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  updateRecipe(): void {
    this.recipeChanged.emit(this.recipe);
  }

  toggleFavourite(): void {
    this.statusChanged.emit(this.recipe);
  }

  deleteRecipe(recipeId: any): void {
    if (!recipeId) {
      return;
    }

    this.delete.emit(recipeId);
  }

}
