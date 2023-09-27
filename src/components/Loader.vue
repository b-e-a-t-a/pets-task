<template>
  <div class="loader"></div>
</template>

<style lang="sass" scoped>
@import "../assets/main.sass"
.loader
  border: 18px solid lighten($color-border, 20%)
  border-radius: 50%
  border-top: 18px solid $color-primary-light
  border-right: 18px solid lighten($color-border, 15%)
  width: 100px
  height: 100px
  -webkit-animation: spin 3s linear infinite
  animation: spin 3s linear infinite

  @-webkit-keyframes spin
    0%
      -webkit-transform: rotate(0deg)
    100%
      -webkit-transform: rotate(360deg)

  @keyframes spin
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>