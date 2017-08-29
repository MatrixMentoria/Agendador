<template>
    <div>
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="#!">First Sidebar Link</a></li>
            <li><a href="#!">Second Sidebar Link</a></li>

            <li>
                <select class="browser-default" v-model="teste" @change="exportaDados">
                    <option value="" disabled>Unidade:</option>
                    <option value="1234AB">Arquitetura de Computadores</option>
                    <option value="1234CD">Banco de Dados I</option>
                    <option value="1234EF">Matemática Discreta</option>
                </select>
            </li>
            <li>
                {{teste}}
            </li>
        </ul>

        <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>

    </div>
</template>

<script>
import { Dados } from './Dados.js'

export default {
    data() {
        return {
            teste: '',
        };
    },
    methods: {
        exportaDados() {
            Dados.$emit('selecao',this.teste);
        },
    },
    mounted: function() {
          $(".button-collapse").sideNav();
    },
  
}
</script>
