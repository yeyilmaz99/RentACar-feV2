import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUserId } from 'src/app/components/auth/state/auth.selector';
import { Rent } from 'src/app/models/rentModel';
import { RentalModel } from 'src/app/models/rentalModel';
import { getCurrentId } from 'src/app/router/router.selector';
import { AppState } from 'src/app/store/app.state';
import { checkIfCarIsReturned } from '../../state/car.actions';
import { getCarById, getCarDetails, isReturned } from '../../state/car.selector';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { Findeks } from 'src/app/models/findeks';
import { FindeksService } from 'src/app/services/findeksService/findeks.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UpdateFindeks } from 'src/app/models/updateFindeks';
import { SignalRService } from 'src/app/services/signal-r/signal-r.service';
import { DomSanitizer } from '@angular/platform-browser';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

declare var IyzipayCheckoutForm: any; // Iyzico JavaScript kütüphanesi

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  @ViewChild('myModal') modalElement!: ElementRef;
  campaignOne: FormGroup;
  carId:number;
  userFindeksPoint:number
  isReturned:any;
  userId:number;
  paymentForm:FormGroup;
  success:string = "Payment Success";
  isPaymentSuccess:boolean = false;;
  paymentValue;
  unTrustedUrl;
  trustedUrl;
  price:number;
  constructor( private formBuilder:FormBuilder, private store:Store<AppState>,    private router: Router, private toastrService:ToastrService, private rentalService:RentalService,
    private paymentService:PaymentService,
    private userService:UserService,
    private findeksService:FindeksService,
    private signalR:SignalRService,
    private sanitizer:DomSanitizer
    ) {    this.store.select(getCarDetails).subscribe(resp=>{
      this.price = resp.dailyPrice
    }) }
  returnDate:Date = null;
  ngOnInit(): void {
    this.getCarId();
    this.getUserId();
    this.createPaymentForm();
    this.datePicker();
    this.checkIfCarIsReturned();
    this.getUsersFindeksPoint()
    this.signalR.startConnection();
    this.signalR.paymentResult((data:any) => {
      if(data.status ==="success"){
        this.isPaymentSuccess = true;
        this.rentACar();
      }

    });
  }

  getForm() {
    this.paymentService.paymentForm(this.price.toString()).subscribe(response => {
      this.signalR.registerTransactionId(response.token)
      this.paymentValue = response;
      this.unTrustedUrl = response.checkoutFormContent;
      this.trustedUrl = this.sanitizer.bypassSecurityTrustHtml(this.unTrustedUrl);
    }, error => {
      console.error(error);
    });
  }



  datePicker() {
    this.campaignOne = this.formBuilder.group({
      rentDate: [new Date(year, month, today.getDate()), Validators.required],
      returnDate: [this.returnDate],
      carId: [this.carId, Validators.required],
    });
  }

  checkIfCarIsReturned(){
    this.rentalService.checkIfCarIsReturned(this.carId).subscribe(response =>{
    },responseError=>{
      this.toastrService.error(responseError.error.message)
      this.router.navigate(['/cars']);
    })
  }

  getCarId(){
    this.store.select(getCurrentId).subscribe(response => {
      this.carId = response
    })
  }

  getUserId(){
    this.store.select(getUserId).subscribe(response => {
      this.userId = response
    })
  }

  rentACar() {
    if (this.campaignOne.valid) {
      let rent: Rent = Object.assign({}, this.campaignOne.value);
      rent.userId = this.userId;
      this.rentalService.addRental(rent).subscribe(
        (response) => {
          Swal.fire("Payment Successful",'','success');
          this.checkIfAlreadyExists();
          this.router.navigate(['/user/rentals'])
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    }
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardName: ['',Validators.required],
      cardNumber: ['',Validators.required],
      expirationDate: ['',Validators.required],
      securityCode: ['',Validators.required]
    });
  }

  checkIfAlreadyExists(){
    this.findeksService.checkIfAlreadyExists(this.userId).subscribe(response => {
      this.updateFindeksPoint();
    },responseError => {
      this.addFindeksPoint();
    })
  }


  payment(){
    if (this.paymentForm.valid){
      let payment: Payment = {
        ...this.paymentForm.value,
        cardNumber: this.paymentForm.value.cardNumber.toString(),
        securityCode: this.paymentForm.value.securityCode.toString(),
        expirationDate: this.paymentForm.value.expirationDate.toString()
      };
      this.paymentService.add(payment).subscribe( (response) => {
        this.toastrService.success("Payment Successful");
        this.rentACar();
        
      },
      (responseError)=> {
        this.toastrService.error(responseError.error.message);
      }
      )
    }
  }

  payment1(){

  }


  updateFindeksPoint(){
    let findeks:UpdateFindeks = {userId:this.userId,findeksPoint:0};
    this.getUsersFindeksPoint();
    findeks.findeksPoint = this.userFindeksPoint + 100;
    this.findeksService.updateFindeks(findeks).subscribe(response =>{
      this.toastrService.success("You got 100 more findeks point", "Nice!");
    },responseError =>{
      this.toastrService.error("Failed to update your findeks point");
    })
  }

  getUsersFindeksPoint(){
    this.findeksService.getByUserId(this.userId).subscribe(response=>{
      let findeksPoint:number;
      findeksPoint = response.data.findeksPoint ;
      this.userFindeksPoint = findeksPoint;
    })
  }


  addFindeksPoint(){
    let findeks:Findeks = {userId:this.userId,id:0,findeksPoint:0};
    findeks.findeksPoint = 100;
    this.findeksService.addFindeks(findeks).subscribe(response => {
      this.toastrService.success("You got 100 findeks point", "Nice!");
      let userToUpdate = {id:this.userId,firstName:"",lastName:"",email:"",status:true};
      this.userService.updateUser(userToUpdate).subscribe(response  =>{
        this.toastrService.success("You're a active user now", "Nice!");
      },responseError => {
        this.toastrService.error("Failed to update status");
      })
    },responseError => {
      this.toastrService.error("Failed to update your findeks point");
    })
  }

}
