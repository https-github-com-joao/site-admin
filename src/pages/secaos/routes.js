import Index from './index'
import Listar from './Listar'
import Detalhes from './Detalhes'
import Novo from './Novo'
import Editar from './Editar'

const route = {
  path: '/secao',
  name: 'secao',
  component: Index,
  children: [
    { path: 'listar', name: 'secao-listar', component: Listar, props: { titulo: 'Listar', status: null } },
    { path: 'novo', name: 'secao-novo', component: Novo },
    { path: ':id', name: 'secao-detalhes', component: Detalhes, props: true },
    { path: ':id/e', name: 'secao-editar', component: Editar, props: true }
  ],
  meta: { requiresAuth: true }
}

export default route
