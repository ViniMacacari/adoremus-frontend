import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from '../../components/loader/loader.component'

@Component({
  selector: 'app-lectio-divina',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule, LoaderComponent],
  templateUrl: './lectio-divina.component.html',
  styleUrl: './lectio-divina.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LectioDivinaComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig> = {}
  lectioMap: Record<string, { id: number; passage: string }> = {}
  disabledDates: Date[] = []
  selectedDate: Date | null = null

  constructor(
    private request: RequestService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD',
      showWeekNumbers: false,
      selectFromOtherMonth: false,
      containerClass: 'theme-dark'
    }
    this.loadLectioDates()
  }

  private async loadLectioDates(): Promise<void> {
    const resp = await this.request.get('/lectio-divina/datas')
    const items = resp?.dados?.lectio || []
    const enabled = items.map((i: any) => {
      const d = this.normalize(new Date(i.data))
      this.lectioMap[this.keyOf(d)] = { id: i.id, passage: i.passagem }
      return d
    })

    const base = enabled.length
      ? enabled[0]
      : new Date()

    const year = base.getFullYear()
    const month = base.getMonth()
    this.disabledDates = this.buildDisabledDates(year, month, enabled)

    this.cdr.detectChanges()
  }

  private buildDisabledDates(year: number, month: number, enabled: Date[]): Date[] {
    const total = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: total }, (_, i) =>
      this.normalize(new Date(year, month, i + 1))
    ).filter(d =>
      !enabled.some(e => e.getTime() === d.getTime())
    )
  }

  private normalize(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
  }

  private keyOf(d: Date): string {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  onDateChange(date: Date | null): void {
    if (!date) return

    const d = this.normalize(date)
    const key = this.keyOf(d)
    const lectio = this.lectioMap[key]

    if (lectio) {
      this.selectedDate = d
      console.log('Lectio ID:', lectio.id)
    } else {
      this.selectedDate = null
    }
  }
}