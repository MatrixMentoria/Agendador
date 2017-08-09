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
          <div class="collapsible-header" id="teste">
            Algoritmos 1
           <span id="check" class="ion-checkmark-round" data-pack="default" data-tags="complete, finished, success, on"></span>
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(1)" required>
              <option value="" disabled selected>Unidade:</option>
               <option v-for="unidade in unidades" v-bind:key="unidade.value">
                {{unidade.texto}}
              </option>
            </select>
            <div id="horario1">
              <div class="collection">
                <a @click="modalFunc(1)" class="collection-item btn modal-trigger" v-for="horario in horarios" v-bind:key="horario.value">
                  {{horario.texto}}  
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="collapsible popout" data-collapsible="accordion">
        <li>
          <div class="collapsible-header">
            Programação
            <span id="check2" class="ion-checkmark-round" data-pack="default" data-tags="complete, finished, success, on" ></span>
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(2)" required>
              <option value="" disabled selected>Unidade:</option>
               <option v-for="unidade in unidades" v-bind:key="unidade.value">
                {{unidade.texto}}
              </option>
            </select>
            <div id="horario2">
              <div class="collection">
                <a @click="modalFunc(2)" class="collection-item center btn modal-trigger" v-for="horario in horarios" v-bind:key="horario.value">
                  {{horario.texto}}  
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="collapsible popout" data-collapsible="accordion">
        <li>
          <div class="collapsible-header">
            Engenharia
            <span id="check3" class="ion-checkmark-round" data-pack="default" data-tags="complete, finished, success, on" ></span>
          </div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(3)" required>
              <option value="" disabled selected>Unidade:</option>
               <option v-for="unidade in unidades" v-bind:key="unidade.value">
                {{unidade.texto}}
              </option>
            </select>
            <div id="horario3">
              <div class="collection">
                <a @click="modalFunc(3)" class="collection-item center btn modal-trigger" v-for="horario in horarios" v-bind:key="horario.value">
                  {{horario.texto}}  
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Confirmar Disciplina?</h4>
          <p>AQUI ENTRA OS DETALHES DA DISCIPLINA AGENDADA</p>
        </div>
        <div class="modal-footer">

          <a @click="mostrar()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
    name: 'Agendar',
    data () {
      return {
        estadoCheck: false,
        unidades: [
          { texto: "Bento Ribeiro", value: "1" },
          { texto: "Jacarépaguá",   value: "2" },
          { texto: "Méier 1",       value: "3" },
          { texto: "Méier 2",       value: "4" },
          { texto: "Rio Comprido",  value: "5" }
        ],
        horarios: [
          { texto:"Data: 01/11/2017 | Horário: 07:50 | Sala: 201", value: "1" },
          { texto:"Data: 02/11/2017 | Horário: 08:50 | Sala: 301", value: "2" },
          { texto:"Data: 03/11/2017 | Horário: 09:50 | Sala: 301", value: "3" },
        ],
        situacao1: 'Pendente',
        situacao2: 'Pendente',
        situacao3: 'Pendente',
        badgeDisciplina: ''
      }
    },
    methods: {
      mostrar: function(){
        if(this.badgeDisciplina === 1){
      setTimeout(function(){
        $('#check').css("display","block")
        this.estadoCheck = true;
        }, 800)}else{
        if(this.badgeDisciplina === 2){
          setTimeout(function(){
        $('#check2').css("display","block")
        this.estadoCheck = true;
        }, 1000)}else{
        setTimeout(function(){
        $('#check3').css("display","block")
        this.estadoCheck = true;
        }, 1000)
        }
        }
      
       
      },
      modalFunc: function (x) {
        this.badgeDisciplina = x;
        $('#modal1').modal('open');
        
       //$('#check').hide();
      

      },
      alertar: function () {
        alert("Sua disciplina foi agendada com sucesso");
      
      },
      badgeOpen: function (i) {
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
     
    },
    
}
</script>

<style>
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
  
</style>