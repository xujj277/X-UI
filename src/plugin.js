import Toast from './toast'

let currentToast

export default {
  install (Vue, options) {
    Vue.prototype.$toast = function (message, toastOptions) {
      if (currentToast) {  // 防止出现两个一样的 toast
        currentToast.close()
      }
      currentToast = createToast({Vue, message, propsData: toastOptions})  // 新建一个函数
    }
  }
}
// helper
function createToast ({Vue, message, propsData}) {
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({propsData})
  toast.$slots.default = [message]
  toast.$mount()
  document.body.appendChild(toast.$el)
  return toast
}
