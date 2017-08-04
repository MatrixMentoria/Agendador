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
      <ul class="collapsible popout" data-collapsible="accordion" id="badge1">
        <li>
          <div @click="badgeOpen(1)" class="collapsible-header">Algoritmos 1</div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(1)" required>
              <option value="" disabled selected>Unidade:</option>
               <option v-for="unidade in unidades" v-bind:key="unidade.value">
                {{unidade.texto}}
              </option>
            </select>
            <div id="horario1">
              <div class="collection">
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 01/11/2017 &nbsp; Horário: 07:50 &nbsp; Sala: 201 &nbsp; &nbsp;</a>
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 02/11/2017 &nbsp; Horário: 08:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 03/11/2017 &nbsp; Horário: 09:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul class="collapsible popout" data-collapsible="accordion" id="badge2">
        <li>
          <div @click="badgeOpen(2)" class="collapsible-header">Programação</div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(2)" required>
              <option value="" disabled selected>Unidade:</option>
               <option v-for="unidade in unidades" v-bind:key="unidade.value">
                {{unidade.texto}}
              </option>
            </select>
            <div id="horario2">
              <div class="collection">
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 01/11/2017 &nbsp; Horário: 07:50 &nbsp; Sala: 201 &nbsp; &nbsp;</a>
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 02/11/2017 &nbsp; Horário: 08:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 03/11/2017 &nbsp; Horário: 09:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="collapsible popout" data-collapsible="accordion" id="badge3">
        <li>
          <div @click="badgeOpen(3)" class="collapsible-header">Engenharia</div>
          <div class="collapsible-body">
            <select class="browser-default" v-on:change="selectShow(3)" required>
              <option value="" disabled selected>Unidade:</option>
               <option v-for="unidade in unidades" v-bind:key="unidade.value">
                {{unidade.texto}}
              </option>
            </select>
            <div id="horario3">
              <div class="collection">
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 01/11/2017 &nbsp; Horário: 07:50 &nbsp; Sala: 201 &nbsp; &nbsp;</a>
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 02/11/2017 &nbsp; Horário: 08:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
                <a @click="modalFunc1()" class="collection-item center btn modal-trigger">Data: 03/11/2017 &nbsp; Horário: 09:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
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

<<script>
$(document).ready(function () {
      $('select').material_select();
      $('.collapsible').collapsible();
});
export default {
    name: 'Agendar',
    data () {
        return {
            unidades: [{
              texto: "Bento Ribeiro",
              value: "bento"
            },
            {
              texto: "Jacarépaguá",
              value: "jacare"
            },
            {
              texto: "Méier 1",
              value: "meier1"
            },
            {
              texto: "Méier 2",
              value: "meier2"
            },
            {
              texto: "Rio Comprido",
              value: "riocomp"
            }
          ],
        }
    },
    methods: {
        modalFunc1: function () {
            $('#modal1').modal('open');
        },
        alertar: function () {
        alert("Parabéns! Sua disciplina foi agendada com sucesso!");
        },
        badgeOpen: function (i) {
            $('select').material_select();
            var h = "horario"+i;
            $('#'+h).hide();
            var b = "badge"+i;
            $('#'+b).collapsible('open');
        },
        selectShow: function (i) {
            var i = "horario"+i;
            $('#'+i).show();
        }
    }
}
</script>
