import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent {

  readonly form = new FormGroup({
    testValue: new FormControl(new TuiDay(2017, 0, 15)),
  });

  value: number | null = null;
  vendor = '';
  status = 'online';
  items = ['My Gateway', 'My second gateway'];
  statuses = ['online', 'offline'];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<number, string>,
  ) { }

  get hasValue(): boolean {
    return this.value !== null && this.vendor !== '';
  }

  get data(): any {
    return this.context.data;
  }

  submit() {
    if (this.value !== null) {
      this.context.completeWith(this.value);
    }
  }

}
