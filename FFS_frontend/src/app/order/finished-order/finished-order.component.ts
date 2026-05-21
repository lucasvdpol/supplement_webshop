import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-finished-order',
  imports: [
    TranslatePipe
  ],
  templateUrl: './finished-order.component.html',
  styleUrl: './finished-order.component.scss'
})
export class FinishedOrderComponent {

}
