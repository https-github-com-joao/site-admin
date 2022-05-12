<template>
  <div>
    <div class="content-wrapper" v-if="this.isAuthenticated">
      <section class="content-header">
        <h1>
          {{ title }}
          <small>{{ description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fas fa-tachometer-alt"></i> Home</a></li>
          <li class="active">{{ title }}</li>
        </ol>
      </section>

      <!-- Main content -->
      <section class="content">
        <router-view class="view" keep-alive transition transition-mode="out-in" />
      </section>
      <!-- /.content -->

      <div :class="{ showloader: showModalLoader }" id="modelLoader" class="modal fade" tabindex="-4" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content modal-content-progress">
            <div class="loadersmall"></div>
          </div>
        </div>
      </div>
    </div>

    <section class="content" v-if="!this.isAuthenticated">
      <router-view class="view" keep-alive transition transition-mode="out-in" />
    </section>
  </div>
</template>

<script>
import ActionsLogin from '../../actions/LoginActions'

export default {
  name: 'Content',
  data () {
    return {
      title: null,
      description: null,
      showModalLoader: false,
      isAuthenticated: ActionsLogin.isAuthenticated()
    }
  }
}
</script>