<template>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
				<div class="pull-left image">
					<i class="fas fa-user-circle user-sidebar"></i>
				</div>
        <div class="pull-left info" style="margin-top: 12px">
          <p>{{ usuario.nome }}</p>
        </div>
      </div>
      <!-- search form
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Buscar...">
          <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
      <!-- /.search form -->

      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
		    <hr style="margin:0px"/>

        <li class="header">
          <h4>Sistema BackOffice</h4>
        </li>

			  <hr style="margin:0px"/>

        <li class="treeview" v-for="row in menus">
          <a href="#" v-if="row.hasOwnProperty('child') && typeof row.child.length != 'undefined'">
            <i :class="row.icon"></i> 
            <span>{{ row.name }}</span> 
            <i class="fa fa-angle-right pull-right"></i>
          </a>
          <router-link :to="row.link" v-else>
            <i :class="row.icon"></i> 
            <span>{{ row.name }}</span> 
          </router-link>
          
          <ul v-if="row.hasOwnProperty('child') && typeof row.child.length != 'undefined'" class="treeview-menu">
            <li v-for="child in row.child">
              <router-link :to="child.link">
                <i :class="child.icon"></i> {{ child.name }}
              </router-link>
            </li>
          </ul> 
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
  export default {
    name: 'Sidebar',
    data () {
      return {
        menus: this.$parent.$data.menus || [],
        usuario: {
          nome: ''
        }
      }
    },
    mounted () {
      let user = JSON.parse(localStorage.getItem('user'))

      this.usuario = user
    }
  }
</script>