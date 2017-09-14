<template>
 
 <div id="modalAdd" class="modal">
    <div class="modal-content">
      <h4 class="center">Cadastrar Agendamento</h4>
      
    <div class="row">
      <form class="col s12">
        <div class="row">
          
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Disciplina</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Unidade</label>
          </div>

        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="text" class="datepicker">
          </div>
          <div class="input-field col s6">
            <input type="text" class="timepicker">
          </div>

        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Sala</label>
          </div>

          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Vagas</label>
          </div>
        </div>

        <div class="col s6 offset-s10">
            <div class="switch">
                <label>
                  Inativo
                  <input type="checkbox">
                  <span class="lever"></span>
                  Ativo
                </label>
              </div>
        </div>

        <div class="row">
          <div class="col s12 m9">
            <div class="modal-footer">
              <a href="#!" class=" modal-action modal-close btn red darken-4">Salvar e sair</a>
              <a href="#!" class=" modal-action modal-close btn red darken-4">Salvar e continuar</a>
            </div>
          </div>
        </div>               
      </form>
    </div>
  </div>    
</div>

</template>

<script>
  export default {
    mounted: function() {
        

         $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15, // Creates a dropdown of 15 years to control year,
                today: 'Hoje',
                clear: 'Limpar',
                close: 'Ok',
                closeOnSelect: false // Close upon selecting a date,
              });

              $('.timepicker').pickatime({
                default: 'now', // Set default time: 'now', '1:30AM', '16:30'
                fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
                twelvehour: false, // Use AM/PM or 24-hour format
                donetext: 'OK', // text for done-button
                cleartext: 'Limpar', // text for clear-button
                canceltext: 'Cancelar', // Text for cancel-button
                autoclose: false, // automatic close timepicker
                ampmclickable: true // make AM PM clickable
                
              });

        }     
    };

</script>

<style>
    #modalAdd {
        width:70%;
        overflow: hidden;
    }

</style>

