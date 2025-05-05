import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reject',
  imports: [],
  templateUrl: './reject.component.html',
  styleUrl: './reject.component.css'
})
export class RejectComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    
    

    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.auth.rejectUser(token).subscribe(
          (response) => {
            console.log('User approved:', response);
          },
          (error) => {
            console.error('Error approving user:', error);
          }
        );
      }
    });
  }   

}
