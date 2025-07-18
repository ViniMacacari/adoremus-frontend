import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { ButtonComponent } from "../../components/button/button.component"
import { LoaderComponent } from "../../components/loader/loader.component"

@Component({
  selector: 'app-prayers',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoaderComponent],
  templateUrl: './prayers.component.html',
  styleUrl: './prayers.component.scss'
})
export class PrayersComponent {
  prayers: any[] = []
  allLoaded: boolean = false
  selectedPrayer: any = {}

  constructor(
    private request: RequestService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.getPrayers()
      this.allLoaded = true
    })
  }

  async getPrayers(): Promise<void> {
    try {
      const result = await this.request.getPaginated('/oracoes/todas')
      this.prayers = result.sort((a, b) => a.id - b.id)
      console.log(this.prayers)
    } catch (error) {
      console.error('Error fetching prayers:', error)
    }
  }

  selectPrayer(event: any): void {
    this.selectedPrayer = event

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }
}