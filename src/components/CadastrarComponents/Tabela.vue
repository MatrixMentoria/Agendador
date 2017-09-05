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
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="horario in horarios" v-if="horario.disciplina === disciplinaSelecionada">
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
                        <div class = "switch"><label><input type = "checkbox">
                        <span class = "lever"></span></label></div> 
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
            horarios: [],
            disciplinaSelecionada: '',
            unidades: '',
            disciplinas:''
        };
    },
    mounted: function() {
        this.horarios.length = 0;
        this.disciplinas = disciplinasJSON.disciplinas;

        Dados.$on('filtro', (disciplinaFiltrada) => {
            this.disciplinaSelecionada = disciplinaFiltrada;
            console.log(this.disciplinaSelecionada)
        });
        for ( var k = 0 ; k < this.disciplinas.length ; k++ ) {
            for ( var i = 0 ; i < this.disciplinas[k].unidades.length ; i++ ) {
                for ( var j = 0 ; j < this.disciplinas[k].unidades[i].horarios.length ; j++ ) {
                    this.horarios.push ({
                        disciplina: this.disciplinas[k].descricao,
                        unidade: this.disciplinas[k].unidades[i].descrição,
                        data: this.disciplinas[k].unidades[i].horarios[j].data,
                        horario: this.disciplinas[k].unidades[i].horarios[j].data,
                        sala: this.disciplinas[k].unidades[i].horarios[j].sala,
                        vagas: this.disciplinas[k].unidades[i].horarios[j].vagas,
                        status: this.disciplinas[k].unidades[i].horarios[j].status,
                    })
                }
            }

        }
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

<style>
</style>
