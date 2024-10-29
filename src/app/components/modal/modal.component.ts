import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  static instance: ModalComponent

  isLoading = false

  constructor(
    private router: Router
  ) {
    ModalComponent.instance = this
  }

  static show() {
    ModalComponent.instance.isLoading = true
  }

  static hide() {
    ModalComponent.instance.isLoading = false
  }

  redirecionar(rota: string): void {
    this.router.navigate([rota])

    this.isLoading = false
  }
}