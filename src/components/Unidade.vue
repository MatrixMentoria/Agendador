<template>
    <option>
        {{ unidade.descrição }}
    </option>
</template>

<script>
    import ListaDeUnidades from './ListaDeUnidades'
    export default {
        props: ['disciplina'],
        components: {
            ListaDeUnidades,
        },
    };
</script>
