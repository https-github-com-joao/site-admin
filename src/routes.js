import Vue from "vue";
import Router from "vue-router";

// import auth from "@/auth/initAuth";
import Home from "./pages/home/Home";
import Login from "@/pages/login/Login";
import RecadastrarSenha from "@/pages/login/RecadastrarSenha";
import RecuperarSenha from "@/pages/login/RecuperarSenha";
import Equipamentos from "@/pages/equipamentos/routes";
import Filmes from "@/pages/filmes/routes";
import Salas from "@/pages/salas/routes";
import Secao from "@/pages/secaos/routes";

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    { path: "/login", name: "Login", component: Login },
    {
      path: "/recadastrar-senha",
      name: "RecadastrarSenha",
      component: RecadastrarSenha
    },
    {
      path: "/esqueci-senha",
      name: "RecuperarSenha",
      component: RecuperarSenha
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true }
    },
    Equipamentos,
    Filmes,
    Salas,
    Secao
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem("jwt") == null || !auth.loggedIn()) {
//       if (localStorage.getItem("jwt") !== null) {
//         localStorage.removeItem("user");
//         localStorage.removeItem("jwt");
//       }
//       next({
//         path: "/login",
//         params: { nextUrl: to.fullPath }
//       });
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
