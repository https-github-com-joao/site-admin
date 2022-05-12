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
          <div class="form-group col-12 col-md-6">
            <label for="id">Código: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.id }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="descricao">Descrição: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.descricao }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="duracao">Duração: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.duracao }}
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
import SalaActions from '../../actions/SalaActions'
export default {
  name: 'detalhes',
  props: ['id'],
  data () {
    return {
      registro: {
        descricao: '',
        duração: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Detalhes'

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
    editar () {
      this.$router.push('/sala/' + this.id + '/e')
    },
    abrir (nome) {
      this.$router.push('/sala/' + sala)
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
