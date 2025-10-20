import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from "../../components/loader/loader.component"

interface Saint {
  id?: number
  name?: string
  surname?: string
  country?: string
  birth?: string
  martyr?: boolean
  about?: string
  history?: string
}

@Component({
  selector: 'app-saint',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './saint.component.html',
  styleUrl: './saint.component.scss'
})
export class SaintComponent {
  saint: Saint = {}
  loadedAll: boolean = false
  urlPublic: string = ''

  constructor(
    private route: ActivatedRoute,
    private request: RequestService
  ) {
    this.saint.id = Number(this.route.snapshot.paramMap.get('id') ?? 0)
    this.urlPublic = this.request.getPublic()
  }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      this.saint = await this.searchSaint(this.saint.id || 0)
      this.loadedAll = true
    }, 1)
  }

  async searchSaint(id: number): Promise<Saint> {
    try {
      const result = await this.request.get('/pessoas/santos?id=' + id)
      console.log(result)
      return {
        id: result.dados[0].id,
        name: result.dados[0].nome,
        surname: result.dados[0].conhecido_como,
        country: result.dados[0].nacionalidade,
        birth: result.dados[0].nascimento,
        martyr: result.dados[0].martir,
        about: result.dados[0].origem,
        history: result.dados[0].historia
      }
    } catch (error: any) {
      console.error(error)
      throw new Error('Erro')
    }
  }
}
