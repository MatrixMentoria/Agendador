<template>

  <div id="agendar">
    <nav class="nav-wrapper red darken-4">
      <span class="brand-logo center">Agendamento de Provas</span>
    </nav>

    <div class="container">
      <div>
        <p id="textoAjuda" class="center-align">Clique numa disciplina abaixo para começar a agendar</p>
      </div>

      <div class="col s12 m12 l12">
        <ul v-for="disciplina in disciplinas" class="collapsible" data-collapsible="acordion" :id="disciplina.codigo">
          <li>
            <div @click="abrirCollapsible(disciplina.descricao,disciplina.codigo)" class="collapsible-header">
              {{ disciplina.descricao }}
              <span v-if="badges(disciplina.descricao) == true" :id="'badge-' + disciplina.codigo" :class="agendadoClass" data-badge-caption="">{{agendadoTxt}}
              </span>
              <span v-else :id="'badge-' + disciplina.codigo" :class="pendenteClass" data-badge-caption="">{{pendenteTxt}}
              </span>
            </div>

            <div class="collapsible-body center">
              <div :id="'agendado-' + disciplina.codigo">
                <!--Criação de uma div par agrupar o agendamento-->
                <h5><strong>Prova Agendada</strong></h5>
                <table :id="'resumo-' + disciplina.codigo" class="highlight centered">
                </table>
                <!--Conteúdo da tabela sendo criado dinamicamente-->
                <br>
                <a @click="abrirModalDeConfirmacaoDeCancelamento()" class='red darken-4 waves-effect waves-light btn'>Cancelar Agendamento</a>
                <!--Chamada do modal de cancelamento-->
              </div>
              <select :id="'select-' + disciplina.codigo" class="browser-default" v-model="unidadeSelecionada" v-on:change="exibicaoDaListaDeHorarios(disciplina.codigo)">
                <option value="" disabled>Unidade:</option>
                <option v-for="unidade in disciplina.unidades" v-bind:value="unidade">
                  {{ unidade.descrição }}
                </option>
              </select>
              <div :id="'horario-' + disciplina.codigo">
                <table class="highlight centered">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Horario</th>
                      <th>Sala</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr @click="abrirModalDeConfirmacaoDeDisciplina(disciplina, horario.data, horario.sala)" class="collection-item center modal-trigger blocoHorario"
                      v-for="horario in unidadeSelecionada.horarios" v-bind:value="horario"> 
                      <td>{{ horario.data | dataFormatada }}</td>
                      <td> {{ horario.data | horarioFormatado }}</td>
                      <td> {{ horario.sala }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div id="modal" class="modal">
        <div class="modal-content">
          <h4 align="center">Confirmar Agendamento?</h4>
          <p align="center">
            Disciplina: {{ selecaoExibidaNoModal.disciplinaSelecionada }}<br> Unidade: {{ selecaoExibidaNoModal.unidadeSelecionada
            }}
            <br> Data:{{selecaoExibidaNoModal.dataSelecionada}}  <br> Sala: {{ selecaoExibidaNoModal.salaSelecionada }}

            <!-- Não sei porque dá erro formatando dessa forma!! ↓↓↓↓↓↓↓ -->
            <!-- Data: {{ selecaoExibidaNoModal.dataSelecionada | dataFormatada }}<br> -->
            <!-- Horario: {{ selecaoExibidaNoModal.dataSelecionada | horarioFormatado }}<br> -->
          </p>
        </div>

        <div class="modal-footer">
          <a @click="salvarDadosNoLocalStorage()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
        </div>
      </div>

      <div id="modal2" class="modal">
        <div class="modal-content">
          <h4 align="center">Cancelar Agendamento?</h4>
          <p align="center">
            Disciplina: {{ selecaoExibidaNoModal.disciplinaSelecionada }}<br> Unidade: {{ selecaoExibidaNoModal.unidadeSelecionada
            }}
            <br> Data: {{ selecaoExibidaNoModal.dataSelecionada }}<br> Sala: {{ selecaoExibidaNoModal.salaSelecionada }}

            <!-- Não sei porque dá erro formatando dessa forma!! ↓↓↓↓↓↓↓ -->
            <!-- Data: {{ selecaoExibidaNoModal.dataSelecionada | dataFormatada }}<br> -->
            <!-- Horario: {{ selecaoExibidaNoModal.dataSelecionada | horarioFormatado }}<br> -->
          </p>
        </div>

        <div class="modal-footer">
          <a @click="cancelarDisciplina()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <!--Chamada da função de cancelamento da disciplina-->
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Voltar</a>
        </div>

      </div>

      <div>
        <a class="red darken-4 waves-light btn" onclick="window.print();">Imprimir Comprovante</a>
      </div>
      
    </div>
  </div>



</template>

<script>

import disciplinasJSON from '../../dados_json/disciplinascompleto.json'
import moment from 'moment'


export default {
  name: 'Agendar',
  data() {
    return {
      disciplinas: [],
      unidadeSelecionada: [],
      selecaoExibidaNoModal: {
        disciplinaSelecionada: '',
        unidadeSelecionada: '',
        dataSelecionada: '',
        salaSelecionada: ''
      },
      disciplinaSelecionada: {},
      descricaoTemp: '',
      codigoTemp: '',
      pendenteClass: 'new badge red',
      pendenteTxt: 'Pendente',
      agendadoClass: 'new badge green',
      agendadoTxt: 'Agendado'
    }
  },
  methods: {
    abrirCollapsible: function (descricao, codigo) {
      this.descricaoTemp = descricao; //armazena a descricao da disciplina clicada temporariamente
      this.codigoTemp = codigo; //armazena o codigo da disciplina clicada temporariamente
      $('.collapsible').collapsible('close', 0); // Fechando o collapsible
      $('#agendado-' + codigo).hide(); //Escondendo a div do agendamento
      $('#select-' + codigo).prop('selectedIndex', 0); //o selected do html não está funcionando, então esse código JQuery substitui ele                       
      $('#horario-' + codigo).hide(); //Escondendo os horários da disciplina
      this.mostrarResumoDoAgendamento(); //chama a função de mostrar o resumo ao abrir o collapsible
      $('#' + codigo).collapsible('open'); //abrindo o collapsible clicado
    },
    abrirModalDeConfirmacaoDeDisciplina: function (disciplina, data, sala) {
      this.selecaoExibidaNoModal.disciplinaSelecionada = disciplina.descricao;
      this.selecaoExibidaNoModal.unidadeSelecionada = this.unidadeSelecionada.descrição;
      var d = new Date(JSON.parse(data+'000'));
      this.selecaoExibidaNoModal.dataSelecionada = d.toLocaleDateString();
      //this.selecaoExibidaNoModal.dataSelecionada = data;
      this.selecaoExibidaNoModal.salaSelecionada = sala;
      $('#modal').modal('open');
    },
    abrirModalDeConfirmacaoDeCancelamento: function () {
      //semelhante à função de cancelamento, com a diferença que ao invés de cancelar, ele pega os dados pra exibir no modal
      var disciplinasAgendadas = JSON.parse(localStorage.getItem("Agendamentos"));
      var qtdDeDisciplinas = disciplinasAgendadas.length;
      for (var i = 0; i < qtdDeDisciplinas; i++) {
        if (disciplinasAgendadas[i].disciplinaAgendada == this.descricaoTemp) {
          //pegando do localStorage e colocando nas variáveis do modal
          this.selecaoExibidaNoModal.disciplinaSelecionada = disciplinasAgendadas[i].disciplinaAgendada;
          this.selecaoExibidaNoModal.unidadeSelecionada = disciplinasAgendadas[i].unidadeAgendada;
          this.selecaoExibidaNoModal.dataSelecionada = disciplinasAgendadas[i].dataAgendada;
          this.selecaoExibidaNoModal.salaSelecionada = disciplinasAgendadas[i].salaAgendada;
          break;
        }
      }
      $('#modal2').modal('open');
    },
    exibicaoDaListaDeHorarios: function (id) {
      $('#horario-' + id).show();
    },
    salvarDadosNoLocalStorage: function () {
      //↓ Cria o objeto que será armazenado no local storage
      var objDisciplinaAgendada = {
        disciplinaAgendada: this.selecaoExibidaNoModal.disciplinaSelecionada,
        unidadeAgendada: this.selecaoExibidaNoModal.unidadeSelecionada,
        dataAgendada: this.selecaoExibidaNoModal.dataSelecionada,
        salaAgendada: this.selecaoExibidaNoModal.salaSelecionada
      }
      //Verifica se já há disciplinas agendadas
      if (localStorage.getItem("Agendamentos") === null) {
        //Caso não haja matérias agendadas, insere o objeto em um array e o armazena no local storage
        var arrayDeAgendamentos = [objDisciplinaAgendada];
        localStorage.setItem("Agendamentos", JSON.stringify(arrayDeAgendamentos));
        this.mostrarResumoDoAgendamento();
      } else {
        //Caso haja matérias agendadas, insere o objeto no array já criado
        var arrayDeAgendamentos = JSON.parse(localStorage.getItem("Agendamentos"));
        arrayDeAgendamentos.push(objDisciplinaAgendada);
        localStorage.setItem("Agendamentos", JSON.stringify(arrayDeAgendamentos));
        this.mostrarResumoDoAgendamento();
      }

    },
    mostrarResumoDoAgendamento: function () {
      //Pega os agendamentos do banco de dados
      var objResumoAgendamento = JSON.parse(localStorage.getItem("Agendamentos"));

      if (objResumoAgendamento) { //teste para ver se pegou algo
        var qtdDisciplinas = Object.keys(objResumoAgendamento).length; //armazenando o tamanho do objeto para ser usado no for
        for (var i = 0; i < qtdDisciplinas; i++) {
          if (this.descricaoTemp == objResumoAgendamento[i].disciplinaAgendada) { //testa se a descricao da disciplina clicada no collapsible é igual ao que está guardado no local storage
            $('#select-' + this.codigoTemp).hide(); //escondendo o select
            $('#horario-' + this.codigoTemp).hide(); //escondendo os horários
            $('#resumo-' + this.codigoTemp).empty(); //esvaziando o resumo para adicionar dinamicamente sem repetição
            //adicionando dinamicamente o agendamento na tabela
            $('#resumo-' + this.codigoTemp).append("<thead><tr><th>Unidade</th><th>Data</th><th>Sala</th></tr></thead><tbody><tr><td>" + objResumoAgendamento[i].unidadeAgendada + "</td> <td>" + objResumoAgendamento[i].dataAgendada + "</td> <td> Sala " + objResumoAgendamento[i].salaAgendada + "</td></tr></tbody>");
            $('#agendado-' + this.codigoTemp).show(); //mostra o agendamento
            break;
          }
        }
      }
    },
    badges: function (descricaoBadge) {
      //Pega os agendamentos do banco de dados
      var objBadgeLocalStorage = JSON.parse(localStorage.getItem("Agendamentos"));

      if (objBadgeLocalStorage) { //teste para ver se pegou algo
        var qtdObjBadgeLocalStorage = Object.keys(objBadgeLocalStorage).length; //armazenando o tamanho do objeto para ser usado no for
        for (var i = 0; i < qtdObjBadgeLocalStorage; i++) {
          if (descricaoBadge == objBadgeLocalStorage[i].disciplinaAgendada) {
            return (true);
          }
        }
      }
    },
    cancelarDisciplina: function () {
      var disciplinasAgendadas = JSON.parse(localStorage.getItem("Agendamentos")); // puxa os dados do local storage para a variável disciplinasAgendadas
      var qtdDeDisciplinas = disciplinasAgendadas.length;
      for (var i = 0; i < qtdDeDisciplinas; i++) {
        if (disciplinasAgendadas[i].disciplinaAgendada === this.descricaoTemp) {
          disciplinasAgendadas.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("Agendamentos", JSON.stringify(disciplinasAgendadas)); // salva novamente no local storage sobrescrevendo o que está lá
      $('#agendado-' + this.codigoTemp).hide(); //escondendo o agendamento
      $('#horario-' + this.codigoTemp).hide(); //escondendo o horário
      $('#select-' + this.codigoTemp).prop('selectedIndex', 0); //reiniciando o select
      $('#select-' + this.codigoTemp).show(); //mostrando o select
    },
  },
  mounted: function (e) {
    $('.collapsible').collapsible();
    $('select').material_select();
    $('.modal').modal();

    this.disciplinas = disciplinasJSON.disciplinas;
  },
  filters: {
    dataFormatada: function (data) {
      //Precisamos melhorar essa parte. Consegui converter as datas somente
      //a partir de milisegundos. Por isso o '+000'
      var dataParse = JSON.parse(data + '000')
      return moment(dataParse).format('DD/MM/YYYY')
    },
    horarioFormatado: function (data) {
      var dataParse = JSON.parse(data + '000')
      return moment(dataParse).format('hh:mm')
    }
  }
}

</script>


<style>

.blocoHor {
  cursor: pointer;
}

.collapsible-header {
  position: relative;
}

a.collection-item {
  color: black !important;
}

#textoAjuda {
  font-size: 25px;
}

</style>
