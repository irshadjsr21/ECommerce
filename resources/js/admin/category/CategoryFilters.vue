<template>
  <div>
    <button
      class="btn btn-primary flex align-items-center justify-content-center"
      @click="showFilters = true"
    >
      <i class="material-icons mr-4">
        filter_list
      </i>
      <span>Add filters</span>
    </button>
    <div v-if="querySize > 0" class="mt-s">
      <h4 class="mt-0 mb-s text-medium">Active filters</h4>
      <div class="flex flex-wrap">
        <div class="mr-s mb-8" v-for="(value, keyName) in query" :key="keyName">
          <button
            class="filter-bubble flex align-items-center justify-content-center"
            @click="clearFilter(keyName)"
          >
            <small class="mr-4">X</small>
            <span>{{ keyName | capitalize }} : {{ value | capitalize }}</span>
          </button>
        </div>
      </div>
    </div>
    <modal v-if="showFilters" @close="showFilters = false">
      <template v-slot:header>
        <h3>Filters</h3>
      </template>

      <template v-slot:body>
        <div class="filter-container">
          <div class="filter-menu">
            <button
              :class="{ 'filter-active': level.isActive }"
              class="filter-header"
              @click="changeFilterMenu('level')"
            >
              Level
            </button>
            <div
              class="filter-options"
              :class="{
                'filter-options-open': openFilterMenu == 'level'
              }"
            >
              <input-box
                class="input-container-digit"
                v-model="level.value"
                label="Enter level"
                @input="inputChanged"
              />
              <div class="flex justify-content-center">
                <button @click="clearFilter('level')" class="btn btn-default">
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div class="filter-menu">
            <button
              class="filter-header"
              :class="{ 'filter-active': divisions.isActive }"
              @click="changeFilterMenu('divisions')"
            >
              Have subcategories?
            </button>
            <div
              class="filter-options"
              :class="{
                'filter-options-open': openFilterMenu == 'divisions'
              }"
            >
              <radio-input
                :optionsCol="true"
                :options="divisions.options"
                v-model="divisions.value"
                @input="inputChanged"
              />
              <div class="flex justify-content-center">
                <button
                  @click="clearFilter('divisions')"
                  class="btn btn-default"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div class="filter-menu">
            <button
              :class="{ 'filter-active': sort.isActive }"
              class="filter-header"
              @click="changeFilterMenu('sort')"
            >
              Sort by
            </button>
            <div
              class="filter-options"
              :class="{ 'filter-options-open': openFilterMenu == 'sort' }"
            >
              <div class="flex justify-content-space-between">
                <radio-input
                  :optionsCol="true"
                  :options="sort.sortBy.options"
                  v-model="sort.sortBy.value"
                  class="mr-l"
                  @input="inputChanged"
                />
                <radio-input
                  :optionsCol="true"
                  :options="sort.sortOrder.options"
                  v-model="sort.sortOrder.value"
                  @input="inputChanged"
                />
              </div>
              <div class="flex justify-content-center">
                <button @click="clearFilter('sort')" class="btn btn-default">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import CheckboxInput from '../../components/CheckboxInput';
import InputBox from '../../components/InputBox';
import SelectBox from '../../components/SelectBox';
import RadioInput from '../../components/RadioInput';
import Modal from '../../components/Modal';

export default {
  data() {
    return {
      defaultValues: {
        divisions: null,
        level: null,
        sortOrder: 'asc',
        sortBy: null
      },
      sort: {
        isActive: false,
        sortBy: {
          value: null,
          options: [
            {
              name: 'Name',
              value: 'name'
            },
            {
              name: 'Slug',
              value: 'slug'
            },
            {
              name: 'Level',
              value: 'level'
            },
            {
              name: 'Created at',
              value: 'createdAt'
            }
          ]
        },
        sortOrder: {
          value: 'asc',
          options: [
            {
              name: 'Ascending',
              value: 'asc'
            },
            {
              name: 'Descending',
              value: 'desc'
            }
          ]
        }
      },
      divisions: {
        isActive: false,
        value: null,
        options: [
          { name: 'Yes', value: 'yes' },
          { name: 'No', value: 'no' }
        ]
      },
      level: {
        isActive: false,
        value: null
      },
      showFilters: false,
      openFilterMenu: null,
      query: {},
      querySize: 0
    };
  },

  components: { CheckboxInput, InputBox, SelectBox, RadioInput, Modal },

  filters: {
    capitalize: function(value) {
      if (!value) return '';
      if (typeof value != 'string') return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  methods: {
    changeFilterMenu(value) {
      if (this.openFilterMenu == value) this.openFilterMenu = null;
      else this.openFilterMenu = value;
    },

    inputChanged() {
      this.sort.isActive = !!this.sort.sortBy.value;
      this.level.isActive = !!this.level.value;
      this.divisions.isActive = !!this.divisions.value;
      this.genQuery();
    },

    genQuery() {
      const query = {};
      if (this.sort.isActive) {
        query.sortBy = this.sort.sortBy.value;
        query.order = this.sort.sortOrder.value;
      }

      if (this.level.isActive) {
        query.level = this.level.value;
      }

      if (this.divisions.isActive) {
        query.divisions = this.divisions.value;
      }

      this.query = query;
      this.querySize = Object.keys(query).length;
      this.$emit('change', query);
    },

    clearFilter(key) {
      if (['sort', 'sortBy', 'order'].includes(key)) {
        this.sort.sortBy.value = this.defaultValues.sortBy;
        this.sort.sortOrder.value = this.defaultValues.sortOrder;
        this.sort.isActive = false;
      } else if (key != 'sort') {
        if (this[key]) {
          this[key].isActive = false;
          this[key].value = this.defaultValues[key];
        }
      }

      this.inputChanged();
    }
  }
};
</script>
