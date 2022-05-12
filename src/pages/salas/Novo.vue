<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
            Sala
          </p>
          <div class="heading-elements">
            <i class="fas fa-long-arrow-alt-left position-left" @click="voltar()" style="cursor: pointer"></i>
          </div>
        </div>

        <div class="box-body">
					<div v-show="errorMessage != ''" class="alert alert-danger">{{ errorMessage }}</div>

          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="descricao">Descrição <sup class="text-danger">* </sup></label>
              <input id="descricao" v-model="registro.descricao" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.descricao }">
              <span v-show="errors.descricao != null" class="help-inline">{{ errors.descricao }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="duracao">Duração <sup class="text-danger">* </sup></label>
              <input id="duracao" v-model="registro.duracao" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.duracao }">
              <span v-show="errors.duracao != null" class="help-inline">{{ errors.duracao }}</span>
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
import Actions from '../../actions/SalaActions'

export default {
  name: 'novo',
  data () {
    return {
      errorMessage: '',
      errors: {},
      hasError: false,
      registro: {
        descricao: '',
        duracao: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Novo'
  },
  methods: {
    voltar () {
      this.$router.push('/sala')
    },
    validation () {
      this.errors = {}
      this.hasError = false

      if (!this.registro.descricao) {
        this.errors.descricao = 'Este campo deve ser preenchido.'
        this.hasError = true
      }

      if (!this.registro.duracao) {
        this.errors.duracao = 'Este campo deve ser preenchido.'
        this.hasError = true
      }
    },
    gravar () {
      this.validation()

      if (!this.hasError) {
        this.$parent.$parent.$data.showModalLoader = true

        Actions.cadastrar(
          this.registro.descricao,
          this.registro.duracao
        )
        .then(response => {
          this.$parent.$parent.$data.showModalLoader = false
          this.$router.push('/sala')
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
