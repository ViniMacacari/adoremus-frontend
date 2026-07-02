import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID } from '@angular/core'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { Router } from '@angular/router'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from "../../components/loader/loader.component"
import { ButtonComponent } from "../../components/button/button.component"
import { CapitalizeFirstPipe } from '../../pips/capitalize-first.pipe'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, LoaderComponent, ButtonComponent],
  providers: [RequestService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  constructor(
    private router: Router,
    private request: RequestService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private capitalize: CapitalizeFirstPipe = new CapitalizeFirstPipe()

  allLoaded: boolean = false

  dayLiturgy: {
    day: string,
    gospel: string,
    firstReading: string,
    secondReading: string,
    dayMass: string
  } | null = null

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return
    }

    try {
      await this.getDayLiturgy()
    } finally {
      this.allLoaded = true
    }
  }

  async getDayLiturgy(): Promise<void> {
    const result = await this.request.getFresh('/liturgia/evangelho?locale=br')
    const dayMass = await this.request.getFresh('/liturgia/calendario/hoje')
    this.dayLiturgy = {
      day: result.dados.data_liturgia,
      gospel: result.dados.evangelho,
      firstReading: result.dados.primeira_leitura,
      secondReading: result.dados.segunda_leitura,
      dayMass: dayMass.dados.descricao && (dayMass.dados.tipo === 'festa' || dayMass.dados.tipo === 'memória') ? this.capitalize.transform(dayMass.dados.tipo) + ' de ' + dayMass.dados.descricao : dayMass.dados.descricao
    }
  }

  navigate(url: string): void {
    this.router.navigate([url])
  }

  externalNavigate(url: string): void {
    window.open(url, '_blank')
  }
}
