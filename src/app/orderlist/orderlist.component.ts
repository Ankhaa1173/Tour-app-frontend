import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.scss',
})
export class OrderlistComponent {
  @Input() tourDate: any;
  @Input() orderDate: any;
  @Input() payAmount: any;
  @Input() paidAmount: any;
  @Input() isConfirmed: any;
  @Input() status: any;
}
