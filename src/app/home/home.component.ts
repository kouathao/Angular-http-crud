import { Component, OnInit } from "@angular/core";
// import data to component
import { DataService } from "../data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  // pass in product object
  products = [];

  // pass dataservice to constructor
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: any[]) => {
      console.log(data);
      // When data is received, we added it in the products array.
      this.products = data;
    });
  }
}
