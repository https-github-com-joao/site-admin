import Index from './index'
import Listar from './Listar'
import Detalhes from './Detalhes'
import Novo from './Novo'
import Editar from './Editar'

const route = {
  path: '/sala',
  name: 'sala',
  component: Index,
  children: [
    { path: 'listar', name: 'sala-listar', component: Listar, props: { titulo: 'Listar', status: null } },
    { path: 'novo', name: 'sala-novo', component: Novo },
    { path: ':id', name: 'sala-detalhes', component: Detalhes, props: true },
    { path: ':id/e', name: 'sala-editar', component: Editar, props: true }
  ],
  meta: { requiresAuth: true }
}

export default route
