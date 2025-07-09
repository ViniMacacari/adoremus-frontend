import { Component, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RequestService } from '../../services/requisicao/requisicao.service'
import { ModalLoadingComponent } from "../../components/modal-loading/modal-loading.component"

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

const CorPreceito = 'preceito'
const CorSolenidade = 'solenidade'

const Meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

@Component({
  selector: 'app-calendario-liturgico',
  standalone: true,
  imports: [CommonModule, ModalLoadingComponent],
  templateUrl: './calendario-liturgico.component.html',
  styleUrls: ['./calendario-liturgico.component.scss']
})
export class CalendarioLiturgicoComponent {
  diasEspeciais: Evento[] = []
  eventosPorDia: { [key: string]: Evento } = {}
  diasDoMes: { dia: string | null; diaSemana: number; tempoLiturgico: string }[] = []
  mesSelecionado = new Date().getMonth() + 1
  anoSelecionado = new Date().getFullYear()

  constructor(private requisicao: RequestService) { }

  async ngOnInit() {
    await this.carregarEventosDoAno()
    this.filtrarEventosPorMes()
  }

  async carregarEventosDoAno() {
    ModalLoadingComponent.show()
    const res = await this.requisicao.get(`/geral/buscar/calendario-liturgico?ano=${this.anoSelecionado}`)
    this.diasEspeciais = res.resultado
    ModalLoadingComponent.hide()
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

  async gerarDiasDoMes() {
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
      const tempoLiturgico = this.verificarTempoLiturgico(dataAtual)
      this.diasDoMes.push({ dia: i.toString(), diaSemana, tempoLiturgico })
    }
  }

  verificarTempoLiturgico(data: Date): string {
    const natalInicio = new Date(data.getFullYear(), 11, 25)
    const natalFim = this.encontrarDataFimNatal()

    if (natalFim && ((data >= natalInicio && data.getFullYear() === natalInicio.getFullYear()) || (data <= natalFim && data.getFullYear() === natalFim.getFullYear()))) {
      return 'Natal'
    }

    for (const evento of this.diasEspeciais) {
      const eventoData = new Date(evento.data)

      if (evento.tipo.includes("Início do Tempo Litúrgico") && eventoData <= data) {
        const tempoLiturgico = evento.tempo_liturgico
        const dataFim = this.encontrarDataFimPorNome(tempoLiturgico)

        if (dataFim && data <= dataFim) {
          return tempoLiturgico
        }
      }
    }
    return 'Tempo Comum'
  }

  encontrarDataFimNatal(): Date | null {
    for (const evento of this.diasEspeciais) {
      if (evento.tipo === "Fim do Tempo Litúrgico" && evento.tempo_liturgico === "Natal") {
        return new Date(evento.data)
      }
    }
    return null
  }

  encontrarDataFimPorNome(tempo: string): Date | null {
    for (const evento of this.diasEspeciais) {
      if (evento.tipo.includes("Fim do Tempo Litúrgico") && evento.tempo_liturgico === tempo) {
        return new Date(evento.data)
      }
    }
    return null
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

    if (evento && (evento.tipo.includes("Preceito"))) {
      return CorPreceito
    } else if (evento && (evento.tipo.includes("Solenidade"))) {
      return CorSolenidade
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

  obterNomeMes(): string {
    return Meses[this.mesSelecionado - 1]
  }
}