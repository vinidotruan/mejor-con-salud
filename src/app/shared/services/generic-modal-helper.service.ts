import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class GenericModalHelperService {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  showModal(component) {
    const modalOptions: ModalOptions = {
      ignoreBackdropClick: true,
      backdrop: true,
      keyboard: false,
    };
    this.modalRef = this.modalService.show(component, modalOptions);
  }

  hideModal() {
    setTimeout(() => {
      this.modalRef.hide();
    }, 1000);
  }
}
