import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';
import { Gateway } from 'src/app/_core/models/gateway';
import { GatewayService } from 'src/app/_core/services/gateway.service';
import { PeripheralService } from 'src/app/_core/services/peripheral.service';
import { Peripheral } from 'src/app/_core/models/peripheral';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit {

  form: FormGroup;
  gateways$: Observable<Gateway[]>;
  statuses = ['online', 'offline'];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Peripheral, Peripheral>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private service: PeripheralService,
    private gatewayService: GatewayService
  ) {
    this.gateways$ = gatewayService.all()
    this.form = fb.group({
      id: [null],
      vendor: ['', Validators.required],
      status: ['online', Validators.required],
      Gateway: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    if (!!this.data) {
      this.form.patchValue(this.data)
      this.cdr.detectChanges()
    }
  }

  get isValid(): boolean {
    return !this.form.invalid;
  }

  get data(): any {
    return this.context.data;
  }

  submit() {
    const obj = this.form.value
    obj.gateway_id = obj.Gateway.id
    delete obj.Gateway
    this.service.save(obj)
      .subscribe(data => {
        this.context.completeWith(data)
      })
  }

}
