import { Component, Inject, Injector, OnDestroy } from '@angular/core';
import { Peripheral } from 'src/app/_core/models/peripheral';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddComponent } from '../add/add.component';
import { PeripheralService } from 'src/app/_core/services/peripheral.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnDestroy {

  columns: any;
  peripherals$: Observable<Peripheral[]> = this.service.all()
  destroy$ = new Subject()

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private service: PeripheralService
  ) {
    this.columns = ['no', 'Gateway', 'vendor', 'createdAt', 'status', 'actions']
  }

  remove(item: Peripheral) {
    this.service.delete(item.id).subscribe(() => this.load());
  }

  load() {
    this.peripherals$ = this.service.all()
  }

  private readonly dialog = (data?: Peripheral) => this.dialogService.open<Peripheral>(
    new PolymorpheusComponent(AddComponent, this.injector),
    {
      dismissible: false,
      data,
      label: !!data ? 'Edit Peripheral' : 'New Peripheral',
    },
  );

  showDialog(item?: Peripheral) {
    this.dialog(item)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.load());
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe
  }

}
