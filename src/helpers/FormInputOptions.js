import moment from 'moment'

export const PikadayOptions = {
  format: 'DD/MM/YYYY',
  minDate: null,
  maxDate: moment().add(2, 'years').toDate(),
  i18n: {
    previousMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  }
}

export const MaskMoneyOptions = {
  decimal: ',',
  thousands: '.',
  prefix: '',
  suffix: '',
  precision: 2,
  masked: false
}
