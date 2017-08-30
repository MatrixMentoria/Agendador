<template>
<navbar></navbar>
</template>

<script>
    import {firebaseauth} from '../FirebaseAuth'
    import Navbar from './Navbar';
    export default {
        name:'cadastrar',
        components: {
        Navbar
        },
        beforeCreate: function() {
            firebaseauth.onAuthStateChanged(function(user) {
                if (!user) {
                alert("deslogado, entre para poder acessar essa página");
                window.location.href = "/";
                }
            });
        }
    }
</script>

<style>

</style>

