<template>
 <div>
    <div class="center">
      <h4 class="center">Disciplinas Agendadas</h4>
      <br>
      <table>
        <thead>
          <tr>
              <th>Disciplina</th>
              <th>Unidade</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Sala</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in usuario">
            <td>{{user.disciplinaAgendada}}</td>
            <td>{{user.unidadeAgendada}}</td>
            <td>{{user.dataAgendada | dataFormatada}}</td>
            <td>{{user.dataAgendada | horarioFormatado}}
            <td>{{user.salaAgendada}}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <br>
      <a class="btn-floating btn-large red darken-4" id="btnImprimir" @click="imprimir()">
        <i class="large material-icons">local_printshop</i>
      </a>
    </div>
</div>
</template>

<script>
  import {Dados} from './CadastrarComponents/Dados.js'
  import moment from 'moment';
  import {firebase} from '../Firebase'
  let firebaseDatabase = firebase.database();
  //não é o modo mais correto de se pegar o UID do usuário, mas com a função do firebase fica retornando nulo
  let usuarioUid = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyCGdLFWep-fuAlpc9RterbDSPxtn0SEIHU:[DEFAULT]'));
  let usuarioRef = '';
  if (usuarioUid) {
    usuarioUid = usuarioUid.uid;
    usuarioRef = firebaseDatabase.ref('usuarios').child(usuarioUid).child('disciplinasAgendadas');
  }
  export default {
    name: 'impressao',
    firebase: {
      usuario: usuarioRef
    },
    beforeCreate: function() {
      firebase.auth().onAuthStateChanged(function(user){
       if (!user) {
         window.location.href = "/"
       } else if(user.displayName == "adm") {
          window.location.href = "/cadastrar";
        }
      })
    },
    methods: {
      imprimir: function() {
        $("#btnImprimir").hide();
        window.print();
        $("#btnImprimir").show();
      }
    },
    filters: {
      dataFormatada: function (data) {
        var dataParse = JSON.parse(data + '000')
        return moment(dataParse).format('DD/MM/YYYY')
      },
      horarioFormatado: function (data) {
        var dataParse = JSON.parse(data + '000')
        return moment(dataParse).format('hh:mm')
      },
    }
  };
</script>


