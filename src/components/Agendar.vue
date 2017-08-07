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
      <div class="explic">
        <p class="center-align" style="font-size: 25px;">Clique numa disciplina abaixo para começar a agendar</p>
      </div>

      <ul class="collapsible popout" data-collapsible="accordion">
        <li>
          <div @click="collapsibleOpen(1)" class="collapsible-header" >
            {{ disciplinas[0].descricao }}    
            <span id="badge1" class="new badge red" data-badge-caption="">{{ situacao1 }}</span>
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(1)" required>
              <option value="" disabled selected>Unidade:</option>
              <option v-for="unidade in unidades">
                {{ unidade.descrição }}
              </option>
            </select>
            <div id="horario1">
              <div class="collection">
                <a @click="modalFunc(1)" class="collection-item center btn modal-trigger" v-for="horario in horarios">
                  {{ horario.data }} - Sala {{ horario.sala }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="collapsible popout" data-collapsible="accordion">
        <li>
          <div @click="collapsibleOpen(2)" class="collapsible-header" >
            {{ disciplinas[1].descricao }}    
            <span id="badge2" class="new badge red" data-badge-caption="">{{ situacao2 }}</span>
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(2)" required>
              <option value="" disabled selected>Unidade:</option>
              <option v-for="unidade in unidades">
                {{ unidade.descrição }}
              </option>
            </select>
            <div id="horario2">
              <div class="collection">
                <a @click="modalFunc(2)" class="collection-item center btn modal-trigger" v-for="horario in horarios">
                  {{ horario.data }} - Sala {{ horario.sala }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="collapsible popout" data-collapsible="accordion">
        <li>
          <div @click="collapsibleOpen(3)" class="collapsible-header" >
            {{ disciplinas[2].descricao }}    
            <span id="badge3" class="new badge red" data-badge-caption="">{{ situacao3 }}</span>
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(3)" required>
              <option value="" disabled selected>Unidade:</option>
              <option v-for="unidade in unidades">
                {{ unidade.descrição }}
              </option>
            </select>
            <div id="horario3">
              <div class="collection">
                <a @click="modalFunc(3)" class="collection-item center btn modal-trigger" v-for="horario in horarios">
                  {{ horario.data }} - Sala {{ horario.sala }}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Confirmar Disciplina?</h4>
          <p>Ao confirmar irá agendar essa disciplina definitivamente e concorda com os termos da UniCarioca.</p>
        </div>
        <div class="modal-footer">

          <a @click="alertar()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//importar disciplinascompleto.json
import disciplinasJSON from '../../dados_json/disciplinas.json'
import unidadesJSON from '../../dados_json/unidades.json'
import disciplinasCompletoJSON from '../../dados_json/disciplinascompleto.json'
import horariosJSON from '../../dados_json/horarios.json'

import moment from 'moment'

export default {
    name: 'Agendar',
    data () {
      return {
        disciplinas: [],
        unidades: [],
        horarios: [],
        situacao1: "Pendente",
        situacao2: "Pendente",
        situacao3: "Pendente",
        badgeDisciplina: ''
      }
    },
    methods: {
      modalFunc: function (x) {
        this.badgeDisciplina = x;
        $('#modal1').modal('open');
      },
      alertar: function () {
        alert("Parabéns! Sua disciplina foi agendada com sucesso!");
        if (this.badgeDisciplina === 1) {
          this.situacao1 = "OK";
          document.querySelector("#badge1").className = "new badge blue";
        } else {
          if (this.badgeDisciplina === 2) {
            this.situacao2 = "OK";
            document.querySelector("#badge2").className = "new badge blue";
          } else {
            this.situacao3 = "OK";
            document.querySelector("#badge3").className = "new badge blue";
          }
        }
      },
      collapsibleOpen: function (i) {
        var h = "horario"+i;
        $('#'+h).hide();
      },
      selectShow: function (i) {
        var i = "horario"+i;
        $('#'+i).show();
      }
    },
    mounted: function() {
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
  
</style>