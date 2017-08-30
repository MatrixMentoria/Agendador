<template>
    <div class="navbar-fixed">
        <nav class="nav-wrapper red darken-4">
            <span class="brand-logo center">Cadastro</span>
        </nav>
    </div>
</template>

<script>
export default {
    mounted: function() {
        $(".button-collapse").sideNav();
    },
};
</script>

<style>
    #textoAjuda {
        font-size: 25px;
    }
</style>

