import { Routes } from '@angular/router'

import { HomeComponent } from './pages/home/home.component'
import { LiturgicalCalendarComponent } from './pages/liturgical-calendar/liturgical-calendar.component'
import { PrayersComponent } from './pages/prayers/prayers.component'
import { LectioDivinaComponent } from './pages/lectio-divina/lectio-divina.component'
import { NewLectioComponent } from './pages/new-lectio/new-lectio.component'
import { MoreInfoComponent } from './pages/more-info/more-info.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { ExaminationConscienceComponent } from './pages/examination-conscience/examination-conscience.component'
import { MissalComponent } from './pages/missal/missal.component'
import { BlogComponent } from './pages/blog/blog.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ano-liturgico', component: LiturgicalCalendarComponent },
    { path: 'oracoes', component: PrayersComponent },
    { path: 'lectio-divina', component: LectioDivinaComponent },
    { path: 'nova-lectio', component: NewLectioComponent },
    { path: 'mais', component: MoreInfoComponent },
    { path: 'exame-de-consciencia', component: ExaminationConscienceComponent },
    { path: 'missal', component: MissalComponent },
    { path: 'blog', component: BlogComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
]