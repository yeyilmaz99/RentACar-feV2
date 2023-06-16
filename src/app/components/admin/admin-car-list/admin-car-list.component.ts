import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/models/car.model';
import { AppState } from 'src/app/store/app.state';
import { getCars } from '../../car/state/car.selector';
import { deleteCarAction, loadCars } from '../../car/state/car.actions';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CarDelete } from 'src/app/models/carDelete';
@Component({
  selector: 'app-admin-car-list',
  templateUrl: './admin-car-list.component.html',
  styleUrls: ['./admin-car-list.component.css']
})
export class AdminCarListComponent implements OnInit {
  cars:Car[]
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.store.select(getCars).subscribe(response => {
      this.cars = response
      if(this.cars == null){
        this.store.dispatch(loadCars());
      }
    });
  }


  delete(carToDeleteId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        let carToDelete: CarDelete = {id:carToDeleteId,brandId:0,carName:'',colorId:0,dailyPrice:0,description:'',modelYear:0}
        this.store.dispatch(deleteCarAction({carToDelete, redirect:false}))
      }
    })
  }

}
