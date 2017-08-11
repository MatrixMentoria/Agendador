<template>
  <div id="agendamentos">
    <nav class="nav-wrapper red darken-4">
      <span class="brand-logo center">Agendamentos</span>
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

      <h1 class="center-align" id="discipAgend">Disciplinas Agendadas:</h1>
      <br>

      <table class="bordered" id="tabelaAgenda">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Unidade</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data e Hora</th>
            <th>Sala</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
        </tbody>
      </table>
      <div id="modal2" class="modal">
        <div class="modal-content">
          <h4>Cancelar Agendamento??</h4>
          <p>Se deseja cancelar definitivamente esse agendamento click em "Confirmar"</p>
        </div>
        <div class="modal-footer">
          <a @click="cancelarAgendamento()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Fechar</a>
        </div>
      </div>
      <br>
      <br>
      <br>
      <div class="row">
      <a class="red darken-4 waves-effect waves-light btn center-align" @click="modalFunc2(0)">Cancelar 0</a>
      <a class="red darken-4 waves-effect waves-light btn center-align" @click="modalFunc2(1)">Cancelar 1</a>
      <a class="red darken-4 waves-effect waves-light btn center-align" @click="modalFunc2(2)">Cancelar 2</a>
      </div>
    </div>
  </div>

</template>


<<script>
export default {
    name: 'Agendamentos',
    data () {
      return {
        btnCancelar: ''
      }
    },
    methods: {
        modalFunc2: function (i) {
            $('#modal2').modal('open');
            this.btnCancelar = i;
        },
        cancelarAgendamento: function () {
          var agendado = JSON.parse(localStorage.getItem("agendado"));
          var tabelaAgenda = document.getElementById("tabelaAgenda").deleteRow(this.btnCancelar+1);
          this.btnCancelar = 4 * this.btnCancelar; 
          agendado.splice(this.btnCancelar,4);
          localStorage.setItem("agendado", JSON.stringify(agendado));
        }
        },
        mounted: function () {
          $("#tabelaAgenda td").remove();
          var agend = JSON.parse(localStorage.getItem("agendado"));
          for (var i = 0;;i+=4) {
            if (agend[i] == undefined) {
              break;
            }
            var tb = document.getElementById("tabelaAgenda");
            var tbrow = tb.insertRow(-1);
            var cell0 = tbrow.insertCell(0);
            var cell1 = tbrow.insertCell(1);
            var cell2 = tbrow.insertCell(2);
            var cell3 = tbrow.insertCell(3);
            var cell4 = tbrow.insertCell(4);
            
            cell0.appendChild(document.createTextNode(agend[i]));
            cell1.appendChild(document.createTextNode(agend[i+1]));
            cell2.appendChild(document.createTextNode(agend[i+2]));
            cell3.appendChild(document.createTextNode(agend[i+3]));
            cell4.innerHTML = '<a @click="modalFunc2(i)" id="btnCancelar" class="red darken-4 waves-effect waves-light btn">Cancelar</a>';
          }
        }
      }
</script>

<!-- styling for the component -->
<style>
    #discipAgend {
        font-size: 30px; 
    }
    #btnImprimir {
        margin-left: 42%
    }
</style>