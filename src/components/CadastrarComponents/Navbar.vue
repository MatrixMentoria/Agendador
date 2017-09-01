<template>
    <div class="navbar-fixed">
        <nav class="nav-wrapper red darken-4">
            <span class="brand-logo center">Cadastro</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a @click="logout">Sair</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {firebaseauth} from '../../FirebaseAuth'
export default {
    mounted: function() {
        $(".button-collapse").sideNav();
    },
    methods: {
        logout: function() {
            firebaseauth.signOut().then(function(){
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

