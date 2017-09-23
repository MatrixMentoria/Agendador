<template>
    <div>
        <table class="highlight centered" v-if="selecao">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Horario</th>
                    <th>Sala</th>
                </tr>
            </thead>
            <tbody>
                <tr class="horarios" v-if="horario.status" v-for="horario in horarios" :key="horario.data" @click="confirmacaoDeAgendamento(disciplina.codigo, disciplina.descricao,unidade.descricao,horario.data,horario.sala)">
                    <td>{{ horario.data | dataFormatada }}</td>
                    <td>{{ horario.data | horarioFormatado }}</td>
                    <td>{{ horario.sala }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import moment from 'moment';
    import sweetalert from 'sweetalert';
    import {firebase} from '../../Firebase'

    const firebaseDatabase = firebase.database();

    export default {
        props: ['horarios','unidade','disciplina','pendente','selecao'],
        data() {
            return {
                disciplinasAgendadasUsuario: [],
            }
        },
        methods: {
            confirmacaoDeAgendamento(codigo,disciplina,unidade,horario,sala){
                var horarioMoment = moment(JSON.parse(horario+'000')).format('DD/MM/YYYY - hh:mm')
                sweetalert({
                    title: 'Confirmar Agendamento?',
                    html: true,
                    text:
                        '<ul>' + 
                            '<li>' + disciplina + '</li>' + 
                            '<li>' + unidade + '</li>' + 
                            '<li>' + horarioMoment + 'h</li>' + 
                            '<li> Sala ' +sala + '</li>' +
                        '</ul>',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Confirmar',
                    closeOnConfirm: false,
                },
                () => {
                    //↓ Cria o objeto que será armazenado no firebase
                    var objDisciplinaAgendada = {
                    disciplinaAgendada: disciplina,
                    unidadeAgendada: unidade,
                    dataAgendada: horario,
                    salaAgendada: sala
                    }
                    firebaseDatabase.ref('usuarios').child(firebase.auth().currentUser.uid).child('disciplinasAgendadas').child(codigo).set(objDisciplinaAgendada);

                    sweetalert({
                        title: 'Confirmado',
                        html: true,
                        closeOnConfirm: true,
                        text: 
                            '<ul>' + 
                                '<li>' + disciplina + '</li>' + 
                                '<li>' + unidade + '</li>' + 
                                '<li>' + horarioMoment + 'h</li>' + 
                                '<li> Sala ' +sala +
                            '</ul>',
                        type: 'success',
                    },
                    () => { this.disciplina.pendente = false;
                          }   
                    );                            
                });
            },
        },
        filters: {
            dataFormatada: function(data) {
                //Precisamos melhorar essa parte. Consegui converter as datas somente
                //a partir de milisegundos. Por isso o '+000'
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
.horarios{
    cursor: pointer;
}
</style>
