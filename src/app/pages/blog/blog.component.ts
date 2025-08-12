import { Component, ElementRef, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
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
  currentPage: number = 1
  totalPages: number = 1
  pagesToShow: number[] = []

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

  constructor(
    private router: Router,
    private request: RequestService
  ) { }

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

  async getLastPosts(page: number = 1): Promise<void> {
    const result = await this.request.get(`/blog/postagens?page=${page}`)
    this.posts = result.dados
    this.currentPage = result.pagina
    this.totalPages = result.totalPaginas
    this.updatePagesToShow()
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

  updatePagesToShow(): void {
    const delta = 2
    const range: number[] = []
    for (let i = Math.max(1, this.currentPage - delta); i <= Math.min(this.totalPages, this.currentPage + delta); i++) {
      range.push(i)
    }
    this.pagesToShow = range
  }

  async changePage(page: number): Promise<void> {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      this.allLoaded = false
      await this.getLastPosts(page)
      this.allLoaded = true
    }
  }

  async goToPost(slug: string): Promise<void> {
    this.router.navigate(['/blog/', slug])
  }
}