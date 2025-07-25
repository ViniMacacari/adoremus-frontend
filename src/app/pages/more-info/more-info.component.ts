import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-more-info',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.scss'
})
export class MoreInfoComponent {
  constructor(
    private router: Router
  ) { }

  navigate(url: string): void {
    this.router.navigate([url])
  }

  externalNavigate(url: string): void {
    window.open(url, '_blank')
  }
}
