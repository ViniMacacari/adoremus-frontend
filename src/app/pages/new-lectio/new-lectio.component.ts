import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { QuillModule } from 'ngx-quill'
import { LocalRequestService } from '../../services/local-request/local-request.service'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-new-lectio',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, ButtonComponent],
  templateUrl: './new-lectio.component.html',
  styleUrl: './new-lectio.component.scss'
})
export class NewLectioComponent {
  book: string = '1'
  passage: string = ''
  scriptureText: string = ''
  bibleVersion: string = '1'
  content: string = ''
  loading: boolean = false
  success: boolean = false
  errorMessage: string = ''

  constructor(private request: LocalRequestService) { }

  async submit(): Promise<void> {
    this.loading = true
    this.success = false
    this.errorMessage = ''

    try {
      await this.request.post('/lectio/nova', {
        livro: this.book,
        passagem: this.passage,
        texto: this.scriptureText,
        biblia: this.bibleVersion,
        conteudo: this.content
      })
      this.success = true
      this.passage = ''
      this.scriptureText = ''
      this.content = ''
    } catch (err: any) {
      this.errorMessage = err
    }

    this.loading = false
  }
}