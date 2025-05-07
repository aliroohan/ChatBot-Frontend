import { CanActivateFn } from '@angular/router';
import { DataService } from './Services/data.service';

export const userAdminGuard: CanActivateFn = (route, state) => {
  const dataService = new DataService();
  if (dataService.admin === 'admin') {
    return true;
  }
  return true;
};