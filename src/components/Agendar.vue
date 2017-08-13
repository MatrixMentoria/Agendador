<template>
  <div id="agendar">
    <nav class="nav-wrapper red darken-4">
      <span class="brand-logo center">Agendar</span>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li>
          <router-link to="/Agendamentos">Agendamentos</router-link>
        </li>
      </ul>
    </nav>
    <div class="container">
      <div>
        <p id="textoAjuda" class="center-align">Clique numa disciplina abaixo para começar a agendar</p>
      </div>

      <ul v-for="disciplina in disciplinas" class="collapsible popout" data-collapsible="acordion" :id="disciplina.codigo"> 
        <li>
          <div @click="abrirCollapsible(disciplina.codigo)" class="collapsible-header">
            {{ disciplina.descricao }} <i v-bind:style="{opacity: checkOpacity0}" class="material-icons right">check</i>
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
                  {{ horario.data }} - Sala {{ horario.sala }}
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
          </p>

          <!-- <p>Disciplina: {{discipSelec}}<br>Unidade: {{unidSelec}}<br>Data: {{horaData}}<br>Sala: {{horaSala}}</p> -->
        </div>
        <div class="modal-footer">
          <a @click="salvar()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <a @click="limparHorarioModal()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//importar disciplinascompleto.json
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
        unidadeSelecionadaObj: {},



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
        $('#horario-' + id).show();
        $('#' + id).collapsible('open');
      },
      abrirModalDeConfirmacaoDeDisciplina: function (disciplina, data, sala) {
        this.checkSelec = disciplina.codigo;
        this.selecaoExibidaNoModal.disciplinaSelecionada = disciplina.descricao;
        this.selecaoExibidaNoModal.unidadeSelecionada = this.unidadeSelecionada.descrição;
        this.selecaoExibidaNoModal.dataSelecionada = data;
        this.selecaoExibidaNoModal.salaSelecionada = sala;
        $('#modal').modal('open');
      },
      exibicaoDaListaDeHorarios: function (id) {
        var id = "horario"+id;
        $('#'+id).show();
      },





      // modalFunc: function (x, y, z) {
      //   this.checkSelec = x;
      //   this.discipSelec = x;
      //   this.horaData = y;
      //   this.horaSala = z;
      //   this.discipSelec = this.disciplinas[this.discipSelec].descricao;
      //   this.horarioModal.push("Sala: "+this.discipSelec, this.unidSelec, this.horaData, this.horaSala);
      //   $('#modal0').modal('open');
      // },
      limparHorarioModal: function () {
        this.horarioModal.splice(0);
      },
      salvar: function () {
        if (localStorage.getItem("agendado")) {
          this.DiscipUnidHora = JSON.parse(localStorage.getItem("agendado"));
        }

        this.DiscipUnidHora.push(this.discipSelec, this.unidSelec, this.horaData, this.horaSala);
        localStorage.setItem("agendado", JSON.stringify(this.DiscipUnidHora));
        this.horarioModal.splice(0); 
        localStorage.setItem("check"+this.checkSelec, "true");         
        if (this.checkSelec == 0) {
          this.checkOpacity0 = 100;
        }
        if (this.checkSelec == 1) {
          this.checkOpacity1 = 100;
        }
        if (this.checkSelec == 2) {
          this.checkOpacity2 = 100;
        }
      },
      collapsibleOpen: function (i) {
        var h = "horario"+i;
        $('#'+h).hide();
        var b = "collapsible"+i;
        $('#'+b).collapsible('open');
      },
      selectShow: function (i) {
        var i = "horario"+i;
        $('#'+i).show();
      }
    },
    created: function() {
      $('.collapsible').collapsible();
      $('select').material_select();
      $('.modal').modal();
      
      var qtdDisciplinas = disciplinasJSON.disciplinas.length;
      for (var i = 0 ; i < qtdDisciplinas ; i++) {
        this.disciplinas.push(disciplinasJSON.disciplinas[i]);
      }
      if (localStorage.getItem("check0")) {
        this.checkOpacity0 = 100;
        }
      if (localStorage.getItem("check1")) {
        this.checkOpacity1 = 100;
      }
      if (localStorage.getItem("check2")) {
        this.checkOpacity2 = 100;
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