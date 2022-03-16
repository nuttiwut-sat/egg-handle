import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, LinearScale, LineController, LineElement, PointElement, registerables, Title, CategoryScale } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void { }

  canvas: any;
  ctx: any;
  @ViewChild('myChart') mychart: any;

  ngAfterViewInit(): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      const labels = ['1', '2', '3', '4', '5', '6', '7']
      const data = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 100],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
      const config = {
        type: 'line',
        data: data,
      } as ChartConfiguration;
      const myChart = new Chart(this.ctx, config);
    }
  }


}
