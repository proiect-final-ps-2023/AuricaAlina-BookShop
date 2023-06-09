import {Component, OnInit} from '@angular/core';
import {GiftCard} from "../model/GiftCard";
import {BookService} from "../services/book.service";
import {ClientService} from "../services/client.service";
import {FormBuilder} from "@angular/forms";
import {Bill} from "../model/Bill";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-gift-card-page',
  templateUrl: './gift-card-page.component.html',
  styleUrls: ['./gift-card-page.component.css']
})
export class GiftCardPageComponent implements OnInit{

  giftCard : GiftCard = new GiftCard()

  constructor(private clientService:ClientService,
              private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
  }

  generateGiftCard(){
    console.log(this.giftCard)
    const user: any = localStorage.getItem("token")
    var tokenPayload: any;
    tokenPayload = jwt_decode(user)
    this.clientService.generateGiftCard(tokenPayload.sub, this.giftCard.personName, this.giftCard.money).subscribe(
      (giftCardAux : GiftCard) =>{
        console.log(giftCardAux)
        this.giftCard = giftCardAux
        alert("Generate giftCard successfully")
      },
      (_error: Error) => {
        alert("Generate failed")
      })
  }

}
