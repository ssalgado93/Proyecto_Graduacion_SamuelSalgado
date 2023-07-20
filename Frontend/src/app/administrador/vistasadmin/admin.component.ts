import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  eliminaToken(){
    if (localStorage.getItem('token')!=null && localStorage.getItem('token') != ""){
      localStorage.removeItem('token')
      localStorage.removeItem('isAdmin')
    }
  }

}
