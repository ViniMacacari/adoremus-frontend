import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoaderComponent } from "../../components/loader/loader.component"
import { RequestService } from '../../services/requisicao/requisicao.service'

@Component({
  selector: 'app-missal',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './missal.component.html',
  styleUrl: './missal.component.scss'
})
export class MissalComponent {
  allLoaded: boolean = false
  missalData: any = {}

  constructor(
    private request: RequestService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadMissalInfo()
    })
  }

  async loadMissalInfo(): Promise<void> {
    try {
      const result = await this.request.get('/missal/ordinario')
      this.missalData = result.dados
      console.log(this.missalData)
      this.allLoaded = true
    } catch (error: any) {
      console.error(error)
    }
  }
}
