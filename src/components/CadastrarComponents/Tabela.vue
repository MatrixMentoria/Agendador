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
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { Dados } from './Dados.js'
    import moment from 'moment';


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

<style></style>
