import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: ``
})
export class EditUserComponent {

  @Input() user: User | null = null;
  @Output() close = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @ViewChild('closeUserEditModal') closeUserEditModal!: ElementRef; // ref to #closeUserEditModal in html

  closeModal(): void{
    this.close.emit();
  }

  updateUser(): void{
    this.update.emit(this.user); //Pass data to parent component
  }

  //Function to close the modal after update user request in users.component.ts(Parent component)
  closeModalAfterRequest(){
    this.closeUserEditModal.nativeElement.click();
  }

}
