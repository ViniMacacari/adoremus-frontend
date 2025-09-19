import { Component } from '@angular/core'
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators'
import { MenuComponent } from "./components/menu/menu.component"
import { FooterComponent } from "./components/footer/footer.component"
import { ModalLoadingComponent } from "./components/modal-loading/modal-loading.component"
import { ModalComponent } from "./components/modal/modal.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent, ModalLoadingComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adoremus'
  showBackground: boolean = true

  private blockedRoutes = [
    '/sobre',
  ]

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showBackground = !this.blockedRoutes.includes(event.urlAfterRedirects)
      })
  }
}
