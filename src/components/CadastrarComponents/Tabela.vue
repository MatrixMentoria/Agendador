<template>
    <div>
        <table class='highlight striped centered'>
            <thead>
                <tr>
                    <th>Disciplina</th>
                    <th>Unidade</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Sala</th>
                    <th>Vagas</th>
                    <th>Editar</th>
                    <th>Ativo</th>
                </tr>
            </thead>
            <tbody>
                <tr :id="''+ horario.codigo"
                    v-for="horario in horarios" 
                    v-if="horario.disciplina === horario.filtroDisciplina && horario.filtroStatus === true">

                    <td>{{ horario.disciplina }}</td>
                    <td>{{ horario.unidade }}</td>
                    <td>{{ horario.data | dataFormatada }}</td>
                    <td>{{ horario.data | horarioFormatado }}</td>
                    <td>{{ horario.sala }}</td>
                    <td>{{ horario.vagas }}</td>
                    <td>
                        <a class="btn-floating btn-small waves-effect waves-light red modal-trigger" :class="horario.botaoEdicao" href="#modalEdicao" @click="editarCadastro(horario)"><i class="material-icons">edit</i></a>
                    </td>
                    <td>
                        <div class = "switch">
                            <label><input type = "checkbox" :checked="horario.status" @change="alterarStatus(horario, $event)"><span class = "lever"></span></label>
                        </div> 
                    </td>
                </tr>
            </tbody>
        </table>
        <modal-edicao :horario="horarioEditado" :disciplinas="listaDeDisciplinas"></modal-edicao>
    </div>
</template>

<script>
    import {Dados} from './Dados.js'
    import moment from 'moment';
    import sweetalert from 'sweetalert';
    import {firebase} from '../../Firebase'
    const firebaseDatabase = firebase.database();
    const disciplinasRef = firebaseDatabase.ref('disciplinasCadastradas');
    import ModalEdicao from './ModalEdicao'
    
    export default {
      components: {
        ModalEdicao
      },
      data() {
        return {
          horarios: [],
          unidades: '',
          status: '',
          statusGamb: false,
          horarioEditado: '',
          listaDeDisciplinas: [],
          disciplinas: {},
        };
      },
      mounted: function () {
        $('.modal').modal();
        this.horarios.length = 0;
        disciplinasRef.on('value', snapshot => {
          if (!this.statusGamb) {
          this.horarios = [];
          snapshot.forEach((item) => {
            var chaveDisciplina = item.key
            var codDisciplina = item.val().codigo
    
            var listaDisciplina = firebaseDatabase.ref('codigosDisciplinas')
            listaDisciplina.update({
              [codDisciplina]: chaveDisciplina
            })
    
            var chavesUnidades = []
            chavesUnidades = Object.keys(item.val().unidades)
    
            for (var i = 0; i < chavesUnidades.length; i++) {
              var unidadeChild = item.val().unidades[chavesUnidades[i]]
              var chavesHorarios = Object.keys(unidadeChild.horarios)
    
              for (var j = 0; j < chavesHorarios.length; j++) {
                var horarioChild = unidadeChild.horarios[chavesHorarios[j]]
    
                if (horarioChild.status === false) {
                  var botaoEdicao = 'disabled'
                } else {
                  var botaoEdicao = ''
                }
    
                var obj = {
                  keyDisciplina: item.key,
                  keyUnidade: chavesUnidades[i],
                  keyHorario: chavesHorarios[j],
                  filtroDisciplina: item.val().descricao,
                  codigoDisciplina: item.val().codigo,
                  disciplina: item.val().descricao,
                  codigoUnidade: unidadeChild.codigo,
                  unidade: unidadeChild.descricao,
                  data: horarioChild.data,
                  sala: horarioChild.sala,
                  vagas: horarioChild.vagas,
                  status: horarioChild.status,
                  filtroStatus: horarioChild.status,
                  botaoEdicao: botaoEdicao,
                }
                this.horarios.push(obj)
    
              }
            }
          });
          this.filtroTabela();
          }
          this.statusGamb = false;
        })
      },
    
      methods: {
        filtroTabela: function () {
          Dados.$on('status', (statusHorario) => {
            this.status = statusHorario;
            if (statusHorario) {
              for (var i = 0; i < this.horarios.length; i++) {
                this.horarios[i].filtroStatus = true;
              }
            } else {
              for (var i = 0; i < this.horarios.length; i++) {
                this.horarios[i].filtroStatus = this.horarios[i].status;
              }
            }
          });
    
          Dados.$on('filtro', (disciplinaFiltrada) => {
            if (disciplinaFiltrada === 'tudo') {
              for (var i = 0; i < this.horarios.length; i++) {
                this.horarios[i].filtroDisciplina = this.horarios[i].disciplina;
              }
            } else {
              for (var i = 0; i < this.horarios.length; i++) {
                this.horarios[i].filtroDisciplina = disciplinaFiltrada;
              }
            }
          });
        },

        alterarStatus: function (horario, event) {
          this.statusGamb = true;
          horario.status = event.target.checked;
          horario.filtroStatus = horario.status;
          if (horario.status === false) {
            horario.botaoEdicao = 'disabled'
          } else {
            horario.botaoEdicao = ''
          }

          var caminho = firebaseDatabase.ref('disciplinasCadastradas').child(horario.keyDisciplina)
                                                                      .child('unidades')
                                                                      .child(horario.keyUnidade)
                                                                      .child('horarios')
                                                                      .child(horario.keyHorario)

          caminho.update({
            status: horario.status
          })
        },
    
        editarCadastro: function (horario) {
          this.horarioEditado = horario;
        },
      },
    
      filters: {
        dataFormatada: function (data) {
          var dataParse = JSON.parse(data)
          return moment(dataParse).format('DD/MM/YYYY')
        },
        horarioFormatado: function (data) {
          var dataParse = JSON.parse(data)
          return moment(dataParse).format('HH:mm')
        },
      }
    
    } 
</script>
