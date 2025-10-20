import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { QuillModule } from 'ngx-quill'
import { LocalRequestService } from '../../services/local-request/local-request.service'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-new-breviary',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, ButtonComponent],
  templateUrl: './new-breviary.component.html',
  styleUrl: './new-breviary.component.scss'
})
export class NewBreviaryComponent {
  oficioLeitura = ''
  laudes = ''
  tercia = ''
  sexta = ''
  noa = ''
  vesperas = ''
  completas = ''
  language = 'pt_BR'
  liturgicalCycle = ''
  day = ''
  month = ''
  success = false
  errorMessage = ''
  loading = false

  constructor(private request: LocalRequestService) { }

  async submit(): Promise<void> {
    this.loading = true
    this.success = false
    this.errorMessage = ''

    try {
      await this.request.post('/liturgia-das-horas/nova', {
        oficio_leitura: this.oficioLeitura,
        laudes: this.laudes,
        tercia: this.tercia,
        sexta: this.sexta,
        noa: this.noa,
        vesperas: this.vesperas,
        completas: this.completas,
        lingua: this.language,
        ciclo_liturgico: Number(this.liturgicalCycle),
        dia: Number(this.day),
        mes: Number(this.month)
      })

      this.success = true
      this.oficioLeitura = ''
      this.laudes = ''
      this.tercia = ''
      this.sexta = ''
      this.noa = ''
      this.vesperas = ''
      this.completas = ''
      this.liturgicalCycle = ''
      this.day = ''
      this.month = ''
    } catch (err: any) {
      this.errorMessage = err.message || err
    }

    this.loading = false
  }
}