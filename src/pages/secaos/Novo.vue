<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
           Seção
          </p>
          <div class="heading-elements">
            <i class="fas fa-long-arrow-alt-left position-left" @click="voltar()" style="cursor: pointer"></i>
          </div>
        </div>

        <div class="box-body">
					<div v-show="errorMessage != ''" class="alert alert-danger">{{ errorMessage }}</div>

          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="id_sala">Sala<sup class="text-danger">* </sup></label>
              <select id="id_sala" v-model="registro.id_sala" style="width: auto" class="form-control" v-bind:class="{ 'box-input-required': errors.id_sala }">
                <option v-for="(item, index) in salas" v-bind:value="item.id_sala" :key="index">{{ item.descricao }}</option>
              </select>
              <span v-show="errors.id_sala != null" class="help-inline">{{ errors.id_sala}}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="id_filme">Filme<sup class="text-danger">* </sup></label>
              <select id="id_filme" v-model="registro.id_filme" style="width: auto" class="form-control" v-bind:class="{ 'box-input-required': errors.id_filme }">
                <option v-for="(item, index) in filmes" v-bind:value="item.id_filme" :key="index">{{ item.nome }}</option>
              </select>
              <span v-show="errors.id_filme != null" class="help-inline">{{ errors.id_filme }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="enabled">Prenseça<sup class="text-danger">* </sup></label>
              <br/>
              <input type = "checkbox" id="enable" v-model="registro.enable" />
            </div>
          </div>
        </div>

        <div class="box-footer text-center">
          <div class="btn-group">
            <button type="button" id="cancelButton" class="btn btn-warning" @click="voltar()">Cancelar</button>
            <button type="button" id="gravarButton" class="btn btn-success" @click="gravar()">Gravar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SecaoActions from '../../actions/SecaoActions'
import SalaActions from '../../actions/SalaActions'
import FilmeActions from '../../actions/FilmeActions'

export default {
  name: 'novo',
  data () {
    return {
      errorMessage: '',
      errors: {},
      hasError: false,
      registro: {
        id_sala: '',
        id_filme: '',
        enabled: ''
      },
      salas: [],
      filmes: []
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Novo'

    SalaActions.listar()
      .then(res => this.salas = res)
    FilmeActions.listar()
      .then(res => this.filmes = res)
  },
  methods: {
    voltar () {
      this.$router.push('/secao')
    },
    validation () {
      this.errors = {}
      this.hasError = false
    },
    gravar () {
      this.validation()

      if (!this.hasError) {
        this.$parent.$parent.$data.showModalLoader = true

        SecaoActions.cadastrar(
          this.registro.id_sala,
          this.registro.id_filme,
          this.registro.enabled
        )
        .then(response => {
          this.$parent.$parent.$data.showModalLoader = false
          this.$router.push('/secao' + id_filme + '/' + id_sala)
        })
        .catch((error) => {
          console.log(error.message)
          this.errorMessage = 'Ocorreu um erro ao gravar o registro.'
          this.$parent.$parent.$data.showModalLoader = false
        })
      }
    }
  }
}
</script>