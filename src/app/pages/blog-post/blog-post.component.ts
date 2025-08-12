import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from '../../components/loader/loader.component'

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  loadedAll = false
  post: any = null
  safePostHtml: SafeHtml | null = null

  constructor(
    private route: ActivatedRoute,
    private request: RequestService,
    private sanitizer: DomSanitizer
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const slug = params.get('slug')
      if (slug) {
        await this.loadPost(slug)
      }
    })
  }

  async loadPost(slug: string): Promise<void> {
    this.loadedAll = false
    const resp = await this.request.get(`/blog/postagens/${slug}`)
    this.post = resp?.dados || null

    if (this.post?.conteudo) {
      let cleanHtml = this.post.conteudo
      cleanHtml = cleanHtml.replace(/&nbsp;/g, ' ')
      cleanHtml = cleanHtml.replace(/<p><\/p>/g, '<p><br></p>')
      const sanitized = this.sanitizeHtml(cleanHtml)
      this.safePostHtml = this.sanitizer.bypassSecurityTrustHtml(sanitized)
    }

    this.loadedAll = true
  }

  sanitizeHtml(rawHtml: string): string {
    const parser = new DOMParser()
    const doc = parser.parseFromString(rawHtml, 'text/html')
    const allowedTags = [
      'P', 'BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S',
      'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
      'UL', 'OL', 'LI', 'BLOCKQUOTE',
      'A', 'IMG', 'PRE', 'CODE',
      'SPAN', 'DIV'
    ]

    const elements = doc.body.querySelectorAll('*') as NodeListOf<HTMLElement>
    elements.forEach(el => {
      if (!allowedTags.includes(el.tagName)) {
        el.remove()
        return
      }

      const attrs = Array.from(el.attributes)
      for (const attr of attrs) {
        const name = attr.name.toLowerCase()
        const value = attr.value.toLowerCase()

        if (name.startsWith('on') || name === 'style') {
          el.removeAttribute(attr.name)
          continue
        }

        if (name === 'href') {
          if (value.startsWith('javascript:')) {
            el.removeAttribute(attr.name)
          }
          continue
        }

        if (name === 'src') {
          const isValid =
            value.startsWith('http://') ||
            value.startsWith('https://') ||
            value.startsWith('data:image/')
          if (!isValid) {
            el.removeAttribute(attr.name)
          }
          continue
        }
      }
    })

    return doc.body.innerHTML
  }
}