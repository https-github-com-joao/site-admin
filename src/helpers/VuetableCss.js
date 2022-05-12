export default {
  table: {
    tableWrapper: '',
    tableHeaderClass: 'mb-0',
    tableBodyClass: 'mb-0',
    tableClass: 'table table-bordered table-hover',
    loadingClass: 'loading',
    ascendingIcon: 'fa fa-chevron-up',
    descendingIcon: 'fa fa-chevron-down',
    ascendingClass: 'sorted-asc',
    descendingClass: 'sorted-desc',
    sortableIcon: 'fa fa-sort',
    detailRowClass: 'vuetable-detail-row',
    handleIcon: 'fa fa-bars text-secondary',
    renderIcon (classes, options) {
      return `<i class="${classes.join(' ')}"></span>`
    }
  },
  pagination: {
    wrapperClass: 'pagination col-sm-7',
    infoClass: 'pull-left col-sm-5',
    activeClass: 'btn btn-primary',
    disabledClass: 'disabled',
    pageClass: 'btn-sm btn-default',
    linkClass: 'btn-xs btn-primary',
    icons: {
      first: 'fas fa-angle-double-left',
      prev: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      last: 'fas fa-angle-double-right'
    }
  }
}
