<template>
  <div id="agendar">
    <div class="container">
        <div class="explic">
            <p class="center-align" style="font-size: 25px;">Clique numa disciplina abaixo para começar a agendar!</p>
        </div>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li>
                <div class="collapsible-header">Algoritmos 1</div>
                <div class="collapsible-body">
                    <select onchange="horarios()" id="selHorarios" >
                        <option value="" disabled selected>Unidade: </option>
                        <option value="bento" class="red darken-4">Bento Ribeiro</option>
                        <option value="jacare">Jacarépaguá</option>
                        <option value="meier1">Meier 1</option>
                        <option value="meier2">Meier 2</option>
                        <option value="riocomp">Rio Comprido</option>
                    </select>
                    <label>Materialize Select</label>
                    <div class="horarios">
                        <div class="collection">
                            <a href="#modal1" class="collection-item center btn modal-trigger">Data: 01/11/2017 &nbsp; Horário: 07:50 &nbsp; Sala: 201 &nbsp; &nbsp;</a>
                            <a href="#modal1" class="collection-item center btn modal-trigger">Data: 02/11/2017 &nbsp; Horário: 08:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
                            <a href="#modal1" class="collection-item center btn modal-trigger">Data: 03/11/2017 &nbsp; Horário: 09:50 &nbsp; Sala: 301 &nbsp; &nbsp;</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    
    <ul class="collapsible popout" data-collapsible="accordion">
            <li>
                <div class="collapsible-header">Programação</div>
                <div class="collapsible-body">
                    <select onchange="horarios()" id="selHorarios">
                        <option value="" disabled selected>Unidade: </option>
                        <option value="bento">Bento Ribeiro</option>
                        <option value="jacare">Jacarépaguá</option>
                        <option value="meier1">Meier 1</option>
                        <option value="meier2">Meier 2</option>
                        <option value="riocomp">Rio Comprido</option>
                    </select>
                    <label>Materialize Select</label>
                    <div class="horarios">
                        <p style="font-size: 16px">Data: 01/11/2017 &nbsp; Horário: 07:50 &nbsp; Sala: 201 &nbsp; &nbsp; <a class="waves-effect waves-light btn modal-trigger"
                                href="#modal1">Agendar</a></p>
                        <p style="font-size: 16px">Data: 02/11/2017 &nbsp; Horário: 08:50 &nbsp; Sala: 301 &nbsp; &nbsp; <a class="waves-effect waves-light btn modal-trigger"
                                href="#modal1">Agendar</a></p>
                        <p style="font-size: 16px">Data: 03/11/2017 &nbsp; Horário: 09:50 &nbsp; Sala: 301 &nbsp; &nbsp; <a class="waves-effect waves-light btn modal-trigger"
                                href="#modal1">Agendar</a></p>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="collapsible popout" data-collapsible="accordion">
            <li>
                <div class="collapsible-header">Engenharia</div>
                <div class="collapsible-body">
                    <select onchange="horarios()" id="selHorarios">
                        <option value="" disabled selected>Unidade: </option>
                        <option value="bento">Bento Ribeiro</option>
                        <option value="jacare">Jacarépaguá</option>
                        <option value="meier1">Meier 1</option>
                        <option value="meier2">Meier 2</option>
                        <option value="riocomp">Rio Comprido</option>
                    </select>
                    <label>Materialize Select</label>
                    <div class="horarios">
                        <p style="font-size: 16px">Data: 01/11/2017 &nbsp; Horário: 07:50 &nbsp; Sala: 201 &nbsp; &nbsp; <a class="waves-effect waves-light btn modal-trigger"
                                href="#modal1">Agendar</a></p>
                        <p style="font-size: 16px">Data: 02/11/2017 &nbsp; Horário: 08:50 &nbsp; Sala: 301 &nbsp; &nbsp; <a class="waves-effect waves-light btn modal-trigger"
                                href="#modal1">Agendar</a></p>
                        <p style="font-size: 16px">Data: 03/11/2017 &nbsp; Horário: 09:50 &nbsp; Sala: 301 &nbsp; &nbsp; <a class="waves-effect waves-light btn modal-trigger"
                                href="#modal1">Agendar</a></p>
                    </div>
                </div>
            </li>
        </ul>
        <div id="modal1" class="modal">
            <div class="modal-content">
                <h4>Confirmar Disciplina?</h4>
                <p>Ao confirmar irá agendar essa discipina definitivamente e você também concorda com os termos da unicarioca
                    <strike>que incluí vender sua alma</strike>
                </p>
            </div>
            <div class="modal-footer">
                <a onclick="alertar()" href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Confirmar</a>
                <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
            </div>
        </div>
    </div>
  </div>
  
</template>

<script>
 

export default {
  name: 'agendar',
}
</script>
<!-- styling for the component -->
<style>
#about {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
</style>