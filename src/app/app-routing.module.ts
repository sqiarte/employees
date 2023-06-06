import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';

const routes: Routes = [
  {path: "create", component: FirstPageComponent },
  {path: "update/:id", component: UpdatePageComponent },
  {path: "", component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
