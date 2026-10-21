import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private httpService:AuthenticationService) { }

  getTermsAndAboutData(type:number) {
    return this.httpService.get(`custom_admin/Terms_and_condition?type=${type}`)
  }

  updateTermsAndAboutData(updatedContent) {
    return this.httpService.put(`custom_admin/update_content`, updatedContent)
  }
}
