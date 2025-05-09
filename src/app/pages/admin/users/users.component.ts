import { Component, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SweetAlertService } from '../../../services/swal.service';
import Swal from 'sweetalert2';
import { CatchErrorService } from '../../../services/catch-error.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../models/user.model';
import { Users } from '../../../interfaces/users.response.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent {

  users = signal<User[]>([]);

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

}
