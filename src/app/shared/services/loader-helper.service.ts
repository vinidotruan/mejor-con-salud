import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderHelperService {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  showLoader() {
    const modalOptions: ModalOptions = {
      class: 'loader',
      ignoreBackdropClick: true,
      backdrop: true,
      keyboard: false,
    };
    this.modalRef = this.modalService.show(LoaderComponent, modalOptions);
  }

  hideLoader() {
    setTimeout(() => {
      this.modalRef.hide();
    }, 500);
  }
}
