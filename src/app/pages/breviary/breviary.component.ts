import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from '../../components/loader/loader.component'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-breviary',
  standalone: true,
  imports: [CommonModule, LoaderComponent, ButtonComponent],
  templateUrl: './breviary.component.html',
  styleUrl: './breviary.component.scss'
})
export class BreviaryComponent {
  loaded = false
  safeLiturgyHtml: SafeHtml | null = null
  liturgy: any = null
  currentPart = 'oficio_leitura'
  day = ''
  selectedTab = ''
  language = 'pt_BR'
  calendarVisible = false

  currentMonth = this.getBrasiliaDate().getMonth()
  currentYear = this.getBrasiliaDate().getFullYear()
  weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  calendarDays: { date: Date }[] = []
  selectedDate: Date | null = null

  @ViewChild('calendarContainer') calendarContainer!: ElementRef

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement
    if (this.calendarVisible && this.calendarContainer && !this.calendarContainer.nativeElement.contains(target)) {
      this.calendarVisible = false
    }
  }

  constructor(private request: RequestService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    const today = this.getBrasiliaDate()
    this.selectedDate = today
    this.generateCalendar()
    await this.loadLiturgy()
  }

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()
  }

  toggleCalendar(): void {
    this.calendarVisible = !this.calendarVisible
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1)
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0)
    const startWeekDay = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const days: { date: Date }[] = []

    for (let i = 0; i < startWeekDay; i++) {
      days.push({ date: new Date(this.currentYear, this.currentMonth, i - startWeekDay + 1) })
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({ date: new Date(this.currentYear, this.currentMonth, i) })
    }

    this.calendarDays = days
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11
      this.currentYear--
    } else this.currentMonth--
    this.generateCalendar()
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0
      this.currentYear++
    } else this.currentMonth++
    this.generateCalendar()
  }

  async selectDate(day: { date: Date }): Promise<void> {
    this.liturgy = null
    this.safeLiturgyHtml = null
  
    this.selectedDate = day.date
    this.calendarVisible = false  
    this.selectedDate = day.date
    this.calendarVisible = false
    await this.loadLiturgy()
  }

  async loadLiturgy(): Promise<void> {
    this.selectedTab = 'Ofício'
    this.loaded = false

    const date = this.selectedDate || this.getBrasiliaDate()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    this.day = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`

    const resp = await this.request.get(`/liturgia/das-horas/${year}/${month}/${day}?lang=${this.language}`)
    const data = resp?.dados?.[0]

    this.liturgy = data || null
    if (data) this.updateDisplayedPart()

    this.loaded = true
  }

  updateDisplayedPart(): void {
    const html = this.liturgy?.[this.currentPart] || ''
    const cleaned = this.sanitizeHtml(html.replace(/&nbsp;/g, ' ').replace(/<p><\/p>/g, '<p><br></p>'))
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
    const allowedTags = ['P', 'BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BLOCKQUOTE', 'A', 'IMG', 'PRE', 'CODE', 'SPAN', 'DIV']
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