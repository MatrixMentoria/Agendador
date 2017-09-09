<template>
    <div id="filtro">
        <br>
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">school</i>
                            <input type="text" id="autocomplete-input" class="autocomplete" v-model='disciplinaSelecionada'>
                            <label for="autocomplete-input">Disciplina</label>
                        </div>
                    </div>
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
            disciplinas: [],
            disciplinaSelecionada: '',
        };
    },
    mounted: function() {
       var disciplinasPromise = disciplinasRef.once('value');
        disciplinasPromise.then((snapshot) => {
        snapshot.forEach((item) => {               
          this.disciplinas = item.val();
        });
        this.autoComplete();          
      });
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
        }
    }
};
</script>

<style>
</style>
