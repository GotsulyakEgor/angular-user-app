import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListOfUsersComponent implements OnInit {

  users: any[] = [];
  isLoading = true;

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.httpService.getUsers().subscribe((data: any) => {
      this.isLoading = false;
      this.users = data;
    })
  }

  sortByCity() {
    this.users.sort((a, b) => a.address.city.localeCompare(b.address.city));
  }

  sortByCompany() {
    this.users.sort((a, b) => a.company.name.localeCompare(b.company.name));
  }

  getDetails(id: number) {
    this.router.navigate(['/details', id])
  }

}
