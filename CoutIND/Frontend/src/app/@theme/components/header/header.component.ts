import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu: any[];
  usercontrols: any;
  loggedin:boolean;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user){
      this.loggedin = true;
      this.usercontrols =''
      this.userMenu = [{ title: 'Logout' }];
    }else{
      this.loggedin=false;
      this.usercontrols = ''
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  goToStore(){
    window.location.href = 'http://localhost:4200/#/store';
  }

  onMenuClick(event) {
    if (event.title === 'Logout') {
      localStorage.removeItem("user");
      this.user=null;
      this.loggedin=false;
    }
  }
}
