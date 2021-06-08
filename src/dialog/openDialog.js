import Vue from "vue";
import Dialog from './dialog'

export const openDialog = (options) => {
  const {title, content, ok, cancel, closeOnClickOverlay} = options
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = new Vue({
    render: (h) => h(Dialog, {
      visible: true,
      'update:visible': (val) => {
        if (val === false) {
          div.remove()
        }
      },
      ok, cancel, closeOnClickOverlay
    }, {
      title, content
    })
  })
  app.$mount(div)
}
