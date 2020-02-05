<template>
  <modal v-if="category" @close="$emit('close')">
    <template v-slot:header>
      <h3 v-if="isLoading">Loading...</h3>
      <h3 class="flex align-items-center" v-else>
        <button @click="back" class="btn-reset mr-4">
          <i class="material-icons">
            keyboard_arrow_left
          </i>
        </button>
        <span>{{ category.name }}</span>
      </h3>
    </template>
    <template v-slot:body>
      <div v-if="isLoading" class="my-l mx-xl">
        <div class="loader"></div>
      </div>

      <table v-else>
        <tr>
          <td class="pb-4">
            <div class="text-medium mr-4">Name :</div>
          </td>
          <td class="pb-4">
            <div>{{ category.name }}</div>
          </td>
        </tr>

        <tr>
          <td class="pb-4">
            <div class="text-medium mr-4">Level :</div>
          </td>
          <td class="pb-4">
            <div>{{ category.level }}</div>
          </td>
        </tr>

        <tr>
          <td class="pb-4">
            <div class="text-medium mr-4">Slug :</div>
          </td>
          <td class="pb-4">
            <div>/{{ category.slug }}</div>
          </td>
        </tr>

        <tr>
          <td class="pb-4">
            <div class="text-medium mr-4">Can have divisions? :</div>
          </td>
          <td class="pb-4">
            <div>{{ category.canHaveDivisions ? 'Yes' : 'No' }}</div>
          </td>
        </tr>

        <tr>
          <td class="pb-4">
            <div class="text-medium mr-4">Created at :</div>
          </td>
          <td class="pb-4">
            <div>
              {{
                new Date(category.createdAt)
                  | dateFormat('DD MMM, YYYY hh:mm A')
              }}
            </div>
          </td>
        </tr>

        <tr>
          <td class="pb-4">
            <div class="text-medium mr-4">Parent Category :</div>
          </td>
          <td class="pb-4">
            <div v-if="category.parentCategory">
              <a
                href="#"
                @click="show(category.parentCategory.id)"
                class="anchor-reset"
                >{{ category.parentCategory.name }}</a
              >
            </div>
            <div v-else>
              None
            </div>
          </td>
        </tr>

        <tr>
          <td class="pb-4">
            <div class="text-medium mr-4">Sub categories :</div>
          </td>
          <td class="pb-4">
            <div
              v-if="category.subCategories && category.subCategories.length > 0"
            >
              <ul>
                <li
                  v-for="subCategory of category.subCategories"
                  :key="subCategory.id"
                >
                  <a
                    href="#"
                    @click="show(subCategory.id)"
                    class="anchor-reset"
                    >{{ subCategory.name }}</a
                  >
                </li>
              </ul>
            </div>
            <div v-else>
              None
            </div>
          </td>
        </tr>
      </table>
    </template>
  </modal>
</template>

<script>
import Modal from '../../components/Modal';
import { getCategory } from '../services/category';

export default {
  props: ['value'],
  components: { Modal },

  data() {
    return {
      category: null,
      isLoading: false
    };
  },

  mounted() {
    this.getCategory();
  },

  watch: {
    value: function(newVal) {
      this.getCategory();
    }
  },

  methods: {
    getCategory() {
      if (this.value && this.value.length > 0) {
        this.isLoading = true;
        getCategory(this.value[this.value.length - 1])
          .then(data => {
            this.category = data;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },

    show(id) {
      const val = this.value;
      val.push(id);
      this.$emit('input', val);
    },

    back() {
      const val = this.value;
      val.pop();
      this.$emit('input', val);
    }
  }
};
</script>
