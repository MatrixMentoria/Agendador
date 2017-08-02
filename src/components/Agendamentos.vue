<template>
  <div id="agendamentos">
  <div class="container">

        <h1 style="font-size: 30px" class="center-align">Disciplinas Agendadas:</h1>
        <br>
        
        <table class="bordered">
            <thead>
                <tr>
                    <th>Disciplina</th>
                    <th>Unidade</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Sala</th>
                </tr>
            </thead>

            <tbody>
                <tr id="materia1">
                    <td>Algoritmos 1:</td>
                    <td>Rio Comprido</td>
                    <td>01/11/2017</td>
                    <td>07:50</td>
                    <td>306</td>
                    <td><a class="waves-effect waves-light btn red darken-4 modal-trigger" href="#modal2">Cancelar Disciplina</a></td>
                </tr>
                <tr id="materia2">
                    <td>Programação:</td>
                    <td>Méier 2</td>
                    <td>03/11/2017</td>
                    <td>18:50</td>
                    <td>T02</td>
                    <td><a class="waves-effect waves-light btn red darken-4 modal-trigger" href="#modal2">Cancelar Disciplina</a></td>

                </tr>
                <tr id="materia3">
                    <td>Engenharia:</td>
                    <td>Bento Ribeiro</td>
                    <td>07/11/2017</td>
                    <td>21:40</td>
                    <td>101</td>
                    <td><a class="waves-effect waves-light btn red darken-4 modal-trigger" href="#modal2">Cancelar Disciplina</a></td>

                </tr>
            </tbody>
        </table>
        <div id="modal2" class="modal">
            <div class="modal-content">
                <h4>Cancelar Disciplina??</h4>
                <p>Deseja cancelar definitivamente essa disciplina?</p>
            </div>
            <div class="modal-footer">
                <a onclick="alertarcancelar()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Fechar</a>
            </div>
        </div>
        <br>
        <br>
        <br>
        <a style="margin-left: 42%" class=" red darken-4 waves-effect waves-light btn center-align" onclick="window.print();">Imprimir</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'agendamentos'
}
</script>
<!-- styling for the component -->
<style>

</style>