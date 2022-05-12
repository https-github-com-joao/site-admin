<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
            Seção | {{id_filme + '/' + id_sala}}
          </p>
          <div class="heading-elements">
            <i class="fas fa-long-arrow-alt-left position-left" @click="voltar()" style="cursor: pointer"></i>
          </div>
        </div>

        <div class="box-body">
          <div class="form-group col-12 col-md-6">
            <label for="id_sala">Sala: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.sala_descricao }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="id_filme">Filme: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.filme_nome }}
          </div>
           <div class="form-group col-12 col-md-6">
            <label for="enabled"> presenças: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.enabled ? 'presente' : 'ausente'}}
          </div>
        </div>

        <div class="box-footer text-center">
          <div class="btn-group">
            <button type="button" id="cancelButton" class="btn btn-warning" @click="voltar()">Voltar</button>
            <button type="button" id="editarButton" class="btn btn-info" @click="editar()">Editar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SecaoActions from '../../actions/SecaoActions'

export default {
  name: 'detalhes',
  props: ['id_filme', 'id_sala'],
  data () {
    return {
      registro: {
        sala_descricao: '',
        filme_nome: '',
        idc_presenca: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Detalhes'

    SecaoActions.obter(this.id_filme, this.id_sala)
      .then(res => {
        if (res && res.sala_descricao) {
          this.registro = res
        } else {
          this.errorMessage = 'Registro não encontrado.'
        }
      })
      .catch((error) => {
        console.log(error.message)
        this.errorMessage = 'Registro não encontrado.'
      })

      .then(res => {
        if (res && res.filme_nome) {
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
      this.$router.push('/secao')
    },
    editar () {
      this.$router.push('/secao/' + this.id_filme + '/' + this.id_sala + '/e')
    }
  }
}
</script>
