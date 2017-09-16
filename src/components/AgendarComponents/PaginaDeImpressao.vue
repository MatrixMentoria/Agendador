<template>
 <div id="teste">
 <div id="modalAdd" class="modal">
    <div class="modal-content" id="bloco">
      <h4 class="center">Pagina de Impressao</h4>
      <table>
        <thead>
          <tr>
              <th>Disciplina</th>
              <th>Unidade</th>
              <th>Data</th>
              <th>Horario</th>
              <th>Sala</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="disciplina in disciplinas" >
            <td>{{disciplina.disciplinaAgendada}}</td>
            <td>{{disciplina.unidadeAgendada}}</td>
            <td>{{disciplina.dataAgendada | dataFormatada}}</td>
            <td>{{disciplina.dataAgendada | horarioFormatado}}</td>
            <td>{{disciplina.salaAgendada}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row center">
            <a class="red darken-4 waves-light btn-large" onclick="print()"><i class="material-icons left">local_printshop</i> Imprimir</a>
    </div>
</div>
 </div>

</template>

<script>
import moment from 'moment';
  export default {
      data(){
          return{
            disciplinas:[],
          }
      },
    created: function(){ 
        var agendamentos = JSON.parse(localStorage.getItem("Agendamentos"));
        this.disciplinas = agendamentos;
        
    },   
     filters: {
            dataFormatada: function(data) {
                var dataParse = JSON.parse(data+'000')
                return moment(dataParse).format('DD/MM/YYYY')
            },
            horarioFormatado: function(data) {
                var dataParse = JSON.parse(data+'000')
                return moment(dataParse).format('hh:mm')
            },
        
    }
  };

</script>
<style>
.modal{
width:100%;
height:100%;
position:absolute;

}
</style>


