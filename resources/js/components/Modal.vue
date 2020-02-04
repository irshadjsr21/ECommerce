<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div
            class="modal-header flex justify-content-space-between align-items-start"
          >
            <div>
              <slot name="header"></slot>
            </div>
            <button class="btn-reset" @click="$emit('close')">
              <i class="material-icons">close</i>
            </button>
          </div>

          <div class="modal-body">
            <slot name="body"> </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
