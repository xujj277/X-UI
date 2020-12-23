<template>
  <div>
    <x-uploader accept="image/*"
                action="http://127.0.0.1:8085/upload"
                name="files"
                method="POST"
                :parseResponse="parseResponse"
                :file-list.sync="fileList"
                @error="alert"
                :size-limit="1024*1024"
                @addFile="addFile"
    >
      <x-button icon="upload">上传</x-button>
    </x-uploader>
  </div>
</template>

<script>
  import xUploader from './uploader'
  import xButton from './button/button'

  export default {
    name: 'demo',
    components: { xUploader, xButton },
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      alert (error) {
        window.alert(error || '上传失败')
      },
      addFile (file) {
        this.fileList.push(file)
      },
      parseResponse (response) {
        let object = JSON.parse(response)
        let url = `http://127.0.01:8085/preview/${object}`
        return url
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    --font-size: 14px;
  }

  body {
    font-size: var(--font-size);
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>