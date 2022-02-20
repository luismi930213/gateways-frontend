import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent {

  ip: string = '';
  name: string = '';

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, string>,
  ) { }

  get hasValue(): boolean {
    return this.name !== '' && this.ip !== '';
  }

  get data(): any {
    return this.context.data;
  }

  submit() {
    if (this.name !== null) {
      this.context.completeWith(this.name);
    }
  }

}
