<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
            Equipamento
          </p>
          <div class="heading-elements">
            <i class="fas fa-long-arrow-alt-left position-left" @click="voltar()" style="cursor: pointer"></i>
          </div>
        </div>

        <div class="box-body">
					<div v-show="errorMessage != ''" class="alert alert-danger">{{ errorMessage }}</div>

          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="cd_player">Código Player <sup class="text-danger">* </sup></label>
              <input id="cd_player" v-model="registro.cd_player" v-mask="'#.#####'" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.cd_player }">
              <span v-show="errors.cd_player != null" class="help-inline">{{ errors.cd_player }}</span>
            </div>
            <div class="form-group col-12 col-md-6">
              <label for="numero_serial">Número Serial <sup class="text-danger">* </sup></label>
              <input id="numero_serial" v-model="registro.numero_serial" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.numero_serial }">
              <span v-show="errors.numero_serial != null" class="help-inline">{{ errors.numero_serial }}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="mac_address">Número do Frame</label>
              <input id="mac_address" v-model="registro.mac_address" v-mask="'#.#####'" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.mac_address }">
              <span v-show="errors.mac_address != null" class="help-inline">{{ errors.mac_address }}</span>
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
import Actions from '../../actions/EquipamentoActions'

export default {
  name: 'novo',
  data () {
    return {
      errorMessage: '',
      errors: {},
      hasError: false,
      registro: {
        cd_player: '',
        numero_serial: '',
        mac_address: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Novo'
  },
  methods: {
    voltar () {
      this.$router.push('/equipamentos')
    },
    validation () {
      this.errors = {}
      this.hasError = false

      if (!this.registro.cd_player) {
        this.errors.cd_player = 'Este campo deve ser preenchido.'
        this.hasError = true
      } else if (this.registro.cd_player) {
        let cdPlayer = this.registro.cd_player.match(/[\d]+/g).join('')

        if (cdPlayer.length !== 6) {
          this.errors.cd_player = 'Código Player inválido.'
          this.hasError = true
        }
      }

      if (!this.registro.numero_serial) {
        this.errors.numero_serial = 'Este campo deve ser preenchido.'
        this.hasError = true
      }

      if (this.registro.mac_address) {
        let macAddress = this.registro.mac_address.match(/[\d]+/g).join('')
        if (macAddress.length !== 6) {
          this.errors.mac_address = 'Número do Frame inválido.'
          this.hasError = true
        }
      }
    },
    gravar () {
      this.validation()

      if (!this.hasError) {
        this.$parent.$parent.$data.showModalLoader = true

        Actions.cadastrarEquipamento({
          cd_player: this.registro.cd_player,
          numero_serial: this.registro.numero_serial,
          mac_address: this.registro.mac_address
        })
        .then(response => {
          this.$parent.$parent.$data.showModalLoader = false
          this.$router.push('/equipamentos')
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