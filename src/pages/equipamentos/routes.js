import Index from './index'
import Listar from './Listar'
import Detalhes from './Detalhes'
import Novo from './Novo'
import Editar from './Editar'

const route = {
  path: '/equipamentos',
  name: 'equipamentos',
  component: Index,
  children: [
    { path: 'listar', name: 'equipamentos-listar', component: Listar, props: { titulo: 'Listar', status: null } },
    { path: 'listar-cadastrados', name: 'equipamentos-listar-cadastrados', component: Listar, props: { titulo: 'Listar Central Zanzar', status: 1 } },
    { path: 'listar-disponivel-ponto-apoio', name: 'equipamentos-listar-disponivel-ponto-apoio', component: Listar, props: { titulo: 'Listar Disponível Ponto Apoio', status: 3 } },
    { path: 'listar-em-utilizacao', name: 'equipamentos-listar-em-utilizacao', component: Listar, props: { titulo: 'Listar Em Utilização', status: 4 } },
    { path: 'listar-em-transito', name: 'equipamentos-listar-em-transito', component: Listar, props: { titulo: 'Listar Em Trânsito', status: 2 } },
    { path: 'listar-inativos', name: 'equipamentos-listar-inativos', component: Listar, props: { titulo: 'Listar Inativos', status: 5 } },
    { path: 'novo', name: 'equipamentos-novo', component: Novo },
    { path: ':id', name: 'equipamentos-detalhes', component: Detalhes, props: true },
    { path: ':id/e', name: 'equipamentos-editar', component: Editar, props: true }
  ],
  meta: { requiresAuth: true }
}

export default route
