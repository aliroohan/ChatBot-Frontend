import { CanActivateFn } from '@angular/router';
import { DataService } from '../Services/data.service';

export const userGuard: CanActivateFn = (route, state) => {
  const dataService = new DataService();
  if (dataService.admin === 'user') {
    return true;
  } else {
    return false;
  }
};