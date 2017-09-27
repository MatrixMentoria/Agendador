<template>
  <div class="col s12 m12 l12">
    <ul class="collapsible" data-collapsible="acordion">
      <li>
        <div class="collapsible-header">
          <badge :pendente="disciplina.pendente"></badge>
          {{ disciplina.descricao }}
        </div>
        <div class="collapsible-body center" v-if="disciplina.pendente">
          <lista-de-unidades v-on:agendamentoConfirmado="agendamentoConfirmado" :unidades="disciplina.unidades" :disciplina="disciplina"></lista-de-unidades>
        </div>

        <div v-show="disciplina.pendente === false">
          <h5 class="center">
            <strong>Prova Agendada</strong>
          </h5>
          <table class="highlight centered">
            <thead>
              <tr>
                <th>Unidade</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Sala</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ unidadeAgendada }}</td>
                <td>{{ dataAgendada }}</td>
                <td>{{ horarioAgendado }}</td>
                <td>{{ salaAgendada }}</td>
              </tr>
            </tbody>
          </table>
          <br>
          <div class="row center">
            <a @click="cancelarDisciplina(disciplina.descricao)" class='card-panel teal lighten-2 waves-effect waves-light btn'>Cancelar Agendamento</a>
          </div>
          <br>
        </div>
      </li>

    </ul>

  </div>
</template>


<script>

import moment from 'moment';
import ListaDeUnidades from './ListaDeUnidades';
import Badge from './Badge';
import sweetalert from 'sweetalert';
import { firebase } from '../../Firebase'

const firebaseDatabase = firebase.database();

export default {
  props: ['disciplina'],
  components: {
    ListaDeUnidades,
    Badge,
  },
  data() {
    return {
      unidadeAgendada: '',
      dataAgendada: '',
      horarioAgendado: '',
      salaAgendada: '',
      usuario: [],
      qtdDisciplinas: ''
    }
  },
  mounted: function() {
    $('.collapsible').collapsible();
    $('select').material_select();
    var usuarioDisciplinasAgendadas = firebaseDatabase.ref('usuarios').child(firebase.auth().currentUser.uid).child('disciplinasAgendadas').child(this.disciplina.codigo);
    usuarioDisciplinasAgendadas.once('value', user => {
      if (user.val() != null) {
        var userDisciplinasAgendadas = user.val();
        this.agendamentoConfirmado(userDisciplinasAgendadas);
        this.disciplina.pendente = false;
      }
    })
  },
  methods: {
    agendamentoConfirmado(agendamento) {

      this.unidadeAgendada = agendamento.unidadeAgendada;
      var momentDataHoraAgendada = JSON.parse(agendamento.dataAgendada);
      this.dataAgendada = moment(momentDataHoraAgendada).format('DD/MM/YYYY')
      this.horarioAgendado = moment(momentDataHoraAgendada).format('hh:mm');
      this.salaAgendada = agendamento.salaAgendada;

    }, cancelarDisciplina: function(disciplina) {
      sweetalert({
        title: 'Cancelar Agendamento?',
        html: true,
        text: '<ul>' +
        '<li>' + disciplina + '</li>' +
        '<li>' + this.unidadeAgendada + '</li>' +
        '<li>' + this.dataAgendada + '</li>' +
        '<li>' + this.horarioAgendado + 'h</li>' +
        '<li> Sala ' + this.salaAgendada + '</li>' +
        '</ul>',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Confirmar Cancelamento',
        closeOnConfirm: true,
      },
        () => {
          firebaseDatabase.ref('usuarios').child(firebase.auth().currentUser.uid).child('disciplinasAgendadas').child(this.disciplina.codigo).remove();
          this.disciplina.pendente = true;
        });
    },
  },
};

</script>

