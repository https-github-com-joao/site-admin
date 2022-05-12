<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
            Sala | {{id}}
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
              <label for="descricao">Descrição<sup class="text-danger">* </sup></label>
              <input id="descricao" v-model="registro.descricao" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.descricao }">
              <span v-show="errors.descricao != null" class="help-inline">{{ errors.descricao }}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="duracao">Duraçao</label>
              <input id="duracao" v-model="registro.duracao" v-mask="'#.#####'" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.duracao }">
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
import SalaActions from '../../actions/SalaActions'

export default {
  name: 'editar',
  props: ['id'],
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
    this.$parent.$parent.$data.description = 'Editar'

    SalaActions.obter(this.id)
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
      this.$router.push('/sala')
    },
    validation () {
      this.errors = {}
      this.hasError = false

      if (!this.registro.id) {
        this.errors.id = 'Este campo deve ser preenchido.'
        this.hasError = true
      } else if (this.registro.id) {
        let idSala = this.registro.id.match(/[\d]+/g).join('')

        if (idSala.length !== 6) {
          this.errors.id = 'Código inválido.'
          this.hasError = true
        }
      }

      if (!this.registro.descricao) {
        this.errors.descricao = 'Este campo deve ser preenchido.'
        this.hasError = true
      }

      if (this.registro.duracao) {
        let duracao = this.registro.duracao.match(/[\d]+/g).join('')

        if (duracao.length !== 6) {
          this.errors.duracao = 'duracao inválido.'
          this.hasError = true
        }
      }
    },
    gravar () {
      this.validation()

      if (!this.hasError) {
        this.$parent.$parent.$data.showModalLoader = true

        let dados = {
          id: this.id,
          descricao: this.registro.descricao,
          duracao: this.registro.duracao
        }

        SalaActions.alterar(dados)
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
