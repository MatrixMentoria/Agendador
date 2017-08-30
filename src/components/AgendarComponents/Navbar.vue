<template>
    <div class="navbar-fixed">
        <nav class="nav-wrapper red darken-4">
            <span class="brand-logo center">Agendamento de Provas</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a onclick="window.print()">Imprimir Comprovante</a></li>
            </ul>
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

