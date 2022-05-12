import Index from './index'
import Listar from './Listar'
import Detalhes from './Detalhes'
import Novo from './Novo'
import Editar from './Editar'

const route = {
  path: '/filme',
  name: 'filme',
  component: Index,
  children: [
    { path: 'listar', name: 'filme-listar', component: Listar, props: { titulo: 'Listar', status: null } },
    { path: 'novo', name: 'filme-novo', component: Novo },
    { path: ':id', name: 'filme-detalhes', component: Detalhes, props: true },
    { path: ':id/e', name: 'filme-editar', component: Editar, props: true }
  ],
  meta: { requiresAuth: true }
}

export default route
