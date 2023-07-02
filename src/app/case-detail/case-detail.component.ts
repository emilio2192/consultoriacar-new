import { Component, Input } from '@angular/core';
import { Case } from 'app/store/interfaces/cases.interface';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent {
  @Input() case!: Case;
}
