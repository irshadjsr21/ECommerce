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
                @input="value => inputChanged(value, option)"
                :optionsCol="true"
              />
              <radio-input
                v-if="!option.multiple"
                v-model="localValues[option.name]"
                :options="option.options"
                @input="value => inputChanged(value, option)"
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
                  @input="value => inputChanged(value, option, internalOption)"
                  :optionsCol="true"
                />
                <radio-input
                  v-if="!internalOption.multiple"
                  v-model="localValues[internalOption.name]"
                  :options="internalOption.options"
                  @input="value => inputChanged(value, option, internalOption)"
                  :optionsCol="true"
                />
              </div>
            </div>
            <div class="flex justify-content-center">
              <button @click="clearFilter(option)" class="btn btn-default">
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
      filterDisplay: [],
      selectedOptions: {}
    };
  },
  components: { Modal, CheckboxInput, RadioInput },

  watch: {
    defaultValues: function(newVal) {
      this.localValues = { ...this.defaultValues };
    }
  },

  mounted() {
    this.localValues = { ...this.defaultValues };
  },

  methods: {
    changeFilterMenu(value) {
      if (this.openFilterMenu == value) this.openFilterMenu = null;
      else this.openFilterMenu = value;
    },

    clearFilter(option) {
      if (option) {
        if (option.hasMany) {
          for (const elem of option.hasMany) {
            this.localValues[elem.name] = elem.multiple ? [] : '';
            this.modifySelected(null, option, elem);
          }
        } else {
          this.localValues[option.name] = option.multiple ? [] : '';
          this.modifySelected(null, option);
        }
      }
      this.computeValues();
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
              this.modifySelected(null, this.options[index], elem);
            }
          }
        } else {
          this.localValues[bubble.name] = this.options[index].multiple
            ? []
            : '';
          this.modifySelected(null, this.options[index]);
        }
      }

      this.computeValues();
    },

    modifySelected(value, parentOption, internalOption) {
      const option = internalOption || parentOption;
      const filterName = parentOption.name;
      const inElem = internalOption ? internalOption.name : null;
      const label = option.label;

      if (option) {
        if (value) {
          if (Array.isArray(value)) {
            const arrayOptions = [];
            for (const eachVal of value) {
              const index = option.options.findIndex(
                elem => elem.value == eachVal
              );
              arrayOptions.push(option.options[index]);
            }
            if (arrayOptions.length <= 0) {
              delete this.selectedOptions[option.name];
            } else {
              this.selectedOptions[option.name] = {
                selected: arrayOptions,
                filterName,
                inElem,
                label
              };
            }
          } else {
            const index = option.options.findIndex(elem => elem.value == value);
            if (index != -1) {
              this.selectedOptions[option.name] = {
                selected: option.options[index],
                filterName,
                inElem,
                label
              };
            } else {
              delete this.selectedOptions[option.name];
            }
          }
        } else {
          delete this.selectedOptions[option.name];
        }
      }
    },

    computeValues() {
      this.activeFilters = [];
      const query = {};
      this.filterDisplay = [];

      for (const name in this.selectedOptions) {
        if (!this.selectedOptions[name]) break;

        this.activeFilters.push(this.selectedOptions[name].filterName);
        if (Array.isArray(this.selectedOptions[name].selected)) {
          query[name] = this.selectedOptions[name].selected
            .map(elem => elem.value)
            .join(',');

          const displayBody = {
            name: this.selectedOptions[name].filterName,
            displayName: this.selectedOptions[name].label,
            value: this.selectedOptions[name].selected
              .map(elem => elem.name || elem.value)
              .join(',')
          };

          if (this.selectedOptions[name].inElem) {
            displayBody.inElemName = this.selectedOptions[name].inElem;
          }
          this.filterDisplay.push(displayBody);
        } else {
          query[name] = this.selectedOptions[name].selected.value;
          const displayBody = {
            name: this.selectedOptions[name].filterName,
            displayName: this.selectedOptions[name].label,
            value:
              this.selectedOptions[name].selected.name ||
              this.selectedOptions[name].selected.name
          };

          if (this.selectedOptions[name].inElem) {
            displayBody.inElemName = this.selectedOptions[name].inElem;
          }
          this.filterDisplay.push(displayBody);
        }
      }

      if (JSON.stringify(query) != JSON.stringify(this.query)) {
        this.query = query;
        this.$emit('query', this.query);
        this.$emit('filters', this.filterDisplay);
      }
    },

    inputChanged(value, parentOption, internalOption) {
      this.modifySelected(value, parentOption, internalOption);
      this.computeValues();
    }
  }
};
</script>
