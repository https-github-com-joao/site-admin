<template>
  <div class="login-box" style="border: 1px solid #c9c9c9">
    <div class="login-logo">
      <span class="logo-lg">
        CATALOGO ADMIN
      </span>
    </div>
    <div class="login-box-body">
      <form v-on:submit.prevent="login()">
        <div v-if="!success && messages != ''">
          <div class="alert alert-danger">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>
        <div v-if="success && messages != ''">
          <div class="alert alert-success">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>
        <div class="form-group has-feedback">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            v-model="email"
          />
          <span
            class="glyphicon glyphicon-envelope form-control-feedback"
          ></span>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="submit" class="btn btn-primary btn-block btn-flat">
              Recuperar Senha
            </button>
          </div>
        </div>
      </form>
    </div>
    <div
      :class="{ showloader: showModalLoader }"
      id="modelLoader"
      class="modal fade"
      tabindex="-4"
      role="dialog"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content modal-content-progress">
          <div class="loadersmall"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Actions from "../../actions/LoginActions";

export default {
  name: "Login",
  data() {
    return {
      showModalLoader: false,
      messages: "",
      success: false,
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.email.trim() !== "") {
        this.onLoading();
        var currentUrl = window.location.origin;

        Actions.recuperarSenha(this.email, currentUrl, this);
      }
    },
    onLoading() {
      this.showModalLoader = true;
    },
    onLoaded() {
      this.showModalLoader = false;
    }
  }
};
</script>
