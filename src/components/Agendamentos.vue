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
          </tr>
        </thead>

        <tbody>

        </tbody>
      </table>
      <div id="modal2" class="modal">
        <div class="modal-content">
          <h4>Cancelar Disciplina??</h4>
          <p>Deseja cancelar definitivamente essa disciplina?</p>
        </div>
        <div class="modal-footer">
          <a @click="alertarCancelar()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Fechar</a>
        </div>
      </div>
      <br>
      <br>
      <br>
      <a id="btnImprimir" class="red darken-4 waves-effect waves-light btn center-align" onclick="window.print();">Imprimir</a>
    </div>
  </div>

</template>


<<script>
export default {
    name: 'Agendamentos',
    methods: {
        modalFunc2: function () {
            $('#modal2').modal('open');
        },
        alertarCancelar: function () {
            alert("Disciplina cancelada com sucesso!");
            $('#materia1').hide();
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
            
            cell0.appendChild(document.createTextNode(agend[i]));
            cell1.appendChild(document.createTextNode(agend[i+1]));
            cell2.appendChild(document.createTextNode(agend[i+2]));
            cell3.appendChild(document.createTextNode(agend[i+3]));
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