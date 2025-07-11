import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { LiturgicalCalendarComponent } from './pages/liturgical-calendar/liturgical-calendar.component'
import { PrayersComponent } from './pages/prayers/prayers.component'
import { NewLectioComponent } from './pages/new-lectio/new-lectio.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ano-liturgico', component: LiturgicalCalendarComponent },
    { path: 'oracoes', component: PrayersComponent },
    { path: 'nova-lectio', component: NewLectioComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
]
