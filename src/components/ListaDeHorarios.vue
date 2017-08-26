<template>
    <div>
        <table class="highlight centered">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Horario</th>
                    <th>Sala</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="horario in horarios" :key="horario.data" @click="confirmacaoDeAgendamento(disciplina.descricao,unidade.descrição,horario.data,horario.sala)">
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

    export default {
        props: ['horarios','unidade','disciplina','pendente'],
        methods: {
            confirmacaoDeAgendamento(disciplina,unidade,horario,sala){
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
                    //↓ Cria o objeto que será armazenado no local storage
                    var objDisciplinaAgendada = {
                    disciplinaAgendada: disciplina,
                    unidadeAgendada: unidade,
                    dataAgendada: horario,
                    salaAgendada: sala
                    }
                    //Verifica se já há disciplinas agendadas
                    if(localStorage.getItem("Agendamentos") === null) {
                    //Caso não haja matérias agendadas, insere o objeto em um array e o armazena no local storage
                    var arrayDeAgendamentos = [objDisciplinaAgendada];
                    localStorage.setItem("Agendamentos",JSON.stringify(arrayDeAgendamentos));
                    }
                    else
                    {
                    //Caso haja matérias agendadas, insere o objeto no array já criado
                    var arrayDeAgendamentos = JSON.parse(localStorage.getItem("Agendamentos"));
                    arrayDeAgendamentos.push(objDisciplinaAgendada);
                    localStorage.setItem("Agendamentos",JSON.stringify(arrayDeAgendamentos));
                    }
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
                    () => { this.disciplina.pendente = false; }   
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
