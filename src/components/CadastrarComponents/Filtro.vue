<template>
    <div id="filtro">
        <br>
        <div class="container">
            <div class="row">
                <div class="col s6">
                    <select class="browser-default"  v-model="unidades">
                        <option value="" disabled>Disciplina:</option>
                        <option v-for="disciplina in disciplinas" :key="disciplina.horarios" v-bind:value="disciplina.unidades">{{ disciplina.descricao }}</option>
                    </select>
                </div>
                <div class="col s6">
                    <select class="browser-default" v-model="horarios" @change="exportaDados">
                        <option value="" disabled>Unidade:</option>
                        <option v-for="unidade in unidades" :key="unidade.codigo" v-bind:value="unidade.horarios">{{ unidade.descrição }}</option>
                    </select>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    import { Dados } from './Dados.js'
    import {firebase} from '../../Firebase'

    const firebaseDatabase = firebase.database();
    const disciplinasRef = firebaseDatabase.ref('agendamentos');

export default {
    data() {
        return {
            disciplinas: '',
            unidades: '',
            horarios: '',
        };
    },
    mounted: function() {
        var disciplinasPromise = disciplinasRef.once('value');
        disciplinasPromise.then((snapshot) => {
        snapshot.forEach((item) => {               
          this.disciplinas = item.val();
          this.disciplinas.forEach((item)=> {
            this.$set(item,'pendente',true);
          })
        });             
      });
    },
    methods: {
        exportaDados() {
            Dados.$emit('filtro',this.horarios);
        },
    },
};
</script>