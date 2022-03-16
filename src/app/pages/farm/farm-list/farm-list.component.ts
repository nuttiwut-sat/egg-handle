import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { minString } from 'src/app/engine/extension';
import { IFarm } from 'src/app/models/farm.model';
import { AuthorizeService } from 'src/app/services/authorize.service';
import { CrudService } from 'src/app/services/crud.service';
import { PageControllerService } from 'src/app/services/page-controller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.scss'],
})
export class FarmListComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject();
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  constructor(
    private auth: AuthorizeService,
    private router: Router,
    private crud: CrudService,
    private pageService: PageControllerService
  ) {}

  public searchText: string = '';
  public farms: IFarm[] = [];
  public filterFarms: IFarm[] = [];
  public displayedColumns: string[] = ['name', 'updatedAt', 'createdAt'];
  public isAdmin: boolean = false;

  ngOnInit(): void {
    this.pageService.isMainpage$.next(true);
    this.crud
      .get<IFarm[]>(`/farm`)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        async (res: any) => {
          const resFarm: IFarm[] = res;

          this.farms = resFarm.map((farm) => {
            const updatedAt = moment(farm.updatedAt).format('YYYY/MM/DD');
            const createdAt = moment(farm.createdAt).format('YYYY/MM/DD');
            return {
              ID: farm.ID,
              name: farm.name,
              updatedAt,
              createdAt,
            };
          });
          // this.isAdmin = role?.name.toUpperCase() === 'ADMIN';
          // this.farms = this.isAdmin
          //   ? resFarm
          //   : resFarm.filter((u) => u.isEnable);
          this.filterFarm();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            text: error.error.message,
          });
        },
        () => {
          this.pageService.isLoading$.next(false);
        }
      );
  }

  filterFarm(): void {
    if (this.farms.length > 0) {
      this.filterFarms = this.farms
        .filter((farm) => {
          const search = this.searchText.toLowerCase();
          return (
            // farm.addressContract?.toLowerCase().includes(search) ||
            // farm.email?.toLowerCase().includes(search) ||
            farm.name?.toLowerCase().includes(search)
          );
        })
        .map((farm) => {
          return farm;
        });
    }
    console.log(this.filterFarms);
  }

  getRecord(id: string): void {
    // this.router.navigate([`farm/profile/${id}`]);
  }
}
