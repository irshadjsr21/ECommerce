<template>
  <modal @close="$emit('close')">
    <template v-slot:header>
      <h3>Filters</h3>
    </template>

    <template v-slot:body>
      <div class="filter-container">
        <div v-for="option of options" :key="option.name" class="filter-menu">
          <button
            :class="{ 'filter-active': activeFilters.includes(option.name) }"
            class="filter-header"
            @click="changeFilterMenu(option.name)"
          >
            {{ option.label }}
          </button>
          <div
            class="filter-options"
            :class="{
              'filter-options-open': openFilterMenu == option.name
            }"
          >
            <div v-if="!option.hasMany">
              <checkbox-input
                v-if="option.multiple"
                :name="option.name"
                v-model="localValues[option.name]"
                :options="option.options"
                @input="inputChanged"
                :optionsCol="true"
              />
              <radio-input
                v-if="!option.multiple"
                v-model="localValues[option.name]"
                :options="option.options"
                @input="inputChanged"
                :optionsCol="true"
              />
            </div>
            <div
              class="flex justify-content-space-between flex-wrap"
              v-if="option.hasMany"
            >
              <div
                :key="internalOption.name"
                v-for="internalOption of option.hasMany"
              >
                <checkbox-input
                  v-if="internalOption.multiple"
                  :name="internalOption.name"
                  v-model="localValues[internalOption.name]"
                  :options="internalOption.options"
                  @input="inputChanged"
                  :optionsCol="true"
                />
                <radio-input
                  v-if="!internalOption.multiple"
                  v-model="localValues[internalOption.name]"
                  :options="internalOption.options"
                  @input="inputChanged"
                  :optionsCol="true"
                />
              </div>
            </div>
            <div class="flex justify-content-center">
              <button @click="clearFilter(option.name)" class="btn btn-default">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import CheckboxInput from './CheckboxInput';
import RadioInput from './RadioInput';
import Modal from './Modal';

export default {
  props: ['options', 'defaultValues'],
  data() {
    return {
      openFilterMenu: null,
      localValues: {},
      activeFilters: [],
      query: {},
      filterDisplay: []
    };
  },
  components: { Modal, CheckboxInput, RadioInput },

  watch: {
    defaultValues: function(newVal) {
      this.localValues = this.defaultValues;
    }
  },

  mounted() {
    this.localValues = this.defaultValues;
    this.checkActive();
  },

  methods: {
    changeFilterMenu(value) {
      if (this.openFilterMenu == value) this.openFilterMenu = null;
      else this.openFilterMenu = value;
    },

    clearFilter(name) {
      const index = this.options.findIndex(val => {
        return val.name == name;
      });
      if (index != -1) {
        if (this.options[index].hasMany) {
          for (const elem of this.options[index].hasMany) {
            this.localValues[elem.name] = elem.multiple ? [] : '';
          }
        } else {
          this.localValues[name] = this.options[index].multiple ? [] : '';
        }
        this.inputChanged();
      }
    },

    checkActive() {
      this.activeFilters = [];
      const query = {};
      this.filterDisplay = [];
      for (const elem of this.options) {
        if (elem.hasMany) {
          for (const inElem of elem.hasMany) {
            if (this.localValues[inElem.name]) {
              if (
                (inElem.multiple && this.localValues[inElem.name].length > 0) ||
                !inElem.multiple
              ) {
                query[inElem.name] = inElem.multiple
                  ? this.localValues[inElem.name].join(',')
                  : this.localValues[inElem.name];
                this.filterDisplay.push({
                  name: elem.name,
                  inElemName: inElem.name,
                  displayName: inElem.label,
                  value: query[inElem.name]
                });
                this.activeFilters.push(elem.name);
              }
            }
          }
        } else if (this.localValues[elem.name]) {
          if (
            (elem.multiple && this.localValues[elem.name].length > 0) ||
            !elem.multiple
          ) {
            query[elem.name] = elem.multiple
              ? this.localValues[elem.name].join(',')
              : this.localValues[elem.name];
            this.filterDisplay.push({
              name: elem.name,
              displayName: elem.label,
              value: query[elem.name]
            });
            this.activeFilters.push(elem.name);
          }
        }
      }

      if (JSON.stringify(query) != JSON.stringify(this.query)) {
        this.query = query;
        this.$emit('query', this.query);
        this.$emit('filters', this.filterDisplay);
      }
    },

    clearBubble(bubble) {
      const index = this.options.findIndex(val => {
        return val.name == bubble.name;
      });
      if (index != -1) {
        if (this.options[index].hasMany) {
          for (const elem of this.options[index].hasMany) {
            if (
              (bubble.inElemName && elem.name == bubble.inElemName) ||
              !bubble.inElemName
            ) {
              this.localValues[elem.name] = elem.multiple ? [] : '';
            }
          }
        } else {
          this.localValues[bubble.name] = this.options[index].multiple
            ? []
            : '';
        }
        this.inputChanged();
      }
    },

    inputChanged() {
      this.checkActive();
    }
  }
};
</script>
