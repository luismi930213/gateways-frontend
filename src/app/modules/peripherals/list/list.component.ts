import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Peripheral } from 'src/app/_core/models/peripheral';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddComponent } from '../add/add.component';
import { PeripheralService } from 'src/app/_core/services/peripheral.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  columns: any;
  peripherals: Peripheral[] = [];

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private service: PeripheralService
  ) {
    this.columns = ['no', 'Gateway', 'vendor', 'date', 'status', 'actions']
  }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.service.all().subscribe(data => {
      this.peripherals = data.rows
    })
  }

  remove(item: Peripheral) {
    this.service.delete(item.id).subscribe(data => {
      this.load();
    })
  }

  private readonly dialog = this.dialogService.open<number>(
    new PolymorpheusComponent(AddComponent, this.injector),
    {
      dismissible: false,
      label: 'Manage Peripherals',
    },
  );

  showDialog(item?: Peripheral) {
    this.dialog.subscribe({
      next: data => {
        console.info('Dialog emitted data = ' + data);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

}
