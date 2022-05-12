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
        <div class="form-group has-feedback">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback" v-if="tipoSistema == 'production'">
          <vue-recaptcha @verify="onVerify" :sitekey="googlekey">
          </vue-recaptcha>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck" v-on:click="esqueciSenha()">
              <label>
                <div
                  class="icheckbox_square-blue"
                  aria-checked="false"
                  aria-disabled="false"
                  style="position: relative;"
                >
                  <input
                    type="checkbox"
                    style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"
                  /><ins
                    class="iCheck-helper"
                    style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"
                  ></ins>
                </div>
                Esqueci minha senha
              </label>
            </div>
          </div>
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">
              Entrar
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
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Login",
  components: { VueRecaptcha },
  data() {
    return {
      showModalLoader: false,
      messages: "",
      success: false,
      email: "",
      password: "",
      captcha: false,
      valorCaptcha: "",
      googlekey: process.env.RECAPTCHA,
      tipoSistema: process.env.NODE_ENV
    };
  },
  methods: {
    login() {
      this.messages = "";
      if (this.tipoSistema === "production") {
        if (
          this.email.trim() !== "" &&
          this.password.trim() !== "" &&
          this.captcha
        ) {
          this.onLoading();
          Actions.login(
            this.email,
            this.password,
            this,
            this.captcha,
            this.valorCaptcha,
            this.tipoSistema
          );
        } else {
          this.messages = "Todas as informações são obrigatórias !";
        }
      } else {
        if (this.email.trim() !== "" && this.password.trim() !== "") {
          this.onLoading();
          Actions.login(
            this.email,
            this.password,
            this,
            this.captcha,
            this.valorCaptcha,
            this.tipoSistema
          );
        } else {
          this.messages = "Todas as informações são obrigatórias !";
        }
      }
    },
    onLoading() {
      this.showModalLoader = true;
    },
    onLoaded() {
      this.showModalLoader = false;
    },
    esqueciSenha() {
      this.$router.push("/esqueci-senha");
    },
    onVerify: function(response) {
      this.captcha = true;
      this.valorCaptcha = response;
    }
  }
};
</script>
