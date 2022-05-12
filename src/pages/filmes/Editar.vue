<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
            Filme | {{id}}
          </p>
          <div class="heading-elements">
            <i class="fas fa-long-arrow-alt-left position-left" @click="voltar()" style="cursor: pointer"></i>
          </div>
        </div>

        <div class="box-body">
					<div v-show="errorMessage != ''" class="alert alert-danger">{{ errorMessage }}</div>

          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="id">Código <sup class="text-danger">* </sup></label>
              <input id="id" v-model="registro.id" v-mask="'#.#####'" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.id }">
              <span v-show="errors.id != null" class="help-inline">{{ errors.id }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="nome">Nome<sup class="text-danger">* </sup></label>
              <input id="nome" v-model="registro.nome" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.nome }">
              <span v-show="errors.nome != null" class="help-inline">{{ errors.nome }}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="sinopse">Sinopse</label>
              <input id="sinopse" v-model="registro.sinopse" v-mask="'#.#####'" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.sinopse }">
              <span v-show="errors.sinopse != null" class="help-inline">{{ errors.sinopse }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="classificacao">Classificação</label>
              <input id="classificacao" v-model="registro.classificacao" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.classificacao }">
              <span v-show="errors.classificacao != null" class="help-inline">{{ errors.classificacao }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="dt_estreia">Data de Estreia</label>
              <input id="dt_estreia" v-model="registro.dt_estreia" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.dt_estreia }">
              <span v-show="errors.dt_estreia != null" class="help-inline">{{ errors.dt_estreia}}</span>
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
import FilmeActions from '../../actions/FilmeActions'

export default {
  name: 'editar',
  props: ['id'],
  data () {
    return {
      errorMessage: '',
      errors: {},
      hasError: false,
      registro: {
        nome: '',
        sinopse: '',
        classificacao: '',
        dt_estreia: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Editar'

    FilmeActions.obter(this.id)
      .then(res => {
        if (res && res.id) {
          this.registro = res
        } else {
          this.errorMessage = 'Registro não encontrado.'
        }
      })
      .catch((error) => {
        console.log(error.message)
        this.errorMessage = 'Registro não encontrado.'
      })
  },

  methods: {
    voltar () {
      this.$router.push('/filme')
    },
    validation () {
      this.errors = {}
      this.hasError = false

      if (!this.registro.id) {
        this.errors.id = 'Este campo deve ser preenchido.'
        this.hasError = true
      } else if (this.registro.id) {
        let idFilme = this.registro.id.match(/[\d]+/g).join('')

        if (idFilme.length !== 6) {
          this.errors.id = 'Código inválido.'
          this.hasError = true
        }
      }

      if (!this.registro.nome) {
        this.errors.nome = 'Este campo deve ser preenchido.'
        this.hasError = true
      }

      if (this.registro.sinopse) {
        let sinopse = this.registro.sinopse.match(/[\d]+/g).join('')

        if (sinopse.length !== 6) {
          this.errors.sinopse = 'Sinopse inválido.'
          this.hasError = true
        }
      }

      if (this.registro.classificacao) {
        let classificacaoFilme = this.registro.classificacao.match(/[\d]+/g).join('')

        if (classificacaoFilme.length !== 6) {
          this.errors.classificacao = 'Classificaçao inválido.'
          this.hasError = true
        }
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

        let dados = {
          id: this.id,
          nome: this.registro.nome,
          sinopse: this.registro.sinopse,
          classificacao: this.registro.classificacao,
          dt_estreia: this.registro.dt_estreia
        }

        FilmeActions.alterarAluno(dados)
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
