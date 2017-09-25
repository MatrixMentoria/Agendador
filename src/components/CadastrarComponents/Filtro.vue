<template>
    <div id="filtro">
        <br>
            <div class="row">
                <div class="container">
                <div class="input-field col s8">
                    <i class="material-icons prefix">school</i>
                    <input type="text" id="autocomplete-input" class="autocomplete" v-model='disciplinaSelecionada'>
                    <label for="autocomplete-input">Filtro de Disciplinas</label>
                </div>
                <div class="input-field col s4">
                    <input type="checkbox" id="exibicao" v-model="status" @change="emitirCheckbox()"/>
                    <label for="exibicao" >Exibir Indisponíveis</label>
                </div>
                </div>
            </div>

    </div>
</template>

<script>
    import { Dados } from './Dados.js'
    import {firebase} from '../../Firebase'
    const firebaseDatabase = firebase.database();

export default {
    data() {
        return {
            status: '',
            disciplinas: [],
            disciplinaSelecionada: '',
        };
    },
    mounted: function() {
       firebaseDatabase.ref('disciplinas').once('value').then(disciplina => {
         var self = this;
         disciplina.forEach((discip) => {
           self.disciplinas.push(discip.val());
         });
         this.autoComplete();
       })
    },
    methods: {
        autoComplete: function() {
            var listaParaAutoComplete = {};
            for ( var i = 0 ; i < this.disciplinas.length ; i++ ) {
                listaParaAutoComplete[this.disciplinas[i].descricao] = null
            }
            $(() => {
                $('input.autocomplete').autocomplete({
                    data: listaParaAutoComplete,
                    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                    onAutocomplete: function(val) {
                        Dados.$emit('filtro',val);
                    },
                    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                });
            });
        },

        emitirCheckbox: function(status) {
            Dados.$emit('status', this.status);
        }
    },
    watch: {
        disciplinaSelecionada: function() {
            Dados.$emit('filtro','tudo');
        }
    }
};
</script>

<style>
</style>
