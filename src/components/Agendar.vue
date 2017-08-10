<template>
  <div id="agendar">
    <nav class="nav-wrapper red darken-4">
      <span class="brand-logo center">Agendar</span>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        <li>
          <router-link to="/Agendar">Agendar</router-link>
        </li>
        <li>
          <router-link to="/Agendamentos">Agendamentos</router-link>
        </li>
      </ul>
    </nav>
    <div class="container">
      <div>
        <p id="textoAjuda" class="center-align">Clique numa disciplina abaixo para começar a agendar</p>
      </div>


      <ul class="collapsible popout" data-collapsible="accordion" id="collapsible0">
        <li>
          <div @click="collapsibleOpen(0)" class="collapsible-header" >
            {{ disciplinas[0].descricao }}    
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-model="unidSelec" v-on:change="selectShow(0)" required>
              <option value="" disabled selected>Unidade:</option>

              <option v-for="unidade in unidades" v-bind:key="unidade.descricao">
                {{ unidade.descrição }}
              </option>
            </select>
            <div id="horario0">
              <div class="collection">
                <a @click="modalFunc(0, horario.data, horario.sala)" class="collection-item center btn modal-trigger" v-for="horario in horarios">
                  {{ horario.data }} - Sala {{ horario.sala }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="collapsible popout" data-collapsible="accordion" id="collapsible1">
        <li>
          <div @click="collapsibleOpen(1)" class="collapsible-header" >
            {{ disciplinas[1].descricao }}    
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-model="unidSelec" v-on:change="selectShow(1)" required>
              <option value="" disabled selected>Unidade:</option>
              <option v-for="unidade in unidades" v-bind:key="unidade.descricao">
                {{ unidade.descrição }}
              </option>
            </select>
            <div id="horario1">
              <div class="collection">
                 <a @click="modalFunc(1, horario.data, horario.sala)" class="collection-item center btn modal-trigger" v-for="horario in horarios">
                  {{ horario.data }} - Sala {{ horario.sala }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="collapsible popout" data-collapsible="accordion" id="collapsible2">
        <li>
          <div @click="collapsibleOpen(2)" class="collapsible-header" >
            {{ disciplinas[2].descricao }}    
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-model="unidSelec" v-on:change="selectShow(2)" required>
              <option value="" disabled selected>Unidade:</option>
              <option v-for="unidade in unidades" v-bind:key="unidade.descricao">
                {{ unidade.descrição }}
              </option>
            </select>
            <div id="horario2">
              <div class="collection">
                 <a @click="modalFunc(2, horario.data, horario.sala)" class="collection-item center btn modal-trigger" v-for="horario in horarios">
                  {{ horario.data }} - Sala {{ horario.sala }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div id="modal0" class="modal">
        <div class="modal-content">
          <h4>Confirmar Disciplina?</h4>
          <p>Disciplina: {{discipSelec}}<br>Unidade: {{unidSelec}}<br>Data: {{horaData}}<br>Sala: {{horaSala}}</p>
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
import disciplinasJSON from '../../dados_json/disciplinas.json'
import unidadesJSON from '../../dados_json/unidades.json'
import horariosJSON from '../../dados_json/horarios.json'

import moment from 'moment'

export default {
    name: 'Agendar',
    data () {
      return {
        disciplinas: [],
        discipValue: '',
        discipSelec: '',
        unidades: [],
        unidSelec: '',
        horarios: [],
        horaData: '',
        horaSala: '',
        horarioModal: [],
        DiscipUnidHora: [],
      }
    },
    methods: {
      modalFunc: function (x, y, z) {
        this.discipSelec = x;
        this.horaData = y;
        this.horaSala = z;
        this.discipSelec = this.disciplinas[this.discipSelec].descricao;
        this.horarioModal.push("Sala: "+this.discipSelec, this.unidSelec, this.horaData, this.horaSala);
        $('#modal0').modal('open');
      },
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
        alert("Parabéns! Sua disciplina foi agendada com sucesso!");
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

      var qtdUnidades = unidadesJSON.unidades.length;
      for (var i = 0 ; i < qtdUnidades ; i++) {
        this.unidades.push(unidadesJSON.unidades[i]);
      }

      var qtdHorarios = horariosJSON.horarios.length;
      for (var i = 0 ; i < qtdHorarios ; i++) {
        var horarioFormatado = moment (horariosJSON.horarios[i]).format("DD/MM/YYYY [-] h:mm");
        horariosJSON.horarios[i].data = horarioFormatado;
        this.horarios.push(horariosJSON.horarios[i]);
      }
    }
}
</script>

<style>
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