import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewEncapsulation } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from '../../components/loader/loader.component'
import { ButtonComponent } from "../../components/button/button.component"
import { ModalComponent } from "../../components/modal/modal.component"

@Component({
  selector: 'app-lectio-divina',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, ButtonComponent, ModalComponent],
  templateUrl: './lectio-divina.component.html',
  styleUrl: './lectio-divina.component.scss'
})
export class LectioDivinaComponent implements OnInit {

  private informationGospel: { passage: string; text: string } | null = null

  currentMonth: number = this.getBrasiliaDate().getMonth()
  currentYear: number = this.getBrasiliaDate().getFullYear()
  weekDays: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  calendarDays: { date: Date; hasLectio: boolean; active: boolean }[] = []
  lectioMap: Record<string, boolean> = {}
  calendarVisible = false
  selectedDate: Date | null = null
  loadedAll: boolean = false
  lectioToday: any = null
  safeLectioHtml: SafeHtml | null = null

  @ViewChild('calendarContainer') calendarContainer!: ElementRef
  @ViewChild(ModalComponent) modal!: ModalComponent

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (
      this.calendarVisible &&
      this.calendarContainer &&
      !this.calendarContainer.nativeElement.contains(target)
    ) {
      this.calendarVisible = false
    }
  }

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()
  }

  constructor(
    private request: RequestService,
    private sanitizer: DomSanitizer
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadLectioDates()

    const today = this.getBrasiliaDate()
    const key = this.keyOf(today)

    let lectio: any = this.lectioMap[key]

    if (!lectio) {
      const allDates = Object.keys(this.lectioMap).sort()
      const lastKey = allDates[allDates.length - 1]
      lectio = this.lectioMap[lastKey]
      const [y, m, d] = lastKey.split('-').map(Number)
      this.selectedDate = new Date(y, m - 1, d)
    } else {
      this.selectedDate = today
    }

    if (lectio) {
      this.loadSpecificLectio(lectio.id)
    }
  }

  async loadLectioDates(): Promise<void> {
    const resp = await this.request.get('/lectio-divina/datas')
    const items = resp?.dados?.lectio || []

    this.lectioMap = {}
    for (const i of items) {
      const [year, month, day] = i.data.split('-').map(Number)
      const d = new Date(year, month - 1, day)
      const key = this.keyOf(d)
      this.lectioMap[key] = i
    }

    this.generateCalendar()
  }

  toggleCalendar(): void {
    this.calendarVisible = !this.calendarVisible
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1)
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0)
    const startWeekDay = firstDay.getDay()
    const totalDays = lastDay.getDate()

    const days: { date: Date; hasLectio: boolean; active: boolean }[] = []

    for (let i = 0; i < startWeekDay; i++) {
      days.push({ date: null as any, hasLectio: false, active: false })
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i)
      const key = this.keyOf(date)
      days.push({
        date,
        hasLectio: !!this.lectioMap[key],
        active: !!this.lectioMap[key]
      })
    }

    this.calendarDays = days

    if (this.selectedDate) {
      const selectedKey = this.keyOf(this.selectedDate)
      const match = days.find(d => d.date && this.keyOf(d.date) === selectedKey)
      if (match) {
        this.selectedDate = match.date
      }
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11
      this.currentYear--
    } else {
      this.currentMonth--
    }
    this.generateCalendar()
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0
      this.currentYear++
    } else {
      this.currentMonth++
    }
    this.generateCalendar()
  }

  selectDate(day: any): void {
    if (!day.active) return

    this.selectedDate = day.date
    this.calendarVisible = false

    const key = this.keyOf(day.date)
    const lectio: any = this.lectioMap[key]
    if (lectio) this.loadSpecificLectio(lectio.id)
  }

  private keyOf(d: Date): string {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  async loadSpecificLectio(id: number): Promise<void> {
    this.loadedAll = false

    const result = await this.request.get(`/lectio-divina/${id}`)
    this.lectioToday = result.dados.lectio
    this.informationGospel = {
      passage: result.dados.lectio.passagem,
      text: result.dados.lectio.texto
    }

    let cleanHtml = this.lectioToday.conteudo
    cleanHtml = cleanHtml.replace(/&nbsp;/g, ' ')
    cleanHtml = cleanHtml.replace(/<p><\/p>/g, '<p><br></p>')
    const sanitized = this.sanitizeHtml(cleanHtml)
    this.safeLectioHtml = this.sanitizer.bypassSecurityTrustHtml(sanitized)

    this.loadedAll = true
  }

  openGospelModal(): void {
    this.modal.show('Passagem Bíblica', this.informationGospel?.passage || '', this.informationGospel?.text || '')
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

  getBrasiliaDate(): Date {
    const now = new Date()
    const localString = now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
    return new Date(localString)
  }
}