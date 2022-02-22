import { Component, Inject, Injector, OnDestroy } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Gateway } from 'src/app/_core/models/gateway';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddComponent } from '../add/add.component';
import { GatewayService } from 'src/app/_core/services/gateway.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnDestroy {

  columns: any;
  gateways$: Observable<Gateway[]> = this.service.all()
  destroy$ = new Subject()

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private service: GatewayService
  ) {
    this.columns = ['no', 'name', 'ip', 'actions'];
  }

  remove(item: Gateway) {
    this.service.delete(item.id).subscribe(() => this.load());
  }

  load() {
    this.gateways$ = this.service.all()
  }

  private readonly dialog = (data?: Gateway) => this.dialogService.open<Gateway>(
    new PolymorpheusComponent(AddComponent, this.injector),
    {
      dismissible: true,
      data,
      label: !!data ? 'Edit Gateway' : 'New Gateway',
    },
  );

  private readonly dialogDetails = (data: Gateway) => this.dialogService.open<Gateway>(
    new PolymorpheusComponent(DetailsComponent, this.injector),
    {
      dismissible: true,
      data,
      label: 'Details',
    },
  );

  showDialog(item?: Gateway) {
    this.dialog(item)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.load());
  }

  showDetailsDialog(item: Gateway) {
    this.dialogDetails(item)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.service.get(item.id));
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
