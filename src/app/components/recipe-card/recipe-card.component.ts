import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [NgIf, UpperCasePipe],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent implements OnInit {
  recipe?: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeService.getRecipeById(recipeId).subscribe(r => this.recipe = r);
    }
  }
}
