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
  'Tempo Comum': 'green',
  Natal: 'white',
  Quaresma: 'purple',
  'Tríduo Pascal': 'red',
  'Tempo Pascal': 'yellow',
  Advento: 'violet'
}

const CorSolenidadePreceito = 'goldenrod' // Cor fixa para Solenidades e Preceitos

const Meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

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
  diasDoMes: { dia: string | null; diaSemana: number; tempoLiturgico: string }[] = []
  mesSelecionado = new Date().getMonth() + 1 // Mês atual
  anoSelecionado = new Date().getFullYear() // Ano atual

  constructor(private requisicao: RequisicaoService) { }

  async ngOnInit() {
    await this.carregarEventosDoAno()
    this.filtrarEventosPorMes()
  }

  async carregarEventosDoAno() {
    const res = await this.requisicao.get(`/geral/buscar/calendario-liturgico?ano=${this.anoSelecionado}`)
    this.diasEspeciais = res.resultado
  }

  filtrarEventosPorMes() {
    this.eventosPorDia = {}
    this.diasEspeciais.forEach(evento => {
      const data = new Date(evento.data)
      const dia = data.getDate()
      const mes = data.getMonth() + 1
      const diaString = `${data.getFullYear()}-${mes}-${dia}`
      this.eventosPorDia[diaString] = evento
    })

    this.gerarDiasDoMes()
  }

  gerarDiasDoMes() {
    this.diasDoMes = []
    const primeiroDiaDoMes = new Date(this.anoSelecionado, this.mesSelecionado - 1, 1)
    const diaSemanaInicio = primeiroDiaDoMes.getDay()
    const diasNoMes = new Date(this.anoSelecionado, this.mesSelecionado, 0).getDate()

    for (let i = 0; i < diaSemanaInicio; i++) {
      this.diasDoMes.push({ dia: null, diaSemana: i, tempoLiturgico: '' })
    }

    for (let i = 1; i <= diasNoMes; i++) {
      const dataAtual = new Date(this.anoSelecionado, this.mesSelecionado - 1, i)
      const diaSemana = dataAtual.getDay()
      const dataString = `${this.anoSelecionado}-${this.mesSelecionado}-${i}`

      const evento = this.eventosPorDia[dataString]
      const tempoLiturgico = evento ? evento.tempo_liturgico : this.obterTempoLiturgicoPorDia(dataAtual)

      this.diasDoMes.push({ dia: i.toString(), diaSemana, tempoLiturgico })
    }
  }

  async alterarMes(incremento: number) {
    this.mesSelecionado += incremento
    if (this.mesSelecionado < 1) {
      this.mesSelecionado = 12
      this.anoSelecionado--
      await this.carregarEventosDoAno()
    } else if (this.mesSelecionado > 12) {
      this.mesSelecionado = 1
      this.anoSelecionado++
      await this.carregarEventosDoAno()
    }
    this.filtrarEventosPorMes()
  }

  async alterarAno(incremento: number) {
    this.anoSelecionado += incremento
    await this.carregarEventosDoAno()
    this.filtrarEventosPorMes()
  }

  obterClasseDia(dia: string | null, tempoLiturgico: string): string {
    if (!dia) return 'vazio'
    const evento = this.eventosPorDia[`${this.anoSelecionado}-${this.mesSelecionado}-${+dia}`]

    if (evento && (evento.tipo.includes("Preceito") || evento.tipo.includes("Solenidade"))) {
      return CorSolenidadePreceito
    }

    return TempoLiturgicoCor[tempoLiturgico] || 'default'
  }

  obterTextoDia(dia: string | null): string {
    if (!dia) return ''
    const evento = this.eventosPorDia[`${this.anoSelecionado}-${this.mesSelecionado}-${+dia}`]
    if (evento) return evento.nome
    const data = new Date(this.anoSelecionado, this.mesSelecionado - 1, +dia)
    return data.getDay() === 0 ? 'Missa' : ''
  }

  obterTempoLiturgicoPorDia(data: Date): string {
    const diaString = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
    const evento = this.diasEspeciais.find(e => e.data.startsWith(diaString))
    return evento ? evento.tempo_liturgico : 'Tempo Comum'
  }

  obterNomeMes(): string {
    return Meses[this.mesSelecionado - 1]
  }
}