<template>
  <transition name="modal">
    <div class="modal-mask">
      <postForm v-bind="{proceedToLoading, closeModal, backToPostForm}" v-if="scene==='POST_FORM'"/>
      <loading v-if="scene==='LOADING'"/>
    </div>
  </transition>
</template>

<script>
import Loading from './Loading.vue';
import PostForm from './PostForm.vue';
import { POST_FORM, LOADING } from '../constants/modal-scenes';

export default {
  props: ['closeModal'],
  data: function () {
    return {
      scene: POST_FORM
    };
  },
  methods: {
    proceedToLoading () {
      this.scene = LOADING;
    },
    backToPostForm () {
      this.scene = POST_FORM;
    }
  },
  components: {
    Loading,
    PostForm
  }
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
