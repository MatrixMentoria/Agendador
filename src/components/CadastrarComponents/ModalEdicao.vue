<template>
  <div id="modalEdicao" class="modal">
    <div class="modal-content">
      <h4 class="center">Edição de Cadastro</h4>

      <div class="row">
        <form class="col s12" @submit.prevent="salvarCadastro">

            <div class="row">
              <div class="input-field col s6">
                <select class="browser-default" v-model="cadastroEditado.codigoDisciplina">
                  <option value="" disabled>Disciplina</option>
                  <option v-for="disciplina in disciplinas"
                          :value="disciplina.codigo"
                          :key="disciplina.codigo">{{disciplina.descricao}}</option>
                </select>
              </div>
              <div class="input-field col s6">
                <select class="browser-default" v-model="cadastroEditado.codigoUnidade">
                  <option value="" disabled>Disciplina</option>
                  <option value="A">Unidade Jacarepaguá</option>
                  <option value="B">Unidade Méier</option>
                  <option value="C">Unidade Rio Comprido</option>
                  <option value="D">Unidade Bento Ribeiro</option>
                  <option value="E">Unidade Méier II</option>
                  </option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="data" type="text" class="datepicker" v-model="cadastroEditado.dataFormatada">
                <label for="data" class="active">Data</label>
              </div>
              <div class="input-field col s6">
                <input id="horario" type="text" class="timepicker" v-model="cadastroEditado.horarioFormatado">
                <label for="horario" class="active">Horario</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s6">
                <input id="sala" type="text" class="validate"  v-model="cadastroEditado.sala" :value="cadastroEditado.sala">
                <label for="sala" class="active">Sala</label>
              </div>
              <div class="input-field col s6">
                <input id="vagas" type="text" class="validate" v-model="cadastroEditado.vagas" :value="cadastroEditado.vagas">
                <label for="vagas" class="active">Vagas</label>
              </div>
            </div>

            <div class="row center">
              <div class="switch">
                <label>
                  Inativo
                  <input type="checkbox" :checked="cadastroEditado.status">
                  <span class="lever"></span>
                  Ativo
                </label>
              </div>
            </div>

            <div class="row center">
                <button class="modal-action modal-close btn red darken-4" type="submit" name="action" >Salvar</button>
            </div>
        </form>

      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment';
  import {firebase} from '../../Firebase'
  const firebaseDatabase = firebase.database();
  const disciplinasRef = firebaseDatabase.ref('test2');
  // import 'moment/locale/pt-br' - o pickadate.js no materialize só funciona em ingles

  export default {
    props: [ 'horario'],

    data: function(){
      return {
        cadastroAntigo: [],
        disciplinas: [],
        hora: '',
        data: '',
        listaDeUnidades : [],
        cadastroEditado: {
          keyDisciplina: '',
          keyUnidade: '',
          keyHorario: '',
          codigoDisciplina: '',
          codigoUnidade: '',
          disciplina: '',
          unidade: '',
          data: '',
          dataFormatada: '',
          horarioFormatado: '',
          sala: '',
          vagas: '',
          status: '',
        }
      }
    },

  mounted: function() {
    var disciplinasPromise = disciplinasRef.once('value');
    disciplinasPromise.then((snapshot) => {
      snapshot.forEach((item) => {               
        this.disciplinas = item.val();
      });
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Ok',
        closeOnSelect: true // Close upon selecting a date,
      });

      $('.timepicker').pickatime({
        default:  'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Limpar', // text for clear-button
        canceltext: 'Cancelar', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true // make AM PM clickable
      });
    });
  },  


    methods: {
      salvarCadastro: function(){

        var velho = this.horario;
        var novo = this.cadastroEditado;

        var keyDisciplinaAntiga = velho.keyDisciplina
        var keyUnidadeAntiga = velho.keyUnidade
        var keyHorarioAntigo = velho.keyHorario

        // var horarioAntigo = this.disciplinas.keyDisciplinaAntiga.unidades.keyUnidade.horarios.keyHorarioAntigo

        var disciplinasPromise = disciplinasRef.once('value');
        disciplinasPromise.then((snapshot) => {
          snapshot.forEach((item) => {
            this.cadastroAntigo = item.val();
          });
        })

        console.log(this.velho['keyDisciplinaAntiga'])
        



        // var caminhoVelho =  firebaseDatabase.ref('test2').child(velho.keyDisciplina)
        //                                                   .child('unidades')
        //                                                   .child(velho.keyUnidade)
        //                                                   .child('horarios')
        //                                                   .child(velho.keyHorario)

        // console.log(velho)
        // console.log(novo)

        // var x = novo.dataFormatada + ' ' + novo.horarioFormatado
        // var y = Date.parse(x)
        // console.log(x)
        // console.log(y)

        // if ( firebaseDatabase.ref('test2').child(novo.keyDisciplina)) {
        //   console.log('existe')
        // } else {
        //   console.log('não existe')
        // }
        // var caminhoNovo = firebaseDatabase.ref('disciplinas').child(novo.keyDisciplina)
        //                                                    .child('unidades')
        //                                                    .child(novo.keyUnidade)
        //                                                    .child('horarios')
        //                                                    .child(novo.keyHorario)


        // var caminho = firebaseDatabase.ref('test/disciplinas/' + velho.keyDisciplina +
        //                                        '/unidades/' + velho.keyUnidade + 
        //                                        '/horarios/' + velho.keyHorario)

        // caminho.remove() EXCLUI O HORÁRIO DO FIREBASE

      }
    },


    watch: {
      horario: function() {
        this.cadastroEditado = {
          keyDisciplina: this.horario.keyDisciplina,
          keyUnidade: this.horario.keyUnidade,
          keyHorario: this.horario.keyHorario,
          disciplina: this.horario.disciplina,
          unidade: this.horario.unidade,
          codigoDisciplina: this.horario.codigoDisciplina,
          codigoUnidade: this.horario.codigoUnidade,
          data: this.horario.data,
          sala: this.horario.sala,
          vagas: this.horario.vagas,
          status: this.horario.status,
        }

        var dataParse = JSON.parse(this.horario.data)
        this.cadastroEditado.horarioFormatado = moment(dataParse).format('hh:mm')
        this.cadastroEditado.dataFormatada = moment(dataParse).format('DD MMMM, YYYY')
      },
    },
  };

</script>

<style>
    #modalEdicao {
        width:70%;
        overflow: hidden;
    }

</style>

