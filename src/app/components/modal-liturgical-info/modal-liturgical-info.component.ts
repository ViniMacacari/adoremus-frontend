import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ButtonComponent } from "../button/button.component"
import { CapitalizeFirstPipe } from '../../pips/capitalize-first.pipe'

@Component({
  selector: 'app-modal-liturgical-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, CapitalizeFirstPipe],
  templateUrl: './modal-liturgical-info.component.html',
  styleUrl: './modal-liturgical-info.component.scss'
})
export class ModalLiturgicalInfoComponent {
  instance: ModalLiturgicalInfoComponent

  isLoading = false
  info: any = {}

  constructor(
    private router: Router
  ) {
    this.instance = this
  }

  show(info: any) {
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