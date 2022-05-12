const formataNumeroTelefone = (telefone) => {
  const isCelular = telefone.length === 11
  let formatado

  if (isCelular) {
    formatado = telefone.replace(/(\d{2})(\d{5})(\d{4})/,
      (regex, arg1, arg2, arg3) => {
        return '(' + arg1 + ') ' + arg2 + '-' + arg3
      })
  } else {
    formatado = telefone.replace(/(\d{2})(\d{4})(\d{4})/,
      (regex, arg1, arg2, arg3) => {
        return '(' + arg1 + ') ' + arg2 + '-' + arg3
      })
  }

  return formatado
}

const formataCep = (cep) => {
  return cep.replace(/(\d{2})(\d{3})(\d{3})/,
    (regex, arg1, arg2, arg3) => {
      return arg1 + '.' + arg2 + '-' + arg3
    })
}

export default {
  formataNumeroTelefone,
  formataCep
}
