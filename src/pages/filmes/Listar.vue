<template>
  <div class="box">
    <div class="box-header">
      <div class="col-6 col-md-6 col-sm-8 col-xs-8">
        <div class="box-tools">
          <div class="input-group input-group-sm div-pesquisa">
            <input v-model="filterText" @keyup.enter="doFilter" type="text" class="form-control pull-right" placeholder="Pesquisar...">
            <div class="input-group-btn">
              <button type="button" class="btn btn-info" @click="doFilter"><i class="fa fa-search"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-6 col-sm-4 col-xs-4 div-btn-novo">
        <button class="btn btn-sm btn-default btn-novo" @click="atualizar()" style="width: 33px" data-tooltip="Atualizar"><i class="fa fa-refresh" aria-hidden="true"></i></button>
        &nbsp;
        <button class="btn btn-sm btn-primary btn-novo" @click="novo()" style="width: 33px" data-tooltip="Novo"><i class="fa fa-plus" aria-hidden="true"></i></button>
        &nbsp;
        <export-excel
          :fields = "listaExcelFields"
          :fetch = "gerarExcel"
          type = "xls"
          worksheet = "salas"
          name = "zanzar-salas.xls"
          class="btn btn-sm btn-primary btn-novo" style="width: 33px"
          data-tooltip="Exportar Excel"
        ><i class="fa fa-file-excel"></i></export-excel>
      </div>
    </div>

    <vuetable ref="vuetable"
      :api-url="urlApi"
      :http-options="httpOptions"
      :fields="fields"
      :sort-order="sortOrder"
      :css="css.table"
      pagination-path=""
      :per-page="25"
      :append-params="moreParams"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:loading="onLoading"
      @vuetable:loaded="onLoaded"
      no-data-template="Nenhum registro encontrado"
    >
      <template slot="status_desc" slot-scope="props">
        <span class="label" v-bind:class="{
            'label-default': props.rowData.idc_status === 1,
            'label-warning': props.rowData.idc_status === 2,
            'label-info': props.rowData.idc_status === 3,
            'label-success': props.rowData.idc_status === 4,
            'label-danger': [5,9].includes(props.rowData.idc_status)
          }">{{ props.rowData.status_desc }}</span>
      </template>
      <template slot="actions" slot-scope="props">
        <div class="table-button-container" style="text-align: center">
          <div class="btn-group">
            <a @click="view(props.rowData)" class="btn btn-sm btn-success legitRipple" data-tooltip="Abrir" data-delay="500" data-hasqtip="0" aria-describedby="qtip-0"><span class="glyphicon glyphicon-eye-open"></span></a>
            <a @click="editar(props.rowData)" class="btn btn-sm btn-warning legitRipple" data-tooltip="Editar" data-delay="500" data-hasqtip="0" aria-describedby="qtip-0"><span class="glyphicon glyphicon-pencil"></span></a>
            <a @click="excluir(props.rowData)" class="btn btn-sm btn-danger legitRipple" data-tooltip="Remover" data-delay="500" data-hasqtip="1"><span class="glyphicon glyphicon-trash"></span></a> 
          </div>
        </div>
      </template>
    </vuetable>
    <div class="row vuetable-pagination ui basic segment grid" style="padding: 10px">
      <vuetable-pagination-info ref="paginationInfo"
        :css="css.pagination"
        info-template="Exibindo {from} - {to} de {total}"
        no-data-template="" />

      <vuetable-pagination ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage"
        style="margin: 0" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Vuetable, VuetablePagination, VuetablePaginationInfo } from 'vuetable-2'
import VuetableCss from './../../helpers/VuetableCss'

import FilmeActions from '../../actions/FilmeActions'
import ActionsLogin from '../../actions/LoginActions'

export default {
  name: 'listar',
  props: ['titulo', 'status'],
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      css: VuetableCss,
      listaExcelFields: {
        'Codigo': 'id',
        'Nome': 'nome',
        'Data Nascimento': 'dt_estreia'
      },
      filterText: '',
      urlApi: process.env.URL_API_BASE + '/filme',
      fields: [
        {
          name: 'id',
          title: 'Código',
          sortField: 'id'
        },
        {
          name: 'nome',
          title: 'Nome',
          sortField: 'nome'
        },
        {
          name: 'dt_estreia',
          title: 'Data Estreia',
          sortField: 'dt_estreia'
        },
        '__slot:actions'
      ],
      sortOrder: [
        { field: 'id', direction: 'asc' }
      ],
      moreParams: {}
    }
  },
  mounted () {
    this.$parent.$parent.$data.description = this.titulo

    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
  },
  computed: {
    httpOptions () {
      return { headers: { 'Authorization': 'Bearer ' + ActionsLogin.getToken() } }
    }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onLoading () {
      this.$parent.$parent.$data.showModalLoader = true
    },
    onLoaded () {
      this.$parent.$parent.$data.showModalLoader = false
    },
    onFilterSet (filterText) {
      this.moreParams.filter = filterText

      Vue.nextTick(() => {
        if (this.$refs.vuetable !== undefined) {
          this.$refs.vuetable.refresh()
        }
      })
    },
    doFilter () {
      this.$events.fire('filter-set', this.filterText)
    },
    atualizar () {
      this.doFilter()
    },
    novo () {
      this.$router.push('/filme/novo')
    },
    editar (rowData) {
      this.$router.push('/filme/' + rowData.id + '/e')
    },
    view (rowData) {
      this.$router.push('/filme/' + rowData.id)
    },
    excluir (rowData) {
      this.$router.push('/filme/' + rowData.id)
    },
    async gerarExcel () {
      let res = await FilmeActions.listar(this.status)
      return res
    }
  }
}
</script>
