<template>
    <div>
        <!-- <div class="row">
            <div class="col s8">
                <input type="checkbox" id="exibicao" v-model="estadoCheck"/>
                <label for="exibicao" >Exibir Disponiveis</label>
            </p>
        </div> -->
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
                <tr :id="''+ horario.codigo" v-for="horario in horarios" v-if="horario.disciplina === horario.filtroDisciplina && horario.filtroStatus === true">

                    <td>{{ horario.disciplina }}</td>
                    <td>{{ horario.unidade }}</td>
                    <td>{{ horario.data | dataFormatada }}</td>
                    <td>{{ horario.data | horarioFormatado }}</td>
                    <td>{{ horario.sala }}</td>
                    <td>{{ horario.vagas }}</td>
                    <td>
                        <a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">edit</i></a>
                    </td>
                    <td>
                        <div class = "switch">
                            <label><input type = "checkbox" :checked="horario.status" @change="alterarStatus(horario)"><span class = "lever"></span></label>
                        </div> 
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="row center">
            <ul class="pagination">
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                <li class="active"><a href="#!">1</a></li>
                <li class="waves-effect"><a href="#!">2</a></li>
                <li class="waves-effect"><a href="#!">3</a></li>
                <li class="waves-effect"><a href="#!">4</a></li>
                <li class="waves-effect"><a href="#!">5</a></li>
                <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Dados } from './Dados.js'
    import moment from 'moment';
    import sweetalert from 'sweetalert';
    import {firebase} from '../../Firebase'
    const firebaseDatabase = firebase.database();
    const disciplinasRef = firebaseDatabase.ref('disciplina');

export default {
    data() {
        return {
            horarios: [],
            unidades: '',
            disciplinas: [],
            status: '',
            keys:[],
        };
    },
    mounted: function() {
        var disciplinasPromise = disciplinasRef.once('value');
        disciplinasPromise.then((snapshot) => {
        snapshot.forEach((item) => {               
          this.disciplinas = item.val();
        });
        this.tabelaShow();
        });
    },
    methods: {
        alterarStatus: function(horario,e) {
            horario.status = event.target.checked;
            horario.filtroStatus = horario.status;
            var caminho = firebaseDatabase.ref('disciplina/disciplinas/' + horario.keyDisciplina +
                                               '/unidades/' + horario.keyUnidade + 
                                               '/horarios/' + horario.keyHorario)

            caminho.update({status: horario.status})
        },

        tabelaShow: function() {
            this.horarios.length = 0;

            for ( var k = 0 ; k < this.disciplinas.length ; k++ ) {
                for ( var i = 0 ; i < this.disciplinas[k].unidades.length ; i++ ) {
                    for ( var j = 0 ; j < this.disciplinas[k].unidades[i].horarios.length ; j++ ) {

                        var obj = {
                            keyDisciplina: k,
                            keyUnidade: i,
                            keyHorario: j,
                            filtroDisciplina: this.disciplinas[k].descricao,
                            disciplina: this.disciplinas[k].descricao,
                            unidade: this.disciplinas[k].unidades[i].descrição,
                            data: this.disciplinas[k].unidades[i].horarios[j].data,
                            horario: this.disciplinas[k].unidades[i].horarios[j].data,
                            sala: this.disciplinas[k].unidades[i].horarios[j].sala,
                            vagas: this.disciplinas[k].unidades[i].horarios[j].vagas,
                            status: this.disciplinas[k].unidades[i].horarios[j].status,
                            filtroStatus: this.disciplinas[k].unidades[i].horarios[j].status,
                        }
                        this.horarios.push (obj)
                    }
                }
            }

            Dados.$on('status', (statusHorario) => {
                this.status = statusHorario;
                if (statusHorario) {
                    for (var i = 0 ; i < this.horarios.length ; i++) {
                        this.horarios[i].filtroStatus = true;
                    }
                } else {
                    for (var i = 0 ; i < this.horarios.length ; i++) {
                        this.horarios[i].filtroStatus = this.horarios[i].status;
                    }
                }
            });

            Dados.$on('filtro', (disciplinaFiltrada) => {
                if(disciplinaFiltrada === 'tudo') {
                    for (var i = 0 ; i < this.horarios.length ; i++) {
                        this.horarios[i].filtroDisciplina = this.horarios[i].disciplina;
                    }
                } else {
                    for (var i = 0 ; i < this.horarios.length ; i++) {
                        this.horarios[i].filtroDisciplina = disciplinaFiltrada;
                    }
                }
            });
        },
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

}
</script>