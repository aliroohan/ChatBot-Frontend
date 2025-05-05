import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aprove',
  imports: [],
  templateUrl: './aprove.component.html',
  styleUrl: './aprove.component.css'
})
export class AproveComponent {
  
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    
    

    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.auth.approveUser(token).subscribe(
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
