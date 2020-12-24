<template>
  <div class="x-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0;height: 0;overflow: hidden;"></div>
    <ol class="x-uploader-fileList">
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status === 'uploading'">
          <x-icon class="x-uploader-spin" name="loading"></x-icon>
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img class="x-uploader-image" :src="file.url" width="32" height="32" alt="">
        </template>
        <template v-else>
          <div class="x-uploader-defaultImage"></div>
        </template>
        <span class="x-uploader-name" :class="{[file.status]: file.status}">{{file.name}}</span>
        <button class="x-uploader-remove" @click="onRemoveFile(file)">x</button>
      </li>
    </ol>
  </div>
</template>

<script>
  import xIcon from './icon'
  import http from './http'

  export default {
    name: 'XUploader',
    components: { xIcon },
    props: {
      name: {
        type: String,
        required: true
      },
      method: {
        type: String,
        default: 'POST'
      },
      action: {
        type: String,
        required: true
      },
      parseResponse: {
        type: Function,
        required: true
      },
      fileList: {
        type: Array,
        default: () => []
      },
      sizeLimit: {
        type: Number
      }
    },
    data () {
      return {
        url: 'about:blank'
      }
    },
    methods: {
      onClickUpload () {
        let input = this.createInput()
        input.addEventListener('change', () => {
          this.uploadFiles(input.files)
          input.remove()
        })
        input.click()
      },
      onRemoveFile (file) {
        let answer = window.confirm('你确定要删除这个图片')
        if (answer) {
          let copy = [...this.fileList]
          let index = copy.indexOf(file)
          copy.splice(index, 1)
          this.$emit('update:fileList', copy)
        }
      },
      beforeUploadFiles (rawFiles, newNames) {
        rawFiles = Array.from(rawFiles)
        for (let i = 0; i < rawFiles.length; i++) {
          let {size, type} = rawFiles[i]
          if (size > this.sizeLimit) {
            this.$emit('error', '文件大于2MB')
            return false
          }
        }
        let x = rawFiles.map((rawFile, i) => {
          let {type , size} = rawFile
          return { name: newNames[i], type, size, status: 'uploading' }
        })
        this.$emit('update:fileList', [...this.fileList, ...x])
        // this.$emit('addFile', {name: newName, type, size, status: 'uploading'})
        return true
      },
      uploadFiles (rawFiles) {
        let newNames = []
        for (let i = 0; i < rawFiles.length; i++) {
          let rawFile = rawFiles[i]
          let {name, size, type} = rawFile
          let newName = this.generateName(name)
          newNames[i] = newName
        }
        if (!this.beforeUploadFiles(rawFiles, newNames)) return
        for (let i = 0; i < rawFiles.length; i++) {
          let rawFile = rawFiles[i]
          let newName = newNames[i]
          let formData = new FormData()
          formData.append(this.name, rawFile)
          this.doUploadFiles(formData, (response) => {
            console.log('this.fileList')
            console.log(this.fileList, response)
            let url = this.parseResponse(response)
            this.url = url
            this.afterUploadFiles(newName, url)
          }, (xhr) => {
            console.log(xhr)
            this.uploadError(xhr, newName)
          })
        }
      },
      uploadError (xhr, newName) {
        let file = this.fileList.filter(f => f.name === newName)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.status = 'fail'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, fileCopy)
        this.$emit('update:fileList', fileListCopy)
        let error = ''
        if (xhr.status === 0) {
          error = '网络无法连接'
        }
        this.$emit('error', error)
      },
      generateName (name) {
        while (this.fileList.filter(f => f.name === name).length > 0) {
          let dotIndex = name.lastIndexOf('.')
          let nameWithoutExtension = name.substring(0, dotIndex)
          let extension = name.substring(dotIndex)
          name = nameWithoutExtension + '(1)' + extension
        }
        return name
      },
      afterUploadFiles (newName, url) {
        let file = this.fileList.filter(f => f.name === newName)[0]
        let index = this.fileList.indexOf(file)
        let copy = JSON.parse(JSON.stringify(file))
        copy.url = url
        copy.status = 'success'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, copy)
        this.$emit('update:fileList', fileListCopy)
      },
      doUploadFiles (formData, success, fail) {
        http[this.method.toLowerCase()](this.action, { success, fail, data: formData })
      },
      createInput () {
        this.$refs.temp.innerHTML = ''
        let input = document.createElement('input')
        input.accept = 'image/*'
        input.type = 'file'
        input.multiple = true
        this.$refs.temp.appendChild(input)
        return input
      },
    }
  }
</script>

<style lang='scss' scoped>
  @import "var";
  .x-uploader {
    &-fileList {
      list-style: none;

      li {
        display: flex;
        align-items: center;
        margin: 8px 0;
        border: 1px solid darken($grey, 10%);
      }
    }
    &-defaultImage {
      border: 1px solid red;
      width: 32px;
      height: 32px;
    }
    &-image {
      margin-right: 8px;
    }
    &-name {
      margin-right: auto;
      &.success {
        color: green;
      }

      &.fail {
        color: red;
      }
    }
    &-remove {
      width: 32px;
      height: 32px;
    }
    &-spin {
      width: 32px;
      height: 32px;
      @include spin;
    }
  }
</style>
