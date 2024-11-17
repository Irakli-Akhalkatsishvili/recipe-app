import { Routes } from '@angular/router';
import { RecipelistComponent } from './components/recipelist/recipelist.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

export const routes: Routes = [
    { path: 'home', component: RecipelistComponent },
    { path: 'home/favourites', component: RecipelistComponent },
    { path: 'add-new', component: RecipeFormComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', component: RecipelistComponent }
];
