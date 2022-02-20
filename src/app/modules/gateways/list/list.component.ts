import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Gateway } from 'src/app/_core/models/gateway';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddComponent } from '../add/add.component';
import { GatewayService } from 'src/app/_core/services/gateway.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  columns: any;
  gateways: Gateway[] = [];

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private service: GatewayService
  ) {
    this.columns = ['no', 'name', 'ip', 'actions'];
  }


  ngOnInit(): void {
    this.load();
  }

  remove(item: Gateway) {
    this.service.delete(item.id).subscribe(data => {
      this.load();
    })
  }
  
  private load(){
    this.service.all().subscribe(data => {
      this.gateways = data.rows
    })
  }

  private readonly dialog = this.dialogService.open<Gateway>(
    new PolymorpheusComponent(AddComponent, this.injector),
    {
      dismissible: false,
      label: 'Manage Gateways',
    },
  );

  showDialog(item?: Gateway) {
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
