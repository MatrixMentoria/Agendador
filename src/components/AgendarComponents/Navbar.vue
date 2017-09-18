<template>
    <div class="navbar-fixed">
        <nav class="nav-wrapper red darken-4">
            <span class="brand-logo center">Agendamento de Provas</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li id="cadastrarNav"><router-link to="/cadastrar">Cadastrar</router-link></li>
                <li><a @click="logout">Sair</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {firebase} from '../../Firebase'

export default {
    mounted: function() {
        $("#cadastrarNav").hide();
        if (firebase.auth().currentUser) {
            if (firebase.auth().currentUser.displayName == "adm") {
                $("#cadastrarNav").show();   
            }
        }
        $(".button-collapse").sideNav();
    },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(function(){
                window.location.href = "/";
            });
        }
    }
};
</script>

<style>
    #textoAjuda {
        font-size: 25px;
    }
</style>

