<template>
  <div id="modalEdicao" class="modal">
    <a class="waves-effect waves-light btn" @click="teste">button</a>
    <div class="modal-content">
      <br>
      <h4 class="center">Edição de Cadastro</h4>

      <div class="row">
        <form class="col s12">

            <div class="row">
              <div class="input-field col s6">
                <input id="disciplina" type="text" class="validate" :value="horarioCadastrado.disciplina">
                <label for="disciplina" class="active">Disciplina</label>
              </div>
              <div class="input-field col s6">
                <input id="unidade" type="text" class="validate" :value="horarioCadastrado.unidade">
                <label for="unidade" class="active">Unidade</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="data" type="text" class="datepicker">
                <label for="data" class="active">Data</label>
              </div>
              <div class="input-field col s6">
                <input id="horario" type="text" class="timepicker" :value="hora">
                <label for="horario" class="active">Horario</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="sala" type="text" class="validate"  :value="horarioCadastrado.sala">
                <label for="sala" class="active">Sala</label>
              </div>
              <div class="input-field col s6">
                <input id="vagas" type="text" class="validate" :value="horarioCadastrado.vagas">
                <label for="vagas" class="active">Vagas</label>
              </div>
            </div>

            <div class="row center">
              <div class="switch">
                <label>
                  Inativo
                  <input type="checkbox">
                  <span class="lever"></span>
                  Ativo
                </label>
              </div>
            </div>

            <div class="row center">
              <!-- <div class="modal-footer"> -->
                <a href="#!" class=" modal-action modal-close btn red darken-4">Salvar</a>
              <!-- </div> -->
            </div>
        </form>

      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment';

  export default {
    props: [ 'horarioCadastrado'],
    data: {
      hora: ''
    },
    methods: {
      teste: function() {
        console.log(this.horarioCadastrado)
        var dataParse = JSON.parse(this.horarioCadastrado.horario+'000')
        var horarioFormatado = moment(dataParse).format('hh:mm')

      $('.timepicker').pickatime({
        default: 'now' , // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Limpar', // text for clear-button
        canceltext: 'Cancelar', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true // make AM PM clickable
      });
      }
    },
    mounted: function() {
      // Materialize.updateTextFields();
      // var dataParse = JSON.parse(this.horarioCadastrado.horario+'000');
      var dataParse = JSON.parse(this.horarioCadastrado.horario+'000')
      var horarioFormatado = moment(dataParse).format('hh:mm')
      this.hora = horarioFormatado
      console.log(horarioFormatado)
      var hora = "'" + horarioFormatado + "'"


      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
      });
      
      $('.timepicker').pickatime({
        default:  hora, // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Limpar', // text for clear-button
        canceltext: 'Cancelar', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true // make AM PM clickable
      });
      var x = 
      console.log()
    },
  };

</script>

<style>
    #modalEdicao {
        width:70%;
        overflow: hidden;
    }

</style>

