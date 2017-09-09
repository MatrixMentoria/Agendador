<template>
    <div>
    <div>
        <p style="float:right;">
                <input type="checkbox" id="exibicao" v-model="estadoCheck"/>
                <label for="exibicao" >Exibir Disponiveis</label>
        </p>
    </div>
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
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr :id="''+ horario.codigo" v-for="horario in horarios" v-if="horario.disciplina === horario.filtro && horario.status == estadoCheck">
                  
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
    import disciplinasJSON from '../../../dados_json/disciplinascompleto.json'

export default {
    data() {
        return {
            estadoCheck:'',
            horarios: [],
            unidades: '',
            disciplinas: disciplinasJSON.disciplinas,
            status: '',
        };
    },

    methods: {

        alterarStatus: function(horario,e) {
            horario.status = event.target.checked;
            var statusLocalStorage = JSON.parse(localStorage.getItem('status'));
            for (var i = 0 ; i < statusLocalStorage.length ; i++) {
                if( horario.codigo === statusLocalStorage[i].chave) {
                    statusLocalStorage[i].status =  horario.status
                }
            }
            localStorage.setItem('status',JSON.stringify(statusLocalStorage));
        },
        
    },

    mounted: function() {
        // this.horarios.length = 0;
        var statusDisciplinas = [];
        var statusLocalStorage = JSON.parse(localStorage.getItem('status'));

        for ( var k = 0 ; k < this.disciplinas.length ; k++ ) {
            for ( var i = 0 ; i < this.disciplinas[k].unidades.length ; i++ ) {
                for ( var j = 0 ; j < this.disciplinas[k].unidades[i].horarios.length ; j++ ) {
                    
                    var codigoDaDisciplina = k + '-' + i + '-' + j;
                    if (statusLocalStorage) {
                        for( var z = 0 ; z < statusLocalStorage.length ; z++ ) {
                            if( statusLocalStorage[z].chave === codigoDaDisciplina ) {
                                var statusDaDisciplina = statusLocalStorage[z].status
                                break;
                            }
                        }
                    } else {
                        statusDaDisciplina = true;
                    }

                    var obj = {
                        codigo: codigoDaDisciplina,
                        filtro: this.disciplinas[k].descricao,
                        disciplina: this.disciplinas[k].descricao,
                        unidade: this.disciplinas[k].unidades[i].descrição,
                        data: this.disciplinas[k].unidades[i].horarios[j].data,
                        horario: this.disciplinas[k].unidades[i].horarios[j].data,
                        sala: this.disciplinas[k].unidades[i].horarios[j].sala,
                        vagas: this.disciplinas[k].unidades[i].horarios[j].vagas,
                        status: statusDaDisciplina,
                    }
                    this.horarios.push (obj)
                    var objLocal = {
                        chave: obj.codigo,
                        status: obj.status, 
                    }
                    
                    statusDisciplinas.push(objLocal)
                }
            }
        }
        localStorage.setItem('status',JSON.stringify(statusDisciplinas))

        Dados.$on('filtro', (disciplinaFiltrada) => {
            if(disciplinaFiltrada === 'tudo') {
                for (var i = 0 ; i < this.horarios.length ; i++) {
                    this.horarios[i].filtro = this.horarios[i].disciplina;
                }
            } else {
                for (var i = 0 ; i < this.horarios.length ; i++) {
                    this.horarios[i].filtro = disciplinaFiltrada;
                }
            }
        });
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