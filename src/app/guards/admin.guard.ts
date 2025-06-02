import { CanActivateFn } from '@angular/router';
import { DataService } from '../Services/data.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const dataService = new DataService();
  if (dataService.admin === 'admin') {
    return true;
  } else {
    return false;
  }
};
