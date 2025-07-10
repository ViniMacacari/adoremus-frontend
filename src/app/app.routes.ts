import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { LiturgicalCalendarComponent } from './pages/liturgical-calendar/liturgical-calendar.component'

import { NotFoundComponent } from './pages/not-found/not-found.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ano-liturgico', component: LiturgicalCalendarComponent },

    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
]
