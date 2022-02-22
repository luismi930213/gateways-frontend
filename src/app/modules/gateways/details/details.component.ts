import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { Gateway } from 'src/app/_core/models/gateway';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent {

  item: Gateway = new Gateway();
  columns: any;
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Gateway, Gateway>,
  ) {
    this.item = this.context.data
    this.columns = ['no','vendor', 'status', 'createdAt', 'updatedAt']
  }

}

