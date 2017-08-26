<template>
    <div>
        <div v-show="pendente">
            <span class="new badge red" data-badge-caption="">Pendente</span>
        </div>
        <div v-show="pendente === false">
            <span class="new badge blue" data-badge-caption="">Agendado</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['pendente'],
    };
</script>
