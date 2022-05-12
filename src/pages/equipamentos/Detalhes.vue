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
          <div class="form-group col-12 col-md-6">
            <label for="cd_player">Código Player: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.cd_player }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="numero_serial">Número Serial: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.numero_serial }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="status_desc">Status: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.status_desc }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="mac_address">Número do Frame: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.mac_address ? registro.mac_address : '-' }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="local_atual_desc">Local Atual: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.local_atual_desc }}
          </div>
          <div class="form-group col-12 col-md-6">
            <label for="descricao">Descrição: &nbsp;&nbsp;&nbsp;</label>
            {{ registro.descricao ? registro.descricao : '-' }}
          </div>
          <div class="form-group col-12 col-md-6" v-show="registro.idc_local_atual === 4">
            <label for="local_atual_desc">{{ registro.local_atual_desc }}: &nbsp;&nbsp;&nbsp;</label>
            <a href="#" @click="abrirMotorista(registro.cd_motorista)">{{ registro.motorista ? registro.motorista.nome : '-' }}</a>
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

      <div class="box box-primary">
        <div class="box-header">
          <i class="fas fa-clipboard"></i>
          <h3 class="box-title">Histórico</h3>
        </div>

        <div class="box-body">
          <div class="row">
            <div class="form-group col-4 col-md-4 col-sm-4 col-xs-4"><b>Motorista</b></div>
            <div class="form-group col-2 col-md-2 col-sm-2 col-xs-2"><b>Status</b></div>
            <div class="form-group col-3 col-md-3 col-sm-3 col-xs-3"><b>Criado em</b></div>
            <div class="form-group col-3 col-md-3 col-sm-3 col-xs-3"><b>Alterado em</b></div>
          </div>
          <div class="row" v-for="item in registro.motorista_equipamento" v-bind:key="item.cd_motorista">
            <div class="form-group col-4 col-md-4 col-sm-4 col-xs-4">
              <a href="#" @click="abrirMotorista(item.cd_motorista)">{{ item.motorista ? item.motorista.nome : '-' }}</a>
            </div>
            <div class="form-group col-2 col-md-2 col-sm-2 col-xs-2">
              <span class="label" v-bind:class="{
                'label-success': item.idc_status === 1,
                'label-warning': item.idc_status === 2
              }">{{ item.status_desc }}</span>
            </div>
            <div class="form-group col-3 col-md-3 col-sm-3 col-xs-3">{{ formatarData(item.created_at) }}</div>
            <div class="form-group col-3 col-md-3 col-sm-3 col-xs-3">{{ formatarData(item.updated_at) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import EquipamentoActions from '../../actions/EquipamentoActions'

export default {
  name: 'detalhes',
  props: ['id'],
  data () {
    return {
      registro: {
        cd_player: '',
        descricao: '',
        numero_serial: '',
        idc_status: '',
        mac_address: '',
        status_desc: '',
        local_atual_desc: '',
        cd_centro_distribuicao: '',
        cd_ponto_apoio: '',
        cd_motorista: '',
        idc_local_atual: ''
      }
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = 'Detalhes'

    EquipamentoActions.obterEquipamentoComHistorico(this.id)
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
  },
  methods: {
    voltar () {
      this.$router.push('/equipamentos')
    },
    editar () {
      this.$router.push('/equipamentos/' + this.id + '/e')
    },
    abrirMotorista (motorista) {
      this.$router.push('/motoristas/' + motorista)
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
</script>