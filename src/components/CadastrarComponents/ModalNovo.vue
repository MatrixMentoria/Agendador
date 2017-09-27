<template>
  <div id="modalNovo" class="modal">
    <div class="modal-content">
      <h4 class="center">Cadastrar Horário</h4>

      <div class="row">
        <form class="col s12" @submit.prevent="salvar()">

            <div class="row">
              <div class="input-field col s6">
                <select class="browser-default" v-model="disciplinaCodigo">
                  <option value="" disabled>Disciplina</option>
                  <option v-for="disciplina in disciplinas"
                          :value="disciplina.codigo"
                          :key="disciplina.key">{{disciplina.descricao}}</option>
                </select>
              </div>
              <div class="input-field col s6">
                <select class="browser-default" v-model="unidadeCodigo">
                  <option value="" disabled>Unidade</option>
                  <option v-for="unidade in unidades"
                          :value="unidade.codigo"
                          :key="unidade.key">{{unidade.descricao}}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="sala" type="text" class="validate" v-model.number="obj.sala">
                <label for="sala" class="active">Sala</label>
              </div>
              <div class="input-field col s6">
                <input id="vagas" type="text" class="validate" v-model.number="obj.vagas">
                <label for="vagas" class="active">Vagas</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="data" type="text" class="datepicker">
                <label for="data" class="active">Data</label>
              </div>
              <div class="input-field col s6">
                <input id="horario" type="text" class="timepicker">
                <label for="horario" class="active">Horario</label>
              </div>
            </div>

            <div class="row center">
              <div class="switch">
                <label>
                  Inativo
                  <input type="checkbox"  v-model="obj.status">
                  <span class="lever"></span>
                  Ativo
                </label>
              </div>
            </div>

            <div class="row center">
                <button class="modal-action modal-close btn red darken-4" type="submit" name="action" >Salvar</button>
            </div>
        </form>

      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment';
  import {firebase} from '../../Firebase'
  const firebaseDatabase = firebase.database();
  const disciplinasRef = firebaseDatabase.ref('disciplinasCadastradas');

  export default {
    props: [],
    data: function(){
      return {
        disciplinaCodigo: '',
        unidadeCodigo: '',
        unidadeDescricao: '',
        disciplinas:[],
        unidades:[],
        status: '',
        obj: {
          data: '',
          sala: '',
          vagas: '',
          status: false,
        },
        horarios: [],
        unidadeSelecionada: ''
      }
    },

    mounted: function() {
      firebaseDatabase.ref('disciplinas').once('value').then(disciplina => {
        var self = this;
          disciplina.forEach((discip) => {
            self.disciplinas.push(discip.val());
          });
      });
      firebaseDatabase.ref('unidades').once('value').then(unidade => {
        var self = this;
          unidade.forEach((unid) => {
            self.unidades.push(unid.val());
          });
      });

      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Ok',
        closeOnSelect: true, // Close upon selecting a date,
      });

      $('.timepicker').pickatime({
        default:  'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Limpar', // text for clear-button
        canceltext: 'Cancelar', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true // make AM PM clickable
      });

    },

    methods: {
      salvar: function() {
        if (this.status === '') {
          this.obj.status = false;
        } else {
          this.obj.status = this.status;
        }

        var ano = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
        var mes = $('.datepicker').pickadate('picker').get('highlight', 'mm');
        var dia = $('.datepicker').pickadate('picker').get('highlight', 'dd');
        var objTimePicker = $('.timepicker').pickatime('picker').get()

        var horarioString = objTimePicker[1].value
        var hora = horarioString.substring(0,2)
        var minuto = horarioString.substring(3,5)
        this.obj.data = Date.parse(new Date(ano, mes, dia, hora, minuto))

        var horariosPromise = firebaseDatabase.ref('disciplinasCadastradas') 
                                              .child(this.disciplinaCodigo)
                                              .child('unidades')
                                              .child(this.unidadeCodigo)
                                              .child('horarios')
                                              .once('value');
        horariosPromise.then((snapshot) => { snapshot.forEach((item) => { this.horarios.push(item.val()) }) 
          this.horarios.push(this.obj)
          this.montaUnidade();
        })
      },

      montaUnidade: function() {
        var unidadePromise = firebaseDatabase.ref('unidades').child(this.unidadeCodigo).once('value');
        unidadePromise.then((snapshot) => { 
          this.unidadeSelecionada = snapshot.val() 
          this.unidadeSelecionada.horarios = this.horarios
          this.atualizaFirebase()
          })
      },

      atualizaFirebase: function() {
        firebaseDatabase.ref('disciplinasCadastradas') 
                        .child(this.disciplinaCodigo)
                        .child('unidades')
                        .child(this.unidadeCodigo)
                        .set(this.unidadeSelecionada)

        this.disciplinaCodigo = ''
        this.disciplinaCodigo = ''
        this.unidadeCodigo = ''
        this.unidadeDescricao = ''
        this.obj.data = ''
        this.obj.sala = ''
        this.obj.vagas = ''
        this.obj.status = ''
        this.horarios = []
        this.unidadeSelecionada = ''
      }
    },
  };

</script>

<style>
    #modalEdicao {
        width:70%;
        overflow: hidden;
    }

</style>


