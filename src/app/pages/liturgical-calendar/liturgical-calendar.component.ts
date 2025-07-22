import { Component, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from "../../components/loader/loader.component"
import { ModalLiturgicalInfoComponent } from '../../components/modal-liturgical-info/modal-liturgical-info.component'
import { CapitalizeFirstPipe } from '../../pips/capitalize-first.pipe'

@Component({
  selector: 'app-liturgical-calendar',
  standalone: true,
  imports: [LoaderComponent, CommonModule, ModalLiturgicalInfoComponent, CapitalizeFirstPipe],
  templateUrl: './liturgical-calendar.component.html',
  styleUrl: './liturgical-calendar.component.scss'
})
export class LiturgicalCalendarComponent {
  allLoaded: boolean = false
  monthData: any[] = []
  monthName: string = ''
  calendarGrid: any[][] = []

  currentMonth: number
  currentYear: number

  @ViewChild(ModalLiturgicalInfoComponent) modal!: ModalLiturgicalInfoComponent

  constructor(private request: RequestService) {
    const today = new Date()
    this.currentMonth = today.getMonth() + 1
    this.currentYear = today.getFullYear()
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getLiturgy()
    this.allLoaded = true
  }

  async getLiturgy(): Promise<void> {
    const result = await this.request.get(`/liturgia/calendario/${this.currentYear}/${this.currentMonth}`)

    if (result?.dados) {
      const entries: any = Object.entries(result.dados)
      let rawMonth = entries[0][0]

      if (rawMonth.toLowerCase() === 'marco') rawMonth = 'Março'

      this.monthName = rawMonth
      const days: any[] = entries[0][1]
      this.calendarGrid = this.buildCalendarGrid(days)
    }
  }

  buildCalendarGrid(days: any[]): any[][] {
    const grid: any[][] = []
    let week: any[] = new Array(7).fill(null)

    for (let i = 0; i < days.length; i++) {
      const [year, month, dayStr] = days[i].data.split('-')
      const date = new Date(Number(year), Number(month) - 1, Number(dayStr))
      const dayOfWeek = date.getDay()

      if (i === 0) {
        week = new Array(7).fill(null)
        for (let j = 0; j < dayOfWeek; j++) {
          week[j] = null
        }
      }

      week[dayOfWeek] = days[i]

      if (dayOfWeek === 6) {
        grid.push(week)
        week = new Array(7).fill(null)
      }

      if (i === days.length - 1 && dayOfWeek !== 6) {
        grid.push(week)
      }
    }

    return grid
  }

  async previousMonth(): Promise<void> {
    if (this.currentMonth > 1) {
      this.currentMonth--
    } else {
      this.currentMonth = 12
      this.currentYear--
    }

    this.allLoaded = false
    await this.getLiturgy()
    this.allLoaded = true
  }

  async nextMonth(): Promise<void> {
    if (this.currentMonth < 12) {
      this.currentMonth++
    } else {
      this.currentMonth = 1
      this.currentYear++
    }

    this.allLoaded = false
    await this.getLiturgy()
    this.allLoaded = true
  }

  async previousYear(): Promise<void> {
    this.currentYear--
    this.allLoaded = false
    await this.getLiturgy()
    this.allLoaded = true
  }

  async nextYear(): Promise<void> {
    this.currentYear++
    this.allLoaded = false
    await this.getLiturgy()
    this.allLoaded = true
  }

  getLiturgicalColor(tempo: string | undefined): string {
    if (!tempo) return ''

    const tempoLower = tempo.toLowerCase()

    if (tempoLower.includes('comum')) return 'liturgical-green'
    if (tempoLower.includes('quaresma')) return 'liturgical-purple'
    if (tempoLower.includes('advento')) return 'liturgical-purple'
    if (tempoLower.includes('páscoa')) return 'liturgical-white'
    if (tempoLower.includes('natal')) return 'liturgical-white'
    if (tempoLower.includes('pentecostes')) return 'liturgical-red'

    return ''
  }
}