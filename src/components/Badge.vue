<template>
    <div>
        <div v-if="pendente">
            <span class="new badge red" data-badge-caption="">Pendente</span>
        </div>
        <div v-else>
            <span class="new badge blue" data-badge-caption="">Agendado</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['pendente'],
    };
</script>
