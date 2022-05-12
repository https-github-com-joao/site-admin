<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
            Filme
          </p>
          <div class="heading-elements">
            <i class="fas fa-long-arrow-alt-left position-left" @click="voltar()" style="cursor: pointer"></i>
          </div>
        </div>

        <div class="box-body">
					<div v-show="errorMessage != ''" class="alert alert-danger">{{ errorMessage }}</div>

          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="nome">Nome <sup class="text-danger">* </sup></label>
              <input id="nome" v-model="registro.nome" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.nome }">
              <span v-show="errors.nome != null" class="help-inline">{{ errors.nome }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="sinopse">Sinopse <sup class="text-danger">* </sup></label>
              <input id="sinopse" v-model="registro.sinopse" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.sinopse }">
              <span v-show="errors.sinopse != null" class="help-inline">{{ errors.sinopse }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="Classificacao">Classificação <sup class="text-danger">* </sup></label>
              <input id="Classificacao" v-model="registro.Classificacao" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.Classificacao }">
              <span v-show="errors.Classificacao != null" class="help-inline">{{ errors.Classificacao }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="dt_estreia">Data nascimento <sup class="text-danger">* </sup></label>
              <input id="dt_estreia" v-model="registro.dt_estreia" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.dt_estreia }">
              <span v-show="errors.dt_estreia != null" class="help-inline">{{ errors.dt_estreia }}</span>
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
import Actions from '../../actions/FilmeActions'

export default {
  name: 'novo',
  data () {
    return {
      errorMessage: '',
      errors: {},
      hasError: false,
      registro: {
        nome: '',
        sinopse: '',
        Classificacao: '',
        dt_estreia: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Novo'
  },
  methods: {
    voltar () {
      this.$router.push('/filme')
    },
    validation () {
      this.errors = {}
      this.hasError = false

      if (!this.registro.nome) {
        this.errors.nome = 'Este campo deve ser preenchido.'
        this.hasError = true
      }

      if (!this.registro.dt_estreia) {
        this.errors.dt_estreia = 'Este campo deve ser preenchido.'
        this.hasError = true
      }
    },
    gravar () {
      this.validation()

      if (!this.hasError) {
        this.$parent.$parent.$data.showModalLoader = true

        Actions.cadastrar(
          this.registro.nome,
          this.registro.sinopse,
          this.registro.Classificacao,
          this.registro.dt_estreia
        )
        .then(response => {
          this.$parent.$parent.$data.showModalLoader = false
          this.$router.push('/filme')
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
