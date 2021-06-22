import Dialog from './dialog'
let currentDialog

export default {
  install (Vue, options) {
    Vue.prototype.$dialog = function (title, content, dialogOptions) {
      if (currentDialog) {  // 防止出现两个一样的 dialog
        currentDialog.close()
      }
      currentDialog = createDialog({
        Vue,
        title,
        content,
        propsData: dialogOptions,
        onClose: () => {
          currentDialog.visible = false
          currentDialog = null
        }
      })  // 新建一个函数
    }
  }
}

// helper 动态创建组件，生成一个 Dialog 组件，然后放到页面上
function createDialog ({Vue, title, content, propsData, onClose}) {
  let Constructor = Vue.extend(Dialog)
  let dialog = new Constructor({propsData})
  dialog.$slots.title = [title]
  dialog.$slots.content = [content]
  dialog.$mount()
  dialog.$on('update:visible', onClose)
  document.body.appendChild(dialog.$el)
  return dialog
}
