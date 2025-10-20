import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from '../../components/loader/loader.component'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-breviary',
  imports: [CommonModule, LoaderComponent, ButtonComponent],
  templateUrl: './breviary.component.html',
  styleUrl: './breviary.component.scss'
})
export class BreviaryComponent {
  loaded = false
  safeLiturgyHtml: SafeHtml | null = null
  liturgy: any = null
  currentPart: string = 'laudes'
  day: string = ''
  selectedTab: string = ''
  language: string = 'pt_BR'

  constructor(
    private request: RequestService,
    private sanitizer: DomSanitizer
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadLiturgy()
  }

  async loadLiturgy(): Promise<void> {
    this.selectedTab = 'Laudes'
    this.loaded = false
    const today = this.getBrasiliaDate()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()

    this.day = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`

    const resp = await this.request.get(`/liturgia/das-horas/${year}/${month}/${day}?lang=${this.language}`)
    const data = resp?.dados?.[0]
    if (!data) {
      this.loaded = true
      this.liturgy = null
      return
    }

    this.liturgy = data
    this.updateDisplayedPart()
    this.loaded = true
  }

  updateDisplayedPart(): void {
    const html = this.liturgy?.[this.currentPart] || ''
    const cleaned = this.sanitizeHtml(
      html.replace(/&nbsp;/g, ' ').replace(/<p><\/p>/g, '<p><br></p>')
    )
    this.safeLiturgyHtml = this.sanitizer.bypassSecurityTrustHtml(cleaned)
  }

  changePart(part: string, tab: string): void {
    this.selectedTab = tab
    this.currentPart = part
    this.updateDisplayedPart()
  }

  toggleLanguage(): void {
    this.language = this.language === 'pt_BR' ? 'lt' : 'pt_BR'
    this.loadLiturgy()
  }

  sanitizeHtml(rawHtml: string): string {
    const parser = new DOMParser()
    const doc = parser.parseFromString(rawHtml, 'text/html')
    const allowedTags = [
      'P', 'BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S',
      'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
      'UL', 'OL', 'LI', 'BLOCKQUOTE',
      'A', 'IMG', 'PRE', 'CODE', 'SPAN', 'DIV'
    ]

    doc.body.querySelectorAll('*').forEach(el => {
      if (!allowedTags.includes(el.tagName)) el.remove()
    })

    return doc.body.innerHTML
  }

  getBrasiliaDate(): Date {
    const now = new Date()
    const localString = now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
    return new Date(localString)
  }
}