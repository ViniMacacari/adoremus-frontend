import { Component, ElementRef, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from "../../components/loader/loader.component"

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  allLoaded = false
  categories: any = []
  posts: any = []
  searchActive = false

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

  constructor(private request: RequestService) { }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.getCategories()
      await this.getLastPosts()
      this.allLoaded = true
    })
  }

  async getCategories(): Promise<void> {
    const result = await this.request.get('/blog/categorias')
    this.categories = result.dados
  }

  async getLastPosts(): Promise<void> {
    const result = await this.request.get('/blog/postagens')
    this.posts = result.dados
    console.log(this.posts)
  }

  activateSearch(): void {
    this.searchActive = true
    setTimeout(() => {
      this.searchInput.nativeElement.focus()
    }, 100)
  }

  deactivateSearch(): void {
    this.searchActive = false
  }
}