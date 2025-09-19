import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { QuillModule } from 'ngx-quill'
import { LocalRequestService } from '../../services/local-request/local-request.service'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-new-blog-post',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, ButtonComponent],
  templateUrl: './new-blog-post.component.html',
  styleUrl: './new-blog-post.component.scss'
})
export class NewBlogPostComponent {
  subtitle: string = ''
  title: string = ''
  author: string = ''
  category: string = '1'
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
      await this.request.post('/blog/novo', {
        subtitulo: this.subtitle,
        titulo: this.title,
        autor: this.author,
        categoria: Number(this.category),
        conteudo: this.content
      })
      this.success = true
      this.title = ''
      this.category = ''
      this.content = ''
    } catch (err: any) {
      this.errorMessage = err
    }

    this.loading = false
  }
}
