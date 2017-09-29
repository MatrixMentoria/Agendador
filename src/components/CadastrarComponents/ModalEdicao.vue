<template>
  <div id="modalEdicao" class="modal">
    <div class="modal-content">
      <h4 class="center">Edição de Cadastro</h4>

      <div class="row">
        <form class="col s12" @submit.prevent="salvarCadastro()">

            <div class="row">
              <div class="input-field col s6">
                <select class="browser-default" v-model="codigoDisciplina">
                  <option value="" disabled>Disciplina</option>
                  <option v-for="disciplina in disciplinas"
                          :value="disciplina.codigo"
                          :key="disciplina.codigo">{{disciplina.descricao}}</option>
                </select>
              </div>
              <div class="input-field col s6">
                <select class="browser-default" v-model="codigoUnidade">
                  <option value="" disabled>Unidade</option>
                  <option v-for="unidade in unidades"
                          :value="unidade.codigo"
                          :key="unidade.key">{{unidade.descricao}}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="sala" type="text" class="validate"  v-model.number="cadastroEditado.sala" :value="cadastroEditado.sala" required>
                <label for="sala" class="active">Sala</label>
              </div>
              <div class="input-field col s6">
                <input id="vagas" type="text" class="validate" v-model.number="cadastroEditado.vagas" :value="cadastroEditado.vagas" required>
                <label for="vagas" class="active">Vagas</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="data" type="text" class="datepicker" v-model="dataFormatada" required>
                <label for="data" class="active">Data</label>
              </div>
              <div class="input-field col s6">
                <input id="horario" type="text" class="timepicker" v-model="horarioFormatado" required>
                <label for="horario" class="active">Horario</label>
              </div>
            </div>

            <div class="row center">
              <div class="switch">
                <label>
                  Inativo
                  <input type="checkbox" :checked="cadastroEditado.status" v-model="cadastroEditado.status">
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
  // import 'moment/locale/pt-br' - o pickadate.js no materialize só funciona em ingles

  export default {
    props: ['horario'],

    data: function(){
      return {
        cadastroAntigo: [],
        disciplinas: [],
        horarios: [],
        unidades : [],
        unidadeSelecionada: [],
        codigoDisciplina: '',
        codigoUnidade: '',
        dataFormatada: '',
        horarioFormatado: '',
        cadastroEditado: {
          data: '',
          sala: '',
          vagas: '',
          status: '',
        }
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
        closeOnSelect: true // Close upon selecting a date,
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
      salvarCadastro: function(){
        var horarioAntigo = firebaseDatabase.ref('disciplinasCadastradas')
                        .child(this.horario.keyDisciplina)
                        .child('unidades')
                        .child(this.horario.keyUnidade)
                        .child('horarios')
                        .child(this.horario.keyHorario)
                        .remove()

        var ano = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
        var mes = $('.datepicker').pickadate('picker').get('highlight', 'mm');
        var dia = $('.datepicker').pickadate('picker').get('highlight', 'dd');
        var objTimePicker = $('.timepicker').pickatime('picker').get()
        var horarioString = objTimePicker[0].value
        var hora = horarioString.substring(0,2)
        var minuto = horarioString.substring(3,5)
        this.cadastroEditado.data = Date.parse(new Date(ano, mes, dia, hora, minuto))

        var listaUnidadesPromise = firebaseDatabase.ref('unidades')
                                             .child(this.codigoUnidade)
                                             .once('value');
        listaUnidadesPromise.then((snapshot) => { 
          this.unidadeSelecionada = snapshot.val()
          this.insereHorario();
        })
      },

      insereHorario: function() {
        var unidadePromise = firebaseDatabase.ref('disciplinasCadastradas')
                                             .child(this.codigoDisciplina)
                                             .child('unidades')
                                             .child(this.codigoUnidade)
                                             .child('horarios')
                                             .once('value');
        unidadePromise.then((snapshot) => { snapshot.forEach((item) => { this.horarios.push(item.val()) }) 
          this.horarios.push(this.cadastroEditado)
          this.unidadeSelecionada.horarios = this.horarios
          this.atualizaFirebase();
        })
      },

      atualizaFirebase: function() {
        firebaseDatabase.ref('disciplinasCadastradas') 
                        .child(this.codigoDisciplina)
                        .child('unidades')
                        .child(this.codigoUnidade)
                        .set(this.unidadeSelecionada)
        this.unidadeSelecionada = [];
        this.horarios = [];
      },
    },

    watch: {
      horario: function() {
        this.cadastroEditado = {
          data: this.horario.data,
          sala: this.horario.sala,
          vagas: this.horario.vagas,
          status: this.horario.status,
        }
        this.codigoDisciplina = this.horario.codigoDisciplina;
        this.codigoUnidade = this.horario.codigoUnidade;

        var dataParse = JSON.parse(this.horario.data)
        this.horarioFormatado = moment(dataParse).format('hh:mm')
        this.dataFormatada = moment(dataParse).format('DD MMMM, YYYY')
      },
    },
  };

</script>

<style>
    #modalEdicao {
        width:70%;
        overflow: hidden;
    }

</style>

