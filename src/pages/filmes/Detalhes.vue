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
          <div class="form-group col-12 col-md-6">
            <label for="id">Código: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.id }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="nome">Nome: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.nome }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="sinopse">Sinopse: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.sinopse }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="classificacao">Classificação: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.classificacao }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="dt_estreia">Data de Estreia: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.dt_estreia }}
          </div>
        </div>

        <div class="box-footer text-center">
          <div class="btn-group">
            <button type="button" id="cancelButton" class="btn btn-warning" @click="voltar()">Voltar</button>
            <button type="button" id="editarButton" class="btn btn-info" @click="editar()">Editar</button>
          </div>
        </div>
      </div>

      <br/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import FilmeActions from '../../actions/FilmeActions'
export default {
  name: 'detalhes',
  props: ['id'],
  data () {
    return {
      registro: {
        nome: '',
        sinopse: '',
        classificacao: '',
        dt_estreia: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Detalhes'

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
    editar () {
      this.$router.push('/filme/' + this.id + '/e')
    },
    abrir (nome) {
      this.$router.push('/filme/' + filme)
    },
    formatarData (val) {
      let data = moment.utc(val)
      if (data.isValid()) {
        return data.format('DD/MM/YYYY HH:mm')
      }
      return ''
    }
  }
}
</script>-->
