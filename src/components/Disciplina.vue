<template>
    <div class="col s12 m12 l12">
        <ul class="collapsible" data-collapsible="acordion">
            <li>
                <div class="collapsible-header">
                    <badge :pendente.sync="pendente"></badge>
                    {{ disciplina.descricao }}
                </div>
                <div class="collapsible-body center" v-if="pendente">
                    <lista-de-unidades :unidades="disciplina.unidades" :disciplina="disciplina"></lista-de-unidades>
                </div>
                <div v-else>
                    <h5 class="center"><strong>Prova Agendada</strong></h5>
                    <table class="highlight centered">
                        <thead>
                            <tr>
                                <th>Unidade</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Sala</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ unidadeAgendada }}</td>
                                <td>{{ dataAgendada }}</td>
                                <td>{{ horarioAgendado }}</td>
                                <td>{{ salaAgendada }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <div class="row center">
                        <a @click="cancelarDisciplina(disciplina.descricao)" class='red darken-4 waves-effect waves-light btn'>Cancelar Agendamento</a>
                    </div>
                    <br>
                </div>
            </li>

        </ul>

    </div>
</template>

<script>
    import moment from 'moment';
    import ListaDeUnidades from './ListaDeUnidades';
    import Badge from './Badge';
    import sweetalert from 'sweetalert';

    export default {
        props: ['disciplina'],
        components: {
            ListaDeUnidades,
            Badge,
        },
        data() {
            return {
                pendente: '',
                dataAgendada: '',
                unidadeAgendada: '',
                dataAgendada: '',
                horarioAgendado: '',
                salaAgendada: '',
            }
        },
        mounted: function() {
            $('.collapsible').collapsible();
            $('select').material_select();
            this.pendente = true;
            var agendamentos = JSON.parse(localStorage.getItem("Agendamentos"));
            if (agendamentos) {
                var qtd = agendamentos.length;
                for( var i = 0 ; i < qtd ; i++ ) {
                    if (this.disciplina.descricao == agendamentos[i].disciplinaAgendada) {
                        this.pendente = false;
                        this.unidadeAgendada = agendamentos[i].unidadeAgendada;
                        this.dataAgendada = moment(JSON.parse(agendamentos[i].dataAgendada+'000')).format('DD/MM/YYYY');
                        this.horarioAgendado = moment(JSON.parse(agendamentos[i].dataAgendada+'000')).format('hh:mm');
                        this.salaAgendada = agendamentos[i].salaAgendada;
                        break;
                    }
                }
            }
        },
        methods: {
            cancelarDisciplina: function(disciplina) {
                // var horarioMoment = moment(JSON.parse(horario+'000')).format('DD/MM/YYYY - hh:mm') -->
                sweetalert({

                    title: 'Cancelar Agendamento?',
                    html: true,
                    text:
                        '<ul>' + 
                            '<li>' + disciplina + '</li>' + 
                            '<li>' + this.unidadeAgendada + '</li>' + 
                            '<li>' + this.dataAgendada + '</li>' + 
                            '<li>' + this.horarioAgendado + 'h</li>' + 
                            '<li> Sala ' + this.salaAgendada + '</li>' +
                        '</ul>',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Confirmar Cancelamento',
                    closeOnConfirm: true,
                },
                () => {
                    var disciplinasAgendadas = JSON.parse(localStorage.getItem("Agendamentos")); // puxa os dados do local storage para a variável disciplinasAgendadas
                    var qtdDeDisciplinas = disciplinasAgendadas.length;
                    for (var i = 0; i < qtdDeDisciplinas; i++) {
                        if (disciplinasAgendadas[i].disciplinaAgendada === disciplina) {
                        disciplinasAgendadas.splice(i, 1);
                        break;
                        };
                    };
                    localStorage.setItem("Agendamentos", JSON.stringify(disciplinasAgendadas)); // salva novamente no local storage sobrescrevendo o que está lá
                    location.reload()   // Melhorar isso!! Recarregando a página. Precisamos ver como usar computed.
                });
            },
        },
    };
</script>
