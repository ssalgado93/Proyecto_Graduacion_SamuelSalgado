import { Component, OnInit, Input } from '@angular/core';
import { ChartsService } from '../../SERVICES/charts.service';
import { dataChart } from '../../../assets';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css'],
})
export class GraphicComponent implements OnInit {
  labels: string[] = [];
  data: number[] = [];
  showLabelsY: boolean = true;
  constructor(private ChartsService: ChartsService) {}

  @Input() type: 'bar' | 'doughnut' | 'line' | 'pie' = 'line';
  @Input() label: string = '';
  @Input() width: string = '500px';
  @Input() showLabelsX: boolean = false;
  @Input() idCanva: string = '0';

  colorBar: string[] = ['rgba(126, 225, 252, 0.7)', 'rgba(183,184,230, 0.7)'];
  borderColorLine: string = 'rgb(183,184,230)';
  pointBackgroundColor: string = 'rgb(190,190,255)';
  colorDoughnut: string[] = [
    'rgb(241,156,162)',
    'rgb(150,136,191)',
    'rgb(141,212,246)',
    'rgb(213,227,158)',
    'rgb(250,205,146)',
    'rgb(240,153,124)',
    'rgb(243,236,220)',
    'rgb(201,153,193)',
    'rgb(149,178,220)',
    'rgb(152,205,158)',
    'rgb(253,246,158)',
    'rgb(245,182,139)',
  ];

  options: ChartOptions = {};

  dataChartBar: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  dataChartLine: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };

  dataChartPie: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };

  dataChartDoughnut: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  private bar() {
    console.log(this.labels);
    this.dataChartBar = {
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          data: this.data,
          backgroundColor:
            this.type == 'bar'
              ? this.colorBar
              : this.type == 'doughnut' || this.type == 'pie'
              ? this.colorDoughnut
              : this.type == 'line'
              ? 'rgba(100,100,200,.2)'
              : '',
          borderColor:
            this.type == 'line'
              ? this.borderColorLine
              : this.type == 'doughnut' || this.type == 'pie'
              ? 'rgba(0,0,0,0)'
              : '',
        },
      ],
    };
  }

  private line() {
    this.dataChartLine = {
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          data: this.data,
          tension: 0.3,
          backgroundColor:
            this.type == 'bar'
              ? this.colorBar
              : this.type == 'doughnut' || this.type == 'pie'
              ? this.colorDoughnut
              : this.type == 'line'
              ? 'rgba(100,100,200,.2)'
              : '',
          borderColor:
            this.type == 'line'
              ? this.borderColorLine
              : this.type == 'doughnut' || this.type == 'pie'
              ? 'rgba(0,0,0,0)'
              : '',
          pointBackgroundColor:
            this.type == 'line' ? this.pointBackgroundColor : '',
          fill: true,
        },
      ],
    };
  }

  private pie() {
    this.dataChartPie = {
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          data: this.data,
          backgroundColor:
            this.type == 'bar'
              ? this.colorBar
              : this.type == 'doughnut' || this.type == 'pie'
              ? this.colorDoughnut
              : this.type == 'line'
              ? 'rgba(100,100,200,.2)'
              : '',
          borderColor:
            this.type == 'line'
              ? this.borderColorLine
              : this.type == 'doughnut' || this.type == 'pie'
              ? 'rgba(0,0,0,0)'
              : '',
          hoverOffset: 4,
        },
      ],
    };
  }

  private doughnut() {
    this.dataChartDoughnut = {
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          data: this.data,
          backgroundColor:
            this.type == 'bar'
              ? this.colorBar
              : this.type == 'doughnut' || this.type == 'pie'
              ? this.colorDoughnut
              : this.type == 'line'
              ? 'rgba(100,100,200,.2)'
              : '',
          borderColor:
            this.type == 'line'
              ? this.borderColorLine
              : this.type == 'doughnut' || this.type == 'pie'
              ? 'rgba(0,0,0,0)'
              : '',
          hoverOffset: 4,
        },
      ],
    };
  }

  ngOnInit(): void {
    this.ChartsService.selectedData$.subscribe((ch: dataChart) => {
      if (ch.id == this.idCanva) {
        this.data = ch.data;
        this.labels = ch.labels;
        this.showLabelsY = ch.y;
        this.loadData();
      }
    });
  }

  loadData() {
    if (this.type == 'bar') {
      this.bar();
    } else if (this.type == 'line') {
      this.line();
    } else if (this.type == 'pie') {
      this.pie();
    } else {
      this.doughnut();
    }

    this.options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            display: this.showLabelsY,
          },
          grid: {
            drawBorder:
              this.type == 'doughnut' || this.type == 'pie' ? false : true,
            drawTicks:
              this.type == 'doughnut' || this.type == 'pie' ? false : true,
            drawOnChartArea:
              this.type == 'doughnut' || this.type == 'pie' ? false : true,
          },
        },
        x: {
          ticks: {
            display: this.showLabelsX,
          },
          grid: {
            drawBorder:
              this.type == 'doughnut' || this.type == 'pie' ? false : true,
            drawTicks:
              this.type == 'doughnut' || this.type == 'pie' ? false : true,
            drawOnChartArea: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }
}
