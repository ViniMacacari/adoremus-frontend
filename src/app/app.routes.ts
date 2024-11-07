import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { CalendarioLiturgicoComponent } from './pages/calendario-liturgico/calendario-liturgico.component'

import { MandamentosComponent } from './pages/ensinamentos/mandamentos/mandamentos.component'

import { NotFoundComponent } from './pages/not-found/not-found.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ano-liturgico', component: CalendarioLiturgicoComponent },

    { path: 'ensinamentos/mandamentos', component: MandamentosComponent },

    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
]
