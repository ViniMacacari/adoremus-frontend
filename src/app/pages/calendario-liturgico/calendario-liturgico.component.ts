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

const CorSolenidadePreceito = 'goldenrod' // Cor fixa para solenidades e preceitos

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

      // Verifica se existe um evento específico para o dia
      const evento = this.eventosPorDia[dataString]
      const tempoLiturgico = evento ? evento.tempo_liturgico : this.obterTempoLiturgicoAtual(dataAtual)

      this.diasDoMes.push({ dia: i.toString(), diaSemana, tempoLiturgico })
    }
  }

  obterTempoLiturgicoAtual(data: Date): string {
    // Encontra o tempo litúrgico correto para um dia sem evento específico
    const eventosOrdenados = this.diasEspeciais
      .filter(evento => evento.tipo.includes("Início do Tempo Litúrgico") || evento.tipo.includes("Fim do Tempo Litúrgico"))
      .map(evento => ({ ...evento, data: new Date(evento.data) }))
      .sort((a, b) => a.data.getTime() - b.data.getTime())

    let tempoAtual = 'Tempo Comum'
    for (const evento of eventosOrdenados) {
      if (data >= evento.data) {
        tempoAtual = evento.tempo_liturgico
      }
    }
    return tempoAtual
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

    // Verifica se é um dia de preceito ou solenidade e aplica a cor fixa
    if (evento && (evento.tipo.includes("Preceito") || evento.tipo.includes("Solenidade"))) {
      return CorSolenidadePreceito
    }

    // Aplica a cor do tempo litúrgico para os outros dias
    return TempoLiturgicoCor[tempoLiturgico] || 'default'
  }

  obterTextoDia(dia: string | null): string {
    if (!dia) return ''
    const evento = this.eventosPorDia[`${this.anoSelecionado}-${this.mesSelecionado}-${+dia}`]
    if (evento) return evento.nome
    const data = new Date(this.anoSelecionado, this.mesSelecionado - 1, +dia)
    return data.getDay() === 0 ? 'Missa' : ''
  }

  obterNomeMes(): string {
    return Meses[this.mesSelecionado - 1]
  }
}