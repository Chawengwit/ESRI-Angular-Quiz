import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistComponent } from './regist/regist.component';
import { SearchComponent } from './search/search.component';
import { PagehomeComponent } from './pagehome/pagehome.component'

const routes: Routes = [
  { path: 'Home', component: PagehomeComponent },
  { path: 'Regist', component: RegistComponent },
  { path: 'Search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
