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
    import { Dados } from './Dados.js'
    import moment from 'moment';
    import sweetalert from 'sweetalert';
    import {firebase} from '../../Firebase'
    const firebaseDatabase = firebase.database();
    const disciplinasRef = firebaseDatabase.ref('disciplina');
    import ModalEdicao from './ModalEdicao'

export default {
    components: {
        ModalEdicao
    },
    data() {
        return {
            horarios: [],
            unidades: '',
            disciplinas: [],
            status: '',
            horarioEditado: '',
            listaDeDisciplinas: []
        };
    },

    mounted: function() {
        $('.modal').modal();
        var disciplinasPromise = disciplinasRef.once('value');
        disciplinasPromise.then((snapshot) => {
        snapshot.forEach((item) => {               
          this.disciplinas = item.val();
        });
        this.tabelaShow();
        });
    },

    methods: {  
        alterarStatus: function(horario,event) {

            horario.status = event.target.checked;
            horario.filtroStatus = horario.status;
            if ( horario.status === false ) {
                horario.botaoEdicao = 'disabled'
            } else {
                horario.botaoEdicao = ''
            }

            var caminho = firebaseDatabase.ref('disciplina/disciplinas/' + horario.keyDisciplina +
                                               '/unidades/' + horario.keyUnidade + 
                                               '/horarios/' + horario.keyHorario)

            caminho.update({status: horario.status})
        },

        editarCadastro: function(horario) {
            this.horarioEditado = horario;
        },

        tabelaShow: function() {
            this.horarios.length = 0;
            this.listaDeDisciplinas.length = 0;

            var chaveDisciplina = Object.keys(this.disciplinas);
                                        
            for ( var k = 0 ; k < this.disciplinas.length ; k++ ) {
                var novaDisciplina = {
                    codigoDisciplina: this.disciplinas[k].codigo,
                    descricaoDisciplina: this.disciplinas[k].descricao,
                    professorDisciplina: this.disciplinas[k].professor,
                    keyDisciplina: chaveDisciplina,
                }
                this.listaDeDisciplinas.push(novaDisciplina)
                var chaveUnidade = Object.keys(this.disciplinas[k].unidades);
                
                
                for ( var i = 0 ; i < this.disciplinas[k].unidades.length ; i++ ) {
                        var chaveHorario = Object.keys(this.disciplinas[k].unidades[i].horarios);

                    for ( var j = 0 ; j < this.disciplinas[k].unidades[i].horarios.length ; j++ ) {
                        if ( this.disciplinas[k].unidades[i].horarios[j].status === false ) {
                            var botaoEdicao = 'disabled'
                        } else {
                            var botaoEdicao = ''
                        }

                        var obj = {
                            keyDisciplina: chaveDisciplina[k],
                            keyUnidade: chaveUnidade[i],
                            keyHorario: chaveHorario[j],
                            filtroDisciplina: this.disciplinas[k].descricao,
                            codigoDisciplina: this.disciplinas[k].codigo,
                            disciplina: this.disciplinas[k].descricao,
                            codigoUnidade: this.disciplinas[k].unidades[i].codigo,
                            unidade: this.disciplinas[k].unidades[i].descrição,
                            data: this.disciplinas[k].unidades[i].horarios[j].data,
                            sala: this.disciplinas[k].unidades[i].horarios[j].sala,
                            vagas: this.disciplinas[k].unidades[i].horarios[j].vagas,
                            status: this.disciplinas[k].unidades[i].horarios[j].status,
                            filtroStatus: this.disciplinas[k].unidades[i].horarios[j].status,
                            botaoEdicao: botaoEdicao,
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