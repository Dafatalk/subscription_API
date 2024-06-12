import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usersub',
  templateUrl: './usersub.component.html',
  styleUrls: ['./usersub.component.css']
})
export class UsersubComponent implements OnInit {
  plan: any;
  period: any;
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.plan = history.state.plan;
    this.period = history.state.period;
    this.endDate.setMonth(this.startDate.getMonth() + 1);
  }

  goBack(): void {
    this.router.navigate(['/choose']);
  }

}
