<template>
  <div id="agendar">
    <nav class="nav-wrapper red darken-4">
      <span class="brand-logo center">Agendamento de Provas</span>
    </nav>

    <div class="container">
      <div>
        <p id="textoAjuda" class="center-align">Clique numa disciplina abaixo para começar a agendar</p>
      </div>

      <ul v-for="disciplina in disciplinas" class="collapsible popout" data-collapsible="acordion" :id="disciplina.codigo"> 
        <li>
          <div @click="abrirCollapsible(disciplina.codigo)" class="collapsible-header">
            {{ disciplina.descricao }} <i v-bind:style="{opacity: checkOpacity}" class="material-icons right">check</i>
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-model="unidadeSelecionada" v-on:change="exibicaoDaListaDeHorarios(disciplina.codigo)" required>
              <option value="" disabled selected>Unidade:</option>
              <option v-for="unidade in disciplina.unidades" v-bind:value="unidade">
                {{ unidade.descrição }}
              </option>
            </select>
            <div :id="'horario-' + disciplina.codigo">
              <div class="collection">
                <a @click="abrirModalDeConfirmacaoDeDisciplina(disciplina, horario.data, horario.sala)" class="collection-item center btn modal-trigger" v-for="horario in unidadeSelecionada.horarios">
                  {{ horario.data | dataFormatada }} - {{ horario.data | horarioFormatado }} - Sala {{ horario.sala }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div id="modal" class="modal">
        <div class="modal-content">
          <h4 align="center">Confirmar Disciplina?</h4>
          <p align="center">
            Disciplina: {{ selecaoExibidaNoModal.disciplinaSelecionada }}<br>
            Unidade: {{ selecaoExibidaNoModal.unidadeSelecionada }}<br>
            Data: {{ selecaoExibidaNoModal.dataSelecionada }}<br>
            Sala: {{ selecaoExibidaNoModal.salaSelecionada }}
            
            <!-- Não sei porque dá erro formatando dessa forma!! ↓↓↓↓↓↓↓ -->
            <!-- Data: {{ selecaoExibidaNoModal.dataSelecionada | dataFormatada }}<br> -->
            <!-- Horario: {{ selecaoExibidaNoModal.dataSelecionada | horarioFormatado }}<br> -->
          </p>
        </div>

        <div class="modal-footer">
          <a @click="salvarDadosNoLocalStorage()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <a @click="limparHorarioModal()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//import dos dados dos arquivos JSON
import disciplinasJSON from '../../dados_json/disciplinascompleto.json'
// import disciplinasJSON from '../../dados_json/disciplinas.json'
// import unidadesJSON from '../../dados_json/unidades.json'
// import horariosJSON from '../../dados_json/horarios.json'

import moment from 'moment'


export default {
    name: 'Agendar',
    data () {
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


        //Rever o que ainda é necessário aqui ↓
        discipValue: '',
        discipSelec: '',
        unidades: [],
        unidSelec: '',
        horarios: [],
        horaData: '',
        horaSala: '',
        horarioModal: [],
        DiscipUnidHora: [],
        checkOpacity0: 0,
        checkOpacity1: 0,
        checkOpacity2: 0,
        checkSelec: ''
      }
    },
    methods: {
      abrirCollapsible: function (id) {
        $('#horario-' + id).hide();
        $('#' + id).collapsible('open');
      },
      abrirModalDeConfirmacaoDeDisciplina: function (disciplina, data, sala) {
        this.checkSelec = disciplina.codigo;
        this.selecaoExibidaNoModal.disciplinaSelecionada = disciplina.descricao;
        this.selecaoExibidaNoModal.unidadeSelecionada = this.unidadeSelecionada.descrição;
        this.selecaoExibidaNoModal.dataSelecionada = data;
        console.log(this.selecaoExibidaNoModal.dataSelecionada)
        this.selecaoExibidaNoModal.salaSelecionada = sala;
        $('#modal').modal('open');
      },
      exibicaoDaListaDeHorarios: function (id) {
        $('#horario-'+id).show();
      },
      limparHorarioModal: function () {
        this.horarioModal.splice(0);
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
        if(localStorage.getItem("Agendamentos") === null) {
          //Caso não haja matérias agendadas, insere o objeto em um array e o armazena no local storage
          var arrayDeAgendamentos = [objDisciplinaAgendada];
          localStorage.setItem("Agendamentos",JSON.stringify(arrayDeAgendamentos));
        }
        else
        {
          //Caso haja matérias agendadas, insere o objeto no array já criado
          var arrayDeAgendamentos = JSON.parse(localStorage.getItem("Agendamentos"));
          arrayDeAgendamentos.push(objDisciplinaAgendada);
          localStorage.setItem("Agendamentos",JSON.stringify(arrayDeAgendamentos));
        }
      },



      // A parte do check deve ser refeita e inserida na função salvarDadosNoLocalStorage
      // salvar: function () {
      //   if (localStorage.getItem("agendado")) {
      //     this.DiscipUnidHora = JSON.parse(localStorage.getItem("agendado"));
      //   }

      //   this.DiscipUnidHora.push(this.discipSelec, this.unidSelec, this.horaData, this.horaSala);
      //   localStorage.setItem("agendado", JSON.stringify(this.DiscipUnidHora));
      //   this.horarioModal.splice(0); 
      //   localStorage.setItem("check"+this.checkSelec, "true");         
      //   if (this.checkSelec == 0) {
      //     this.checkOpacity0 = 100;
      //   }
      //   if (this.checkSelec == 1) {
      //     this.checkOpacity1 = 100;
      //   }
      //   if (this.checkSelec == 2) {
      //     this.checkOpacity2 = 100;
      //   }
      // }
    },
    created: function() {
      $('.collapsible').collapsible();
      $('select').material_select();
      $('.modal').modal();
      
      this.disciplinas = disciplinasJSON.disciplinas;

      // if (localStorage.getItem("check0")) {
      //   this.checkOpacity0 = 100;
      //   }
      // if (localStorage.getItem("check1")) {
      //   this.checkOpacity1 = 100;
      // }
      // if (localStorage.getItem("check2")) {
      //   this.checkOpacity2 = 100;
      // }
    },
    filters: {
      dataFormatada: function(data) {
        //Precisamos melhorar essa parte. Consegui converter as datas somente
        //a partir de milisegundos. Por isso o '+000'
        var dataParse = JSON.parse(data+'000')
        return moment(dataParse).format('DD/MM/YYYY')
      },
      horarioFormatado: function(data) {
        var dataParse = JSON.parse(data+'000')
        return moment(dataParse).format('hh:mm')
      }
    }
}
</script>

<style>
.blocoHor{
cursor: pointer;
}
#check{
  display: none;
  float: right;
  color:#00ff00;
  
}
#check2{
  display: none;
  float: right;
  color:#00ff00;
}
#check3{
  display: none;
  float: right;
  color:#00ff00;
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