import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ButtonComponent } from "../button/button.component"

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  instance: ModalComponent

  isLoading = false
  title: string = ''
  subtitle: string = ''
  info: string = ''

  constructor(
    private router: Router
  ) {
    this.instance = this
  }

  show(title: string, subtitle: string, info: string) {
    this.title = title
    this.subtitle = subtitle
    this.info = info
    this.instance.isLoading = true
  }

  hide() {
    this.instance.isLoading = false
  }

  redirecionar(rota: string): void {
    this.router.navigate([rota])

    this.isLoading = false
  }
}