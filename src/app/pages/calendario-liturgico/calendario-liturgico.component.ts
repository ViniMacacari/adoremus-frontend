import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RequisicaoService } from '../../services/requisicao/requisicao.service'

type Evento = {
  nome: string
  data: string
  tipo: string
  tempo_liturgico: string
}

const TempoLiturgicoCor: { [key: string]: string } = {
  Natal: 'blue',
  'Tempo Comum': 'green',
  Quaresma: 'purple',
  'Tríduo Pascal': 'red',
  'Tempo Pascal': 'yellow',
  Advento: 'violet'
}

@Component({
  selector: 'app-calendario-liturgico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-liturgico.component.html',
  styleUrls: ['./calendario-liturgico.component.scss']
})
export class CalendarioLiturgicoComponent {
  diasEspeciais: Evento[] = []
  eventosPorDia: { [key: string]: Evento } = {}
  diasDoMes: { dia: string; diaSemana: string }[] = []
  mesSelecionado = new Date().getMonth() + 1 // Mês atual
  anoSelecionado = new Date().getFullYear() // Ano atual

  constructor(private requisicao: RequisicaoService) { }

  async ngOnInit() {
    await this.carregarEventos()
  }

  async carregarEventos() {
    const res = await this.requisicao.get(`/geral/buscar/calendario-liturgico?ano=${this.anoSelecionado}`)
    this.diasEspeciais = res.resultado.filter((evento: Evento) => {
      const data = new Date(evento.data)
      return data.getMonth() + 1 === this.mesSelecionado
    })
    this.eventosPorDia = {}
    this.diasEspeciais.forEach(evento => {
      const dia = new Date(evento.data).getDate()
      this.eventosPorDia[dia] = evento
    })
    this.gerarDiasDoMes()
  }

  gerarDiasDoMes() {
    this.diasDoMes = []
    const primeiroDia = new Date(this.anoSelecionado, this.mesSelecionado - 1, 1)
    const diasNoMes = new Date(this.anoSelecionado, this.mesSelecionado, 0).getDate()

    for (let i = 1; i <= diasNoMes; i++) {
      const dataAtual = new Date(this.anoSelecionado, this.mesSelecionado - 1, i)
      const diaSemana = dataAtual.toLocaleDateString('pt-BR', { weekday: 'short' })
      this.diasDoMes.push({ dia: i.toString(), diaSemana })
    }
  }

  async alterarMes(incremento: number) {
    this.mesSelecionado += incremento
    if (this.mesSelecionado < 1) {
      this.mesSelecionado = 12
      this.anoSelecionado--
    } else if (this.mesSelecionado > 12) {
      this.mesSelecionado = 1
      this.anoSelecionado++
    }
    await this.carregarEventos()
  }

  obterClasseDia(dia: string): string {
    const evento = this.eventosPorDia[+dia]
    return evento ? TempoLiturgicoCor[evento.tempo_liturgico] || 'default' : ''
  }
}