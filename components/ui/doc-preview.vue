<template>
  <div class="webviewer mt-5 max-w-2xl w-11/12 mx-auto rounded-2xl" ref='viewer'></div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'WebViewer',
  props: {
    path: String,
    url: String
  },
  mounted() {
    import('@pdftron/webviewer').then(() => {
        WebViewer({
            path: '../../webviewer',
            initialDoc: this.url, // replace with your own PDF file
          }, this.$refs.viewer)
    })
  }
}
</script>


<style>
.webviewer {
   height: 90vh;
}
</style>