<template>
    <div id="filtro">
        <br>
        <div class="container">
            <div class="row">
                <div class="col s6">
                    <select class="browser-default" v-model="selecao.disciplina" @change="exportaDados">
                        <option value="" disabled>Disciplina:</option>
                        <option value="1234AB">Arquitetura de Computadores</option>
                        <option value="1234CD">Banco de Dados I</option>
                        <option value="1234EF">Matemática Discreta</option>
                    </select>
                </div>
                <div class="col s6">
                    <select class="browser-default" v-model="selecao.unidade" @change="exportaDados">
                        <option value="" disabled>Unidade:</option>
                        <option value="1">Unidade1</option>
                        <option value="2">Unidade2</option>
                        <option value="3">Unidade3</option>
                    </select>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import { Dados } from './Dados.js'
  import disciplinasJSON from '../../../dados_json/disciplinascompleto.json'

export default {
    data() {
        return {
            selecao: {
                disciplina: '',
                unidade: '',
            },
            horarios: '',
        };
    },
    methods: {
        exportaDados() {
            this.horarios = disciplinasJSON.disciplinas[0].unidades[0].horarios; //exemplo filtrando a primeira unidade da primeira disciplina
            Dados.$emit('filtro',this.horarios);
        },
    },
}
</script>

<style>
</style>
