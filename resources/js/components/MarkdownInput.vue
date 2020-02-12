<template>
  <div class="input-container">
    <div class="flex align-items-center">
      <label :for="name" class="input-label mr-4">{{ label }}</label>
      <button @click.prevent="showModal = true" class="btn-reset">
        <i class="material-icons text-mute"> open_in_new</i>
      </button>
    </div>
    <small v-if="hint" class="mt-2 text-mute">{{ hint }}</small>
    <modal v-show="showModal" @close="showModal = false">
      <template v-slot:header>
        <h3>{{ label }}</h3>
      </template>

      <template v-slot:body>
        <div class="markdown-desktop">
          <div class="markdown-container">
            <div class="markdown-col mb-s mr-l">
              <h4 class="mt-0 mb-s text-medium">Enter the markdown below</h4>
              <textarea
                class="markdown-col-content"
                :name="name"
                :value="value"
                @input="handleInput"
              ></textarea>
            </div>
            <div class="markdown-col mb-s">
              <h4 class="mt-0 mb-s text-medium">Rendered HTML</h4>
              <div class="markdown-col-content">
                <div v-html="renderedData"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="markdown-mobile">
          <div class="markdown-container">
            <div class="markdown-toggle">
              <button
                class="btn"
                :class="{ active: !showRender }"
                @click.prevent="changeView(false)"
              >
                <i class="material-icons">code</i>
              </button>
              <button
                class="btn"
                :class="{ active: showRender }"
                @click.prevent="changeView(true)"
              >
                <i class="material-icons">remove_red_eye</i>
              </button>
            </div>
            <div class="markdown-content">
              <div class="markdown-render" v-show="showRender">
                <div v-html="renderedData"></div>
              </div>
              <textarea
                v-show="!showRender"
                class="input-box"
                :name="name"
                :value="value"
                :class="{ 'input-box-invalid': error }"
                @input="handleInput"
              ></textarea>
            </div>
          </div>
        </div>
      </template>
    </modal>
    <small v-if="error" class="text-danger">{{ error }}</small>
  </div>
</template>

<script>
import * as marked from 'marked';
import insane from 'insane';

import Modal from '../components/Modal';

export default {
  props: ['label', 'error', 'name', 'value', 'hint'],
  components: { Modal },
  data() {
    return {
      showRender: false,
      renderedData: '',
      showModal: false
    };
  },

  watch: {
    value: function(newVal) {
      this.convertMD(newVal);
    }
  },

  mounted() {},

  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },

    changeView(showRender) {
      if (showRender != this.showRender) {
        this.showRender = showRender;
      }
    },

    convertMD(value) {
      if (value) {
        const html = marked(value);
        this.renderedData = insane(html);
      } else {
        this.renderedData = '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.markdown-desktop {
  display: block;
  .markdown-container {
    width: 90vw;
    display: flex;
    justify-content: space-between;

    .markdown-col {
      flex: 1;
    }

    .markdown-col-content {
      border: 1px solid #ddd;
      overflow: auto;
      width: 100%;
      height: 60vh;
    }
  }
}

.markdown-mobile {
  display: none;
}

@media (max-width: 768px) {
  .markdown-desktop {
    display: none;
  }

  .markdown-mobile {
    display: block;
    .markdown-container {
      .markdown-toggle {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button.active {
          background-color: white;
        }
      }

      .markdown-render,
      textarea {
        width: 90vw;
        height: 60vh;
        margin: 0;
      }

      .markdown-render {
        overflow: scroll;
        border: 1px solid #ddd;
        padding: 8px;
      }
    }
  }
}
</style>
