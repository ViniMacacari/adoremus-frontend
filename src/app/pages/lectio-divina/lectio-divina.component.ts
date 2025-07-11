import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from '../../components/loader/loader.component'
import { ButtonComponent } from "../../components/button/button.component"

@Component({
  selector: 'app-lectio-divina',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, ButtonComponent],
  templateUrl: './lectio-divina.component.html',
  styleUrl: './lectio-divina.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LectioDivinaComponent implements OnInit {
  currentMonth: number = new Date().getMonth()
  currentYear: number = new Date().getFullYear()
  weekDays: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  calendarDays: { date: Date; hasLectio: boolean; active: boolean }[] = []
  lectioMap: Record<string, boolean> = {}
  calendarVisible = false
  selectedDate: Date | null = null
  loadedAll: boolean = false

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()
  }

  constructor(private request: RequestService) { }

  async ngOnInit(): Promise<void> {
    await this.loadLectioDates().then(() => {
      const today = new Date()
      const key = this.keyOf(today)

      if (this.lectioMap[key]) {
        this.selectedDate = today
      }
    })

    this.loadedAll = true
  }

  async loadLectioDates(): Promise<void> {
    const resp = await this.request.get('/lectio-divina/datas')
    const items = resp?.dados?.lectio || []

    this.lectioMap = {}
    for (const i of items) {
      const d = new Date(i.data)
      const key = this.keyOf(d)
      this.lectioMap[key] = true
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
    if (lectio) console.log('Lectio ID:', lectio.id)
  }

  private keyOf(d: Date): string {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
}