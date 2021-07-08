import Toast from './toast.vue'

let currentToast

function createToast ({ Vue, message, propsData, onClose }) {
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({propsData})
  toast.$slots.default = [message]
  toast.$mount()
  toast.$on('close', onClose)
  document.body.appendChild(toast.$el)
  return toast
}

export default {
  install (Vue) {
    Vue.prototype.$toast = function (message, toastOptions) {
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast({
        Vue,
        message,
        propsData: toastOptions,
        onClose: () => {
          currentToast = null
        }
      })
    }
  }
}
