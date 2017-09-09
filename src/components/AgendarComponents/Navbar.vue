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
import sMDAJSON from '../../sMDA.json'

export default {
    data() {
      return {
        smdajson: sMDAJSON,
      }
    },
    mounted: function() {
        $("#cadastrarNav").hide();
        $(".button-collapse").sideNav();
        var smdaLenght = Object.keys(this.smdajson.smda).length;
        var smdaFirebase = this.smdajson;
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
            window.location.href = "/";
            }
            for (var i = 0; i < smdaLenght; i++) {
              if (user.uid == smdaFirebase.smda[i].smdaCode){
                  $("#cadastrarNav").show();
              }
            }
        });
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

