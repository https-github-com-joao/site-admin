<template>
  <div>
    <router-view class="view" keep-alive transition transition-mode="out-in" />
    <page-listar v-if="isIndexOnly()" />
  </div>
</template>

<script>
import Listar from './Listar'

export default {
  name: 'secao',
  data () {
    return {
      title: 'Seção'
    }
  },
  components: {
    'page-listar': Listar
  },
  methods: {
    isIndexOnly () {
      return this.$router.currentRoute.path === '/secao' || this.$router.currentRoute.path === '/secao/'
    }
  },
  mounted () {
    console.log('teste')
    this.$parent.$data.title = this.title
  }
}
</script>