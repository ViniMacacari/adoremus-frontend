import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-examination-conscience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examination-conscience.component.html',
  styleUrl: './examination-conscience.component.scss'
})
export class ExaminationConscienceComponent {
  examination = [
    {
      title: '1º Mandamento',
      reference: 'Amar a Deus sobre todas as coisas',
      questions: [
        'Neguei publicamente minha fé ou a rejeitei voluntariamente?',
        'Blasfemei contra Deus com palavras graves ou em atitude de desprezo?',
        'Pratiquei ou participei de rituais ocultistas, satanismo ou espiritismo?',
        'Consultei médiuns, pais de santo, cartomantes, astrologia ou horóscopos com verdadeira crença?',
        'Cometi sacrilégio ao profanar lugares, pessoas ou objetos sagrados?',
        'Desprezei deliberadamente a oração ou os sacramentos por rebeldia contra Deus?',
        'Fui culpado de superstição, atribuindo poder a objetos ou práticas sem relação com Deus?',
        'Apostatei da fé católica por escolha consciente e livre?',
        'Amei ou desejei algo mais do que a Deus, com plena consciência e vontade?',
        'Rejeitei voluntariamente conhecer a Deus, ignorando completamente a fé por desprezo?'
      ]
    },
    {
      title: '2º Mandamento',
      reference: 'Não tomar seu santo nome em vão',
      questions: [
        'Blasfemei contra Deus com palavras ou gestos de desprezo consciente e deliberado?',
        'Usei o nome de Deus para invocar maldição contra alguém?',
        'Jurei falsamente, sabendo que mentia, usando o nome de Deus?',
        'Fiz promessas a Deus que depois rompi conscientemente e sem justa causa?',
        'Zombei publicamente de Deus, da Igreja, dos santos ou dos sacramentos com intenção de escárnio?',
        'Usei o nome de Deus em feitiçarias, simpatias, rituais ocultos ou invocações supersticiosas?',
        'Profanei objetos ou lugares sagrados com desprezo voluntário por sua santidade?',
        'Cometi perjúrio: menti sob juramento em juízo ou diante de autoridade, invocando Deus como testemunha?',
        'Invoquei o nome de Deus em maldições graves contra mim mesmo ou contra outros?',
        'Usei o nome de Deus de forma irreverente e repetida em piadas, músicas ou expressões, com plena consciência do pecado?'
      ]
    },
    {
      title: '3º Mandamento',
      reference: 'Guardar domingos e festas de guarda',
      questions: [
        'Faltei à Missa no domingo ou em dia santo de guarda por preguiça ou desprezo, sem motivo grave?',
        'Sabendo da obrigação, deixei de ir à Missa por escolha deliberada?',
        'Incentivei ou obriguei alguém a faltar à Missa dominical ou em dias santos?',
        'Trabalhei ou fiz outros trabalhos pesados em domingo ou dia santo, sem necessidade grave ou justa causa?',
        'Programei atividades (viagens, eventos, jogos) que me afastaram propositalmente da Missa?',
        'Participei de práticas públicas contrárias à fé (rituais pagãos, festas indecentes) em dia santo?',
        'Provoquei escândalo ao faltar à Missa sabendo que outros me tomam por exemplo?',
        'Ignorei repetidamente a obrigação dominical, demonstrando desprezo pela Eucaristia?',
        'Permiti ou ordenei que meus funcionários trabalhassem sem necessidade grave em domingos e festas?',
        'Deixei de santificar o domingo por negligência total à oração, à caridade e ao descanso espiritual?'
      ]
    },
    {
      title: '4º Mandamento',
      reference: 'Honrar pai e mãe',
      questions: [
        'Desprezei gravemente meus pais com insultos, agressões ou atitudes de ódio?',
        'Recusei ajuda material ou emocional aos meus pais em necessidade, podendo ajudar?',
        'Desejei seriamente o mal ou a morte dos meus pais ou responsáveis?',
        'Desobedeci gravemente meus pais em algo justo e importante?',
        'Fui causa de sofrimento grave e deliberado aos meus pais com minha rebeldia ou vício?',
        'Como pai ou mãe, negligenciei gravemente a educação moral ou espiritual dos meus filhos?',
        'Dei escândalo aos meus filhos por mau exemplo, blasfêmias, vícios ou imoralidade dentro do lar?',
        'Permiti ou incentivei pecados graves nos meus filhos, sem corrigir ou orientar?',
        'Rejeitei ou insultei gravemente outras autoridades legítimas (como superiores, professores ou líderes justos)?',
        'Cometi injustiça grave contra membros da minha família por egoísmo, orgulho ou vingança?'
      ]
    },
    {
      title: '5º Mandamento',
      reference: 'Não matar',
      questions: [
        'Cometi ou participei diretamente de um aborto voluntário?',
        'Incentivei, paguei ou forcei alguém a abortar?',
        'Desejei seriamente ou planejei a morte de alguém?',
        'Cometi agressão física grave contra outra pessoa com ódio ou vingança?',
        'Atentei contra a minha própria vida com tentativa de suicídio ou exposição grave e voluntária ao perigo?',
        'Provoquei escândalo que levou outra pessoa a cometer pecado mortal?',
        'Negligenciei gravemente a saúde própria ou de outros sob minha responsabilidade?',
        'Participei de práticas que envolvem assassinato, eutanásia ou eliminação direta da vida inocente?',
        'Fiz uso de drogas ilícitas com plena consciência e consentimento, em quantidade que destrói gravemente a razão?',
        'Alimentei ódio grave e deliberado contra alguém, recusando-me a perdoar mesmo sabendo da gravidade disso?'
      ]
    },
    {
      title: '6º Mandamento',
      reference: 'Não pecar contra a castidade',
      questions: [
        'Cometi atos sexuais fora do casamento (fornicação) com plena consciência e consentimento?',
        'Cometi adultério, traindo conscientemente meu cônjuge?',
        'Pratiquei masturbação com plena consciência da gravidade do ato?',
        'Assisti conscientemente a pornografia com desejo e aprovação interior?',
        'Cometi atos homossexuais ou aprovei conscientemente práticas contrárias à castidade?',
        'Usei aplicativos, redes sociais ou encontros para buscar relações sexuais ilícitas?',
        'Participei de orgias, prostituição ou outras formas de uso do sexo como objeto?',
        'Mantive uma união estável ou relação conjugal fora do sacramento do matrimônio?',
        'Recusei conscientemente a abertura à vida em atos sexuais conjugais, usando métodos contraceptivos com vontade deliberada de excluir a fecundidade?',
        'Aprovei, incentivei ou desejei gravemente atos sexuais imorais, escandalizando outras pessoas?'
      ]
    },
    {
      title: '7º Mandamento',
      reference: 'Não roubar',
      questions: [
        'Roubei bens materiais com plena consciência e vontade?',
        'Causei prejuízo grave a alguém por fraude, estelionato ou trapaça?',
        'Recusei-me a restituir algo que sabia que era injustamente meu?',
        'Falsifiquei documentos, assinaturas ou registros para obter vantagem injusta?',
        'Cometi corrupção ativa ou passiva, aceitando ou oferecendo propina?',
        'Explorei financeiramente alguém vulnerável, tirando vantagem injusta de sua situação?',
        'Enganei deliberadamente alguém em vendas, contratos ou promessas, com prejuízo grave?',
        'Aproveitei-me do trabalho de outros sem pagar o justo salário ou com remuneração injusta?',
        'Fui cúmplice de roubo, furto ou qualquer apropriação indébita sabendo da gravidade?',
        'Desviei verbas, bens públicos ou eclesiásticos para proveito próprio ou de terceiros?'
      ]
    },
    {
      title: '8º Mandamento',
      reference: 'Não levantar falso testemunho',
      questions: [
        'Acusei alguém falsamente, sabendo da inocência da pessoa?',
        'Caluniei alguém, atribuindo-lhe pecados ou crimes que não cometeu?',
        'Causei grave dano à reputação de alguém com mentiras públicas ou difamação consciente?',
        'Dei falso testemunho em juízo ou perante autoridade, sabendo que mentia?',
        'Espalhei boatos ou informações falsas que destruíram a honra de terceiros?',
        'Guardei silêncio cúmplice quando tinha obrigação de dizer a verdade, causando dano grave?',
        'Manipulei relatos ou omiti fatos deliberadamente para causar injustiça contra alguém?',
        'Provoquei ou incentivei outros a mentirem em meu favor, mesmo em situações graves?',
        'Usei meios de comunicação (redes sociais, blogs, etc.) para atacar, zombar ou expor gravemente alguém injustamente?',
        'Neguei publicamente uma verdade da fé ou moral da Igreja, escandalizando os fiéis e ofendendo a verdade conscientemente?'
      ]
    },
    {
      title: '9º Mandamento',
      reference: 'Não desejar a mulher do próximo',
      questions: [
        'Consenti voluntariamente em desejos sexuais por pessoa casada, com plena consciência?',
        'Desejei seriamente cometer adultério, ainda que só no coração?',
        'Alimentei fantasias sexuais com pessoas comprometidas, sabendo que isso ofende a castidade?',
        'Procurei provocar alguém casado(a) com intenções de sedução ou conquista?',
        'Busquei relações afetivas ou emocionais com pessoas casadas, com intenção desordenada?',
        'Fui infiel ao meu cônjuge nos pensamentos, desejando outra pessoa com intensidade e consentimento?',
        'Olhei com desejo impuro e consciente para pessoa casada, consentindo interiormente?',
        'Usei redes sociais ou mensagens para insinuar-me ou seduzir alguém casado(a)?',
        'Alimentei pensamentos impuros repetidos e deliberados com desprezo pela fidelidade conjugal?',
        'Desejei que alguém traísse o cônjuge por minha causa, mesmo sem consumar o ato?'
      ]
    },
    {
      title: '10º Mandamento',
      reference: 'Não cobiçar as coisas alheias',
      questions: [
        'Desejei com avidez e consentimento pleno tomar para mim os bens ou propriedades de outra pessoa?',
        'Fiz planos conscientes e deliberados para tirar algo de alguém por inveja ou cobiça?',
        'Fiquei interiormente revoltado com o bem alheio, desejando que o outro perdesse o que tem?',
        'Fui dominado pela inveja grave, desejando mal ao próximo por suas conquistas ou bens?',
        'Cobicei a herança, o cargo, o sucesso ou o prestígio de alguém com desejo impuro de usurpar?',
        'Alimentei ciúmes destrutivos que me levaram a desejar o fracasso do outro?',
        'Desejei injustamente o bem material do próximo, mesmo sabendo que não me pertence?',
        'Nutri ganância consciente e constante, com aversão à partilha ou generosidade?',
        'Fiz do desejo de riqueza ou status o centro da minha vida, afastando-me de Deus?',
        'Desprezei as bênçãos que Deus me deu, vivendo em constante insatisfação e cobiça?'
      ]
    }
  ]
}