import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../../SERVICES/charts.service';
import { categories } from '../../../assets/interfaces';
type chartType = 'bar' | 'doughnut' | 'line' | 'pie';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(private ChartsService: ChartsService) {}

  labels: string[] = [];
  data: number[] = [];
  selectedTypeChartCategories: chartType = 'bar';
  selectedTypeChartRegister: chartType = 'line';
  selectedTypeChartCategoriesTop: chartType = 'pie';
  selectedTypeChartViews: chartType = 'line';
  topCategories = { label: '', value: 0 };
  downCategories = { label: '', value: 0 };
  topCategory = { label: '', value: 0 };
  downCategory = { label: '', value: 0 };
  topRegister = { label: '', value: 0 };
  downRegister = { label: '', value: 0 };
  topViews = { label: '', value: 0 };
  downViews = { label: '', value: 0 };

  selectChart = {
    select: 0,
    selectTypeRegister: 7,
    selectTypeViews: 7,
  };

  selectRegister = {
    firstDate: this.sumarDias(new Date(Date.now()), -7)
      .toISOString()
      .substring(0, 10),
    lastDate: new Date(Date.now()).toISOString().substring(0, 10),
  };

  selectViews = {
    firstDate: this.sumarDias(new Date(Date.now()), -7)
      .toISOString()
      .substring(0, 10),
    lastDate: new Date(Date.now()).toISOString().substring(0, 10),
  };

  categories: categories[] = [];

  ngOnInit(): void {
    this.ChartsService.getProductCategories().subscribe((res: any) => {
      this.categories = res;
      this.categories.push({
        id_product_category: 0,
        var_name: 'Seleccione una categoría',
      });
    });
    this.getDataCategories('1');
    this.getRegisterUserData('2');
    this.getCategoryTop('3');
    this.getViewsData('4')
  }

  getViewsData(id:string){
    this.ChartsService.getViews(this.selectViews).subscribe(
      (res: any) => {
        if (res.status == '200') {
          this.infoDataViews(
            res.labels[0],
            res.labels[res.labels.length - 1],
            res.data[0],
            res.data[res.data.length - 1]
          );
          this.ChartsService.setData({
            data: res.data,
            labels: res.labels,
            id: id,
            y:
              this.selectedTypeChartCategories == 'bar' ||
              this.selectedTypeChartCategories == 'line'
                ? true
                : false,
          });
        } else {
          console.log(res.msg);
        }
      }
    );
  }

  getCategoryTop(id:string){
    this.ChartsService.getCategoriesChart().subscribe(
      (res: any) => {
        if (res.status == '200') {
          this.infoDataCategory(
            res.labels[0],
            res.labels[res.labels.length - 1],
            res.data[0],
            res.data[res.data.length - 1]
          );
          this.ChartsService.setData({
            data: res.data,
            labels: res.labels,
            id: id,
            y:
              this.selectedTypeChartCategories == 'bar' ||
              this.selectedTypeChartCategories == 'line'
                ? true
                : false,
          });
        } else {
          console.log(res.msg);
        }
      }
    );
  }

  sumarDias(fecha: Date, dias: number) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  mostrarTrae(id: string) {
    this.ChartsService.getRegisterUser(this.selectRegister).subscribe(
      (res: any) => {
        if (res.status == '200') {
          this.topRegister = res.up;
          this.downRegister = res.down;
          this.ChartsService.setData({
            data: res.data,
            labels: res.labels,
            id: id,
            y:
              this.selectedTypeChartCategories == 'bar' ||
              this.selectedTypeChartCategories == 'line'
                ? true
                : false,
          });
        } else {
          console.log(res.msg);
        }
      }
    );
  }

  getViewData(id: string) {
    if (this.selectChart.selectTypeViews != 0) {
      this.selectViews = {
        firstDate: this.sumarDias(
          new Date(Date.now()),
          -this.selectChart.selectTypeViews
        )
          .toISOString()
          .substring(0, 10),
        lastDate: new Date(Date.now()).toISOString().substring(0, 10),
      };
      this.getViewsData(id)
    }
  }

  getRegisterUserData(id: string) {
    if (this.selectChart.selectTypeRegister != 0) {
      this.selectRegister = {
        firstDate: this.sumarDias(
          new Date(Date.now()),
          -this.selectChart.selectTypeRegister
        )
          .toISOString()
          .substring(0, 10),
        lastDate: new Date(Date.now()).toISOString().substring(0, 10),
      };
      this.mostrarTrae(id) 
    }
  }

  getDataCategories(id: string) {
    this.ChartsService.getDataCategory(this.selectChart.select).subscribe(
      (res: any) => {
        if (res.status == '200') {
          this.infoData(
            res.labels[0],
            res.labels[res.labels.length - 1],
            res.data[0],
            res.data[res.data.length - 1]
          );
          this.ChartsService.setData({
            data: res.data,
            labels: res.labels,
            id: id,
            y:
              this.selectedTypeChartCategories == 'bar' ||
              this.selectedTypeChartCategories == 'line'
                ? true
                : false,
          });
        } else {
          console.log(res.msg);
        }
      }
    );
  }

  changeChart(id: string, typeC: chartType) {
    if (id == '1') {
      this.selectedTypeChartCategories = typeC;
      this.ChartsService.getDataCategory(this.selectChart.select).subscribe(
        (res: any) => {
          if (res.status == '200') {
            this.infoData(
              res.labels[0],
              res.labels[res.labels.length - 1],
              res.data[0],
              res.data[res.data.length - 1]
            );
            this.ChartsService.setData({
              data: res.data,
              labels: res.labels,
              id: id,
              y:
                this.selectedTypeChartCategories == 'bar' ||
                this.selectedTypeChartCategories == 'line'
                  ? true
                  : false,
            });
          } else {
            console.log(res.msg);
          }
        }
      );
    } else if (id == '2') {
      this.selectedTypeChartRegister = typeC;
      this.mostrarTrae(id) 
    }else if (id == '3'){
      this.selectedTypeChartCategoriesTop = typeC;
      this.getCategoryTop(id)
    }else if (id == '4'){
      this.selectedTypeChartViews = typeC;
      this.getViewsData(id)
    }
  }

  infoData(
    labelTop: string,
    labelDown: string,
    valueTop: number,
    valueDown: number
  ) {
    this.topCategories.label = labelTop;
    this.topCategories.value = valueTop;
    this.downCategories.label = labelDown;
    this.downCategories.value = valueDown;
  }

  infoDataCategory(
    labelTop: string,
    labelDown: string,
    valueTop: number,
    valueDown: number
  ) {
    this.topCategory.label = labelTop;
    this.topCategory.value = valueTop;
    this.downCategory.label = labelDown;
    this.downCategory.value = valueDown;
  }

  infoDataViews(
    labelTop: string,
    labelDown: string,
    valueTop: number,
    valueDown: number
  ) {
    this.topViews.label = labelTop;
    this.topViews.value = valueTop;
    this.downViews.label = labelDown;
    this.downViews.value = valueDown;
  }

}
