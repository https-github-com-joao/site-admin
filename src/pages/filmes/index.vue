<template>
  <div>
    <router-view class="view" keep-alive transition transition-mode="out-in" />
    <page-listar v-if="isIndexOnly()" />
  </div>
</template>

<script>
import Listar from './Listar'

export default {
  name: 'filme',
  data () {
    return {
      title: 'Filme'
    }
  },
  components: {
    'page-listar': Listar
  },
  methods: {
    isIndexOnly () {
      return this.$router.currentRoute.path === '/filme' || this.$router.currentRoute.path === '/filme/'
    }
  },
  mounted () {
    console.log('teste')
    this.$parent.$data.title = this.title
  }
}
</script>