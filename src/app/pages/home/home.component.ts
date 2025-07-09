import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from "../../components/loader/loader.component"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  constructor(
    private router: Router,
    private request: RequestService
  ) { }

  allLoaded: boolean = false

  dayLiturgy: {
    day: string,
    gospel: string,
    firstReading: string,
    secondReading: string
  } = {
      day: '09/07/2025',
      gospel: 'Mt 10,1-7',
      firstReading: '1 Cor 2,1-5',
      secondReading: '1 Cor 2,6-10'
    }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.getDayLiturgy()
      this.allLoaded = true
    })
  }

  async getDayLiturgy(): Promise<void> {
    const result = await this.request.get('/liturgia/evangelho')
    this.dayLiturgy = {
      day: result.dados.data_liturgia,
      gospel: result.dados.evangelho,
      firstReading: result.dados.primeira_leitura,
      secondReading: result.dados.segunda_leitura
    }
  }

  navigate(url: string): void {
    this.router.navigate([url])
  }

  externalNavigate(url: string): void {
    window.open(url, '_blank')
  }
}