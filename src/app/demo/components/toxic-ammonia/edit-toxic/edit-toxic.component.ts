import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToxicService } from 'src/app/demo/service/toxic.service';

@Component({
  selector: 'app-edit-toxic',
  templateUrl: './edit-toxic.component.html',
  styleUrl: './edit-toxic.component.scss',
})
export class EditToxicComponent implements OnInit {
  @Input() showEditToxic: boolean;
  @Input() currentToxic: any;
  @Output() formSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  editToxicForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private ToxicService: ToxicService,
    private MessageService: MessageService,
  ) {}
  ngOnInit() {
    this.editToxic();
    if (this.currentToxic) {
      this.editToxicForm.patchValue({
        do: this.currentToxic?.do,
        ph: this.currentToxic?.ph,
        temp: this.currentToxic?.temp,
        date: this.currentToxic?.date,
      });
    }
    this.editToxicForm.controls['date'].disable();
  }
  editToxic() {
    this.editToxicForm = this.fb.group({
      ph: ['', Validators.required],
      do: ['', Validators.required],
      temp: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }
  hideDialog() {
    this.showEditToxic = false;
  }
  onSubmit() {
    this.editToxicForm.value.date = this.editToxicForm.getRawValue().date;
    let data = {
      ph: +this.editToxicForm.value.ph,
      do: +this.editToxicForm.value.do,
      temp: +this.editToxicForm.value.temp,
      date: this.editToxicForm.value.date,
    };
    this.ToxicService.predictToxicAmmonia(data).subscribe((res) => {
      if (res.status == 'success') {
        this.MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ammonia level predicted successfully',
        });
        this.formSubmitted.emit(true);
      } else {
        this.MessageService.add({
          severity: 'danger',
          summary: 'danger',
          detail: 'Failed to predict ammonia level',
        });
      }
    });
    this.editToxicForm.reset();
    this.editToxicForm.patchValue({ date: new Date() });
    this.showEditToxic = false;
  }
}
