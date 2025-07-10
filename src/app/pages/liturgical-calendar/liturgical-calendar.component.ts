import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from "../../components/loader/loader.component"

@Component({
  selector: 'app-liturgical-calendar',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './liturgical-calendar.component.html',
  styleUrl: './liturgical-calendar.component.scss'
})
export class LiturgicalCalendarComponent {
  allLoaded: boolean = false
  monthData: any[] = []
  monthName: string = ''
  calendarGrid: any[][] = []

  constructor(
    private request: RequestService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.getLiturgy()
      this.allLoaded = true
    })
  }

  async getLiturgy(): Promise<void> {
    const result = await this.request.get('/liturgia/calendario/2025/1')

    if (result?.dados) {
      const entries: any = Object.entries(result.dados)
      this.monthName = entries[0][0]
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
}
