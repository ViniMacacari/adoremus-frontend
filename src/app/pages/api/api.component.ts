import { Component } from '@angular/core'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class ApiComponent {
  externalNavigate(url: string): void {
    window.open(url, '_blank')
  }
}