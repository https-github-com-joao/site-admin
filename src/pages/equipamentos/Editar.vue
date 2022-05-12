<template>
  <div class="row">
    <div class="col">
      <div class="card bg-white">
        <div class="card-header bg-gray-100">
          <p class="text-semibold no-margin">
            Equipamento | {{id}}
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
            <div class="form-group col-12 col-md-6">
              <label for="descricao">Descrição</label>
              <input id="descricao" v-model="registro.descricao" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.descricao }">
              <span v-show="errors.descricao != null" class="help-inline">{{ errors.descricao }}</span>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-12 col-md-6">
              <label for="idc_status">Status <sup class="text-danger">* </sup></label>
              <select id="idc_status" v-model="registro.idc_status" style="width: auto" class="form-control" v-bind:class="{ 'box-input-required': errors.idc_status }">
                <option value="1">Central Zanzar</option>
                <option value="2">Em Trânsito</option>
                <option value="3">Disponível no Ponto de Apoio</option>
                <option value="4">Em Utilização</option>
                <option value="5">Inativo</option>
              </select>
              <span v-show="errors.idc_status != null" class="help-inline">{{ errors.idc_status }}</span>
            </div>
            <div class="form-group col-12 col-md-6" v-show="exibirPonto">
              <label for="cd_ponto_apoio">Ponto de Apoio <sup class="text-danger">* </sup></label>
              <select id="cd_ponto_apoio" v-model="registro.cd_ponto_apoio" style="width: auto" class="form-control" v-bind:class="{ 'box-input-required': errors.cd_ponto_apoio }">
                <option v-for="(item, index) in pontos" v-bind:value="item.cd_ponto_apoio" :key="index">{{ item.cd_ponto_apoio }}</option>
              </select>
              <span v-show="errors.cd_ponto_apoio != null" class="help-inline">{{ errors.cd_ponto_apoio }}</span>
            </div>
            <div class="form-group col-12 col-md-6" v-show="exibirMotorista">
              <label for="cd_motorista">Código Motorista <sup class="text-danger">* </sup></label>
              <input id="cd_motorista" v-model="registro.cd_motorista" type="text" class="form-control" v-bind:class="{ 'box-input-required': errors.cd_motorista }">
              <span v-show="errors.cd_motorista != null" class="help-inline">{{ errors.cd_motorista }}</span>
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
import EquipamentoActions from '../../actions/EquipamentoActions'
import PontoApoioActions from '../../actions/PontoApoioActions'
import UUID from '../../helpers/UUID'

export default {
  name: 'editar',
  props: ['id'],
  data () {
    return {
      errorMessage: '',
      errors: {},
      hasError: false,
      registro: {
        cd_player: '',
        descricao: '',
        numero_serial: '',
        idc_status: '',
        mac_address: ''
      },
      pontos: []
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Editar'

    EquipamentoActions.obterEquipamento(this.id)
      .then(res => {
        if (res && res.cd_player) {
          this.registro = res
        } else {
          this.errorMessage = 'Registro não encontrado.'
        }
      })
      .catch((error) => {
        console.log(error.message)
        this.errorMessage = 'Registro não encontrado.'
      })

    PontoApoioActions.listarPontoApoioAtivos()
      .then(res => {
        this.pontos = res
      })
  },
  computed: {
    exibirPonto () {
      return parseInt(this.registro.idc_status) === 3
    },
    exibirMotorista () {
      return parseInt(this.registro.idc_status) === 4
    }
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

      if (parseInt(this.registro.idc_status) === 3 && !this.registro.cd_ponto_apoio) {
        this.errors.cd_ponto_apoio = 'Este campo deve ser preenchido.'
        this.hasError = true
      }

      if (parseInt(this.registro.idc_status) === 4) {
        if (!this.registro.cd_motorista) {
          this.errors.cd_motorista = 'Este campo deve ser preenchido.'
          this.hasError = true
        } else if (!UUID.isValidV4UUID(this.registro.cd_motorista)) {
          this.errors.cd_motorista = 'Código inválido.'
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
          cd_player: this.registro.cd_player,
          descricao: this.registro.descricao,
          numero_serial: this.registro.numero_serial,
          mac_address: this.registro.mac_address,
          idc_status: this.registro.idc_status
        }

        if (parseInt(this.registro.idc_status) === 3) {
          dados.cd_ponto_apoio = this.registro.cd_ponto_apoio
        } else if (parseInt(this.registro.idc_status) === 4) {
          dados.cd_motorista = this.registro.cd_motorista
        }

        EquipamentoActions.alterarEquipamento(dados)
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