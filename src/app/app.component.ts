import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MenuComponent } from "./components/menu/menu.component"
import { FooterComponent } from "./components/footer/footer.component"
import { ModalLoadingComponent } from "./components/modal-loading/modal-loading.component"
import { ModalComponent } from "./components/modal/modal.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent, ModalLoadingComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adoremus'
}
