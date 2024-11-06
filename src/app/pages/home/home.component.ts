import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  constructor(
    private router: Router
  ) { }

  navegar(url: string): void {
    this.router.navigate([url])
  }

  navegarExterno(url: string): void {
    window.open(url, '_blank')
  }
}