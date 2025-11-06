import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core'
import { provideRouter, RouterModule, withInMemoryScrolling } from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient } from '@angular/common/http'
import { ɵLOTTIE_OPTIONS } from 'ngx-lottie'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import player from 'lottie-web'

import { routes } from './app.routes'
import { RestaurarPosicaoService } from './services/router/restaurar-posicao.service';
import { provideClientHydration } from '@angular/platform-browser'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideHttpClient(),
    { provide: ɵLOTTIE_OPTIONS, useValue: { player: () => player } },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    RestaurarPosicaoService,
    importProvidersFrom(BsDatepickerModule.forRoot()), provideClientHydration()
  ]
}