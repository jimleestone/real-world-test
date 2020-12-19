import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .sendGetRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        this.products = res.body;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  public firstPage() {
    this.products = [];
    this.dataService
      .sendGetRequestToUrl(this.dataService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        this.products = res.body;
      });
  }

  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
      this.dataService
        .sendGetRequestToUrl(this.dataService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<Product[]>) => {
          this.products = res.body;
        });
    }
  }

  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService
        .sendGetRequestToUrl(this.dataService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<Product[]>) => {
          this.products = res.body;
        });
    }
  }

  public lastPage() {
    this.products = [];
    this.dataService
      .sendGetRequestToUrl(this.dataService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<Product[]>) => {
        this.products = res.body;
      });
  }
}
