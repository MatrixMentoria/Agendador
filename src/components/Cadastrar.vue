<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <filtro></filtro>
      <tabela></tabela>
    </div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red darken-4 modal-trigger" href="#modal1" id="botaoCadastrarAgendamento" @click="AbreModalCadastarDisciplina">
        <i class="large material-icons">add_circle</i>
      </a>
    </div>


    <div id="modal1" class="modal">
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

        <div class="row right">
          <div class="switch">
            <label>
              Inativo
              <input type="checkbox">
              <span class="lever"></span>
              Ativo
            </label>
          </div>
        </div>

      </form>
    </div>

    </div>
    <div class="modal-footer">
      <div class="row center">
        <a href="#!" class=" modal-action modal-close btn red darken-4">Salvar e sair</a>
        <a href="#!" class=" modal-action modal-close btn red darken-4">Salvar e continuar</a>
      </div>
    </div>
  </div>
        
  </div>
</template>

<script>
import {firebaseauth} from '../FirebaseAuth'
import Navbar from './CadastrarComponents/Navbar';
import Filtro from './CadastrarComponents/Filtro';
import Tabela from './CadastrarComponents/Tabela';
import sMDAJSON from '../sMDA.json'

export default {
  name:'cadastrar',
    components: {
      Navbar,
      Filtro,
      Tabela,
      //NovoCadastro,
    },
    data() {
      return {
        smdajson: sMDAJSON,
      }
    },
      mounted: function() {
        $(".button-collapse").sideNav();
    },
    created: function() {
      var smdaLenght = Object.keys(this.smdajson.smda).length;
      var smdaFirebase = this.smdajson;
      var smda = false;
        firebaseauth.onAuthStateChanged(function(user) {
            if (!user) {
            alert("deslogado, entre para poder acessar essa página");
            window.location.href = "/";
            }
            for (var i = 0; i < smdaLenght; i++) {
              if (user.uid == smdaFirebase.smda[i].smdaCode){
                smda = true;
              }
            }
            if (smda === false) {
              alert("Você não tem permissão para acessar essa página");
              window.location.href = "/";
            }
        });
    },
    methods: {
        AbreModalCadastarDisciplina() {
            $('.modal').modal();

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
                ampmclickable: true, // make AM PM clickable
                aftershow: function(){} //Function for after opening timepicker
              });
        },
    }
}
</script>

<style>
    #textoAjuda {
        font-size: 25px;
    }
</style>


