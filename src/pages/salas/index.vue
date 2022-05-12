<template>
  <div>
    <router-view class="view" keep-alive transition transition-mode="out-in" />
    <page-listar v-if="isIndexOnly()" />
  </div>
</template>

<script>
import Listar from './Listar'

export default {
  name: 'sala',
  data () {
    return {
      title: 'Sala'
    }
  },
  components: {
    'page-listar': Listar
  },
  methods: {
    isIndexOnly () {
      return this.$router.currentRoute.path === '/sala' || this.$router.currentRoute.path === '/sala/'
    }
  },
  mounted () {
    console.log('teste')
    this.$parent.$data.title = this.title
  }
}
</script>
