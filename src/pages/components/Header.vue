<template>
  <header class="main-header">
    <!-- Logo -->
    <router-link to="/" class="logo full-only">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>C</b>AT</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>CATALOGO</b></span>
    </router-link>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <router-link to="/" class="logo mobile-only">
      <span class="logo-lg"><b>CATALOGO</b></span>
      </router-link>

      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle mobile-menu" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="fas fa-user-circle" style="font-size: 18px"></i>
              <span class="hidden-xs">{{ usuario.nome }}</span>
            </a>
            <ul class="dropdown-menu" style="width: auto">
              <li class="user-header" style="height: auto">
								<div class="pull-left image img-circle" style="float: none !important">
									<i class="fas fa-user-circle" style="font-size: 50px; color: #fff; text-align: center;"></i>
								</div>
                <p>
                  {{ usuario.nome }}
                </p>
              </li>
              <li class="user-footer">
								<a @click="logout()" class="btn btn-xs btn-default btn-flat" style="width: 100%">Sair</a>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button 
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>-->
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import ActionsLogin from '../../actions/LoginActions'

export default {
  name: 'Header',
  data () {
    return {
      usuario: {
        nome: ''
      }
    }
  },
  mounted () {
    let user = JSON.parse(localStorage.getItem('user'))

    this.usuario = user
  },
  methods: {
    logout () {
      ActionsLogin.logout()
    }
  }
}
</script>