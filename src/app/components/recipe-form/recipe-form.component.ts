import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Input() recipeId?: string;
  @Output() recipeAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private router: Router) {}
  
  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required]],
      instructions: ['', [Validators.required, Validators.minLength(20)]],
      image: [''],
      favourite: [false]
    });

    if (this.isEditMode && this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe((recipe) => {
        this.recipeForm.patchValue(recipe);
      })
    }
  }

  onSubmit(): void {
    const recipe: Recipe = this.recipeForm.value;

    if (this.isEditMode && this.recipeId) {
      this.recipeService.updateRecipe(this.recipeId, recipe).subscribe(() => {
        this.formUpdated.emit(true);
      });
    } else {
      this.recipeService.createRecipe(recipe).subscribe(() => {
        this.recipeAdded.emit(true);
      });
    }

    this.router.navigate(['/home']);
  }

}
