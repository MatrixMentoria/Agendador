<template>
    <div>
        <table class='highlight striped centered'>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Sala</th>
                    <th>Vagas</th>
                </tr>
            </thead>
            <tbody>
                
                <tr v-for="horario in horarios" v-bind:key="horario.data">
                    <td>{{ horario.data | dataFormatada }}</td>
                    <td>{{ horario.data | horarioFormatado }}</td>
                    <td>{{ horario.sala }}</td>
                    <td>{{ horario.vagas }}</td>
                      <td><i id="botaoEditar"class="large material-icons" @click="editar(horario.data, horario.sala, horario.vagas)">create</i></td>
                      <div class="switch">
                    <label>
                     Off
                     <input type="checkbox">
                     <span class="lever"></span>
                     On
                    </label>
                     </div>
                      
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { Dados } from './Dados.js'
    import moment from 'moment';
    import sweetalert from 'sweetalert';


export default {
    data() {
        return {
            horarios: '',
        };
    },
    mounted: function() {
        Dados.$on('filtro', (horariosFiltrados) => {
            this.horarios = horariosFiltrados
        });
    },
    methods:{
        remover: function(horario, sala, vaga){
            var horarioMoment = moment(JSON.parse(horario+'000')).format('DD/MM/YYYY - hh:mm')
            sweetalert({
                    title: 'Confirmar Exclusao?',
                    html: true,
                    text:
                        '<ul>' + 
                            '<li>' + horarioMoment + '</li>' + 
                            '<li>'+'Sala: ' + sala + '</li>' + 
                            '<li>'+'Vagas: ' + vaga + 'h</li>' + 
                        '</ul>',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Confirmar',
                    closeOnConfirm: false,
                })
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
#botaoEditar{
    font-size: 30px; 
    cursor:pointer; 
    color: #C40018;
}
</style>
