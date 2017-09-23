<template>
 <div>
    <div class>
      <h4 class="center">Pagina de Impressão</h4>
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
          <tr>
            <td>{{unidadeAgendada}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>

<script>
 import { Dados } from './CadastrarComponents/Dados.js'
import moment from 'moment';
  export default {
    name: 'impressao',
      data(){
          return{
            unidadeAgendada: [],
            dataAgendada: [],
            horarioAgendado: [],
            salaAgendada: [],
            usuario: [],
          }
      },
    methods: function(){ 
      /*Dados.$on('unidade',(teste)=>{
        this.unidadeAgendada = teste;
      })*/       
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


