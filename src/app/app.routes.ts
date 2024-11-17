import { Routes } from '@angular/router';
import { RecipelistComponent } from './components/recipelist/recipelist.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FavouriteRecipesComponent } from './components/favourite-recipes/favourite-recipes.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

export const routes: Routes = [
    { path: 'home', component: RecipelistComponent },
    { path: 'favourites', component: FavouriteRecipesComponent },
    { path: 'home/:id', component: RecipeCardComponent },
    { path: 'add-new', component: RecipeFormComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];
