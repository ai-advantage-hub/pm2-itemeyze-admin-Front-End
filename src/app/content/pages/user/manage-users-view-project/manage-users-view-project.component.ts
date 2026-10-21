import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';

@Component({
  selector: 'app-manage-users-view-project',
  templateUrl: './manage-users-view-project.component.html',
  styleUrls: ['./manage-users-view-project.component.scss']
})
export class ManageUsersViewProjectComponent implements OnInit {
  items: any[] = []; 
  currentPage = 1;
  itemsPerPage = 10;
  id: number;
  role: number;
  data: any ;
  show: boolean;

  constructor(private router: Router,private headerTitle: AppService, private route: ActivatedRoute, private userService:ManageUsersService) {}

  ngOnInit(): void {
    this.role=  JSON.parse(localStorage.getItem('role'));
    this.data =  JSON.parse(localStorage.getItem('modules') || "[]");
    if(this.role == 3) {
      for(let i =0; i <this.data.length; i++) {
        if(this.data[i] == "Manage Projects") {
          this.show = false;
        }  else {
          this.show = true;
        }
      }
    } else if( this.role == 1) {
      this.show= false;
    }
    this.headerTitle.setTitle('Manage Users');
    this.getFromParams();
    this.getUserProjects();
  }

  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
  }

  getUserProjects(){
    this.userService.userProjects(this.id).subscribe((result: any) => {
      if(result.status == 200) {
       this.items = result.data;
      }
     });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;

}
getShownEntriesRange(): string {
  const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
  const endRange = Math.min(this.currentPage * this.itemsPerPage, this.items.length);
  return `${startRange} - ${endRange}`;
}

goBack() {
  this.router.navigate(['/pages/manage-users-view-profile'], { queryParams: { id:this.id} });
}

viewProjectDetails(id) {
  this.router.navigate(['/pages/manage-users-project-details'], { queryParams: { id: id,userId:this.id } });

}

}
