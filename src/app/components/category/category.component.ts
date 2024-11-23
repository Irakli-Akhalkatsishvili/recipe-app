import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}
  categories$!: Observable<Set<string>>;
  
  ngOnInit(): void {
      this.categories$ = this.recipeService.recipes$.pipe(map(recipes => new Set(recipes.map((recipe) => recipe.category))));
  }
}
