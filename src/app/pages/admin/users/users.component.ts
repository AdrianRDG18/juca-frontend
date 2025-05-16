import { User } from './../../../models/user.model';
import { Component, signal, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SweetAlertService } from '../../../services/swal.service';
import Swal from 'sweetalert2';
import { CatchErrorService } from '../../../services/catch-error.service';
import { TranslateService } from '@ngx-translate/core';
import { Users } from '../../../interfaces/users.response.interface';
import { EditUserComponent } from '../../../shared/modals/edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {

  users = signal<User[]>([]);
  userEdit: User | null = null;
  displayModal: boolean = false;
  @ViewChild('editUserModalRef') editUserComponent!: EditUserComponent; //Ref of editUserComponent by #editUserModalRef in the <app-edit-user>

  constructor(private userService: UserService,
              private swalService: SweetAlertService,
              private catchError: CatchErrorService,
              private translateService: TranslateService
  ){
    this.getUsers();
  }

  getUsers(){
    this.swalService.swalProcessingRequest();
    Swal.showLoading();
    this.userService.getUsers()
        .subscribe({
          next: (users: Users) => this.users.set(users.docs), // Get users->docs[]
          error: (error) => {
            console.log(error);
            this.catchError.scaleError(this.translateService.instant('errors.somethingWrong'), error);
          }, complete: () => Swal.close()
        });
  }

  setUserToEdit(user: User){
    this.displayModal = true;
    this.userEdit = user;
  }

  updateUser(user: User){
    this.swalService.swalConfirm(this.translateService.instant('usersPage.titleUpdate'), this.translateService.instant('usersPage.messageUpdate'))
        .then((resp) => {
          this.swalService.swalProcessingRequest();
          Swal.showLoading();
          if(resp.isConfirmed){
            this.userService.updatePersonaInfo(user, user.uid)
                .subscribe({
                  error: (error) => {
                    console.log(error);
                    this.catchError.scaleError(this.translateService.instant('errors.somethingWrong') + ' updateUser', error);
                  }, complete: () => {
                    this.editUserComponent.closeModalAfterRequest();
                    this.closeModal();
                    this.getUsers();
                  }
                });
          }
        });
  }

  closeModal(){
    setTimeout(()=>{
      this.displayModal = false;
      this.userEdit = null;
    }, 100)
  }

}

