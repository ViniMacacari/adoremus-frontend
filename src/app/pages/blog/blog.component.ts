import { Component, ElementRef, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { LoaderComponent } from "../../components/loader/loader.component"

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [LoaderComponent, CommonModule, FormsModule],
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
  searchTerm: string = ''
  filters: any = {}
  selectedCategoryId: number | null = null

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

  constructor(
    private router: Router,
    private request: RequestService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.getCategories()
      await this.getLastPosts(1)
      this.allLoaded = true
    })
  }

  async getCategories(): Promise<void> {
    const result = await this.request.get('/blog/categorias')
    this.categories = result.dados
  }

  async getLastPosts(page: number = 1): Promise<void> {
    const params: string[] = []
    params.push(`page=${page}`)

    for (const key in this.filters) {
      if (this.filters[key] !== undefined && this.filters[key] !== null && this.filters[key] !== '') {
        params.push(`${key}=${encodeURIComponent(this.filters[key])}`)
      }
    }

    const queryString = params.length ? `?${params.join('&')}` : ''

    console.log(queryString)

    const result = await this.request.get(`/blog/postagens${queryString}`)
    this.posts = result.dados
    this.currentPage = result.pagina
    this.totalPages = result.totalPaginas
    this.updatePagesToShow()
  }

  async filterByCategory(categoryId: number): Promise<void> {
    if (this.selectedCategoryId === categoryId) {
      this.selectedCategoryId = null
      delete this.filters.categoria
    } else {
      this.selectedCategoryId = categoryId
      this.filters.categoria = categoryId
    }

    this.currentPage = 1
    this.allLoaded = false
    await this.getLastPosts(1)
    this.allLoaded = true
  }

  async onSearch(): Promise<void> {
    this.filters.titulo = this.searchTerm
    this.currentPage = 1
    this.allLoaded = false
    await this.getLastPosts(1)
    this.allLoaded = true
  }

  activateSearch(): void {
    this.searchActive = true
    setTimeout(() => {
      this.searchInput.nativeElement.focus()
    }, 100)
  }

  deactivateSearch(): void {
    setTimeout(() => {
      this.searchActive = false
    }, 100)
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.currentPage = page
      this.allLoaded = false
      await this.getLastPosts(page)
      this.allLoaded = true
    }
  }

  async goToPost(slug: string): Promise<void> {
    this.router.navigate(['/blog/', slug])
  }
}