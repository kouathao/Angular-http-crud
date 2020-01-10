import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// add routes for our Home and About component
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";

// 2) add routes
const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
