import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Gateway } from 'src/app/_core/models/gateway';
import { GatewayService } from 'src/app/_core/services/gateway.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit, OnDestroy {

  form: FormGroup;
  destroy$ = new Subject();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<Gateway, Gateway>,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private service: GatewayService
  ) {
    this.form = fb.group({
      id: [null],
      name: ['', Validators.required],
      ip: ['', Validators.required],
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
    this.service.save(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.context.completeWith(data))
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe();
  }

}
