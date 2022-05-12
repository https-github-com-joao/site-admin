<template>
  <div>
    <router-view class="view" keep-alive transition transition-mode="out-in" />
    <page-listar v-if="isIndexOnly()" />
  </div>
</template>

<script>
import Listar from './Listar'

export default {
  name: 'equipamentos',
  data () {
    return {
      title: 'Equipamentos'
    }
  },
  components: {
    'page-listar': Listar
  },
  methods: {
    isIndexOnly () {
      return this.$router.currentRoute.path === '/equipamentos' || this.$router.currentRoute.path === '/equipamentos/'
    }
  },
  mounted () {
    this.$parent.$data.title = this.title
  }
}
</script>