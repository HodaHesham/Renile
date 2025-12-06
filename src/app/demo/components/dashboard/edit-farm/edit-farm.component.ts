import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Farm } from 'src/app/demo/api/farm';
import { FarmsService } from 'src/app/demo/service/farms.service';

@Component({
  selector: 'app-edit-farm',
  templateUrl: './edit-farm.component.html',
  styleUrl: './edit-farm.component.scss',
})
export class EditFarmComponent implements OnInit {
  @Input() showEdit: boolean;
  @Input() currentFarm: Farm;
  @Output() formSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  selectedReceiverFile: File;
  dropdownFarmtype: any[] = [
    { type: 'fish' },
    { type: 'plant' },
    { type: 'mixed' },
    { type: 'other' },
  ];
  editFarm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private FarmsService: FarmsService,
    private MessageService: MessageService,
  ) {}
  ngOnInit() {
    this.editForm();
    console.log(this.currentFarm);
    if (this.currentFarm) {
      this.editFarm.patchValue({
        name: this.currentFarm?.name,
        type: { type: this.currentFarm?.type },
        code: this.currentFarm?.code,
        logo: this.currentFarm?.logo,
        address: this.currentFarm?.address,
        timezone: this.currentFarm?.timezone,
        contactPhone: this.currentFarm?.contactPhone,
        contactEmail: this.currentFarm?.contactEmail,
      });
    }
  }

  editForm() {
    this.editFarm = this.fb.group({
      name: ['', Validators.required],
      type: [
        {
          type: this.currentFarm?.type,
        },
      ],
      code: [''],
      logo: [''],
      address: [''],
      timezone: [''],
      contactPhone: [''],
      contactEmail: ['', Validators.email],
    });
  }
  uploadReceiverImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedReceiverFile = file;
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.editFarm.invalid) return;
    const formData = new FormData();
    formData.append('name', this.editFarm.value.name);
    formData.append('type', this.editFarm.value.type.type);
    formData.append('logo', this.selectedReceiverFile);
    formData.append('code', this.editFarm.value.code);
    formData.append('address', this.editFarm.value.address);
    formData.append('timezone', this.editFarm.value.timezone);
    formData.append('contactPhone', this.editFarm.value.contactPhone);
    formData.append('contactEmail', this.editFarm.value.contactEmail);
    this.FarmsService.editFarm(formData, this.currentFarm?.id).subscribe((res) => {
      if (res.status == 'success') {
        this.MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Farm created successfully',
        });
        this.editFarm.reset();
        this.showEdit = false;
        this.formSubmitted.emit(true);
      } else {
        this.MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'general error happend!',
        });
      }
    });
  }
}
