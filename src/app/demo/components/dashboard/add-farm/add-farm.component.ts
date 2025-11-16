import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Farm } from 'src/app/demo/api/farm';
import { FarmsService } from 'src/app/demo/service/farms.service';

@Component({
    selector: 'app-add-farm',
    templateUrl: './add-farm.component.html',
    styleUrl: './add-farm.component.scss',
})
export class AddFarmComponent implements OnInit {
    visible: boolean = false;
    selectedReceiverFile: File;
    activeItem: Farm;
    @Input() farm: Farm[];
    @Input() editMode: boolean = false;
    @Output() formSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() itemSend: EventEmitter<Farm> = new EventEmitter<Farm>();
    dropdownFarmtype: any[] = [
        { type: 'fish' },
        { type: 'plant' },
        { type: 'mixed' },
        { type: 'other' },
    ];
    farmForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private FarmsService: FarmsService,
        private MessageService: MessageService
    ) { }

    ngOnInit() {
        this.createForm();
        this.updateActive();
    }

    createForm() {
        this.farmForm = this.fb.group({
            name: ['', Validators.required],
            type: [{
                type: 'fish'
            }],
            code: [''],
            logo: [''],
            address: [''],
            timezone: [''],
            contactPhone: [''],
            contactEmail: ['', Validators.email],
        });
    }
    uploadReceiverImage(event: any) {
        const file = event.target.files[0];
        if (file) {
            // if (file.size > 2e+6) {
            //   this.toastrService.error(
            //     this.translateService.instant('ImageSizeMustNotExceed'), this.translateService.instant('Error')
            //   );
            //   this.shipmentForm.patchValue({ PodReceiverPhotoFile: null });
            //   this.receiverImageSrc = '';
            //   return;
            // }
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedReceiverFile = file;
            };
            reader.readAsDataURL(file);
        }
    }
    showDialog() {
        this.visible = true;
        this.activeItem == this.farm[this.farm?.length - 1];
    }

    isActive(clickedItem: any) {
        return this.activeItem === clickedItem;
    }
    sendItem(item) {
        this.activeItem = item;
        this.itemSend.emit(item);
    }
    onSubmit() {
        if (this.farmForm.valid) {
            const formData = new FormData();
            formData.append('name', this.farmForm.value.name);
            formData.append('type', this.farmForm.value.type.type);
            formData.append('logo', this.selectedReceiverFile);
            formData.append('code', this.farmForm.value.code);
            formData.append('address', this.farmForm.value.address);
            formData.append('timezone', this.farmForm.value.timezone);
            formData.append('contactPhone', this.farmForm.value.contactPhone);
            formData.append('contactEmail', this.farmForm.value.contactEmail);
            this.FarmsService.createFarm(formData).subscribe((res) => {
                if (res.status == 'success') {
                    this.MessageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Farm created successfully',
                    });
                    this.farmForm.reset();
                    this.visible = false;
                    this.formSubmitted.emit(true);
                    this.updateActive();
                } else {
                    this.MessageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'general error happend!',
                    });
                }
            });
        } else {
            this.MessageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'General error happened!',
            });
        }
    }
    updateActive() {
        setTimeout(() => {
            if (this.farm && this.farm.length > 0) {
                this.activeItem = this.farm[this.farm.length - 1];
            }
        }, 500);
    }
}
