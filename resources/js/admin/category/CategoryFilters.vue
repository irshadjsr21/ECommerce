<template>
  <div>
    <div class="flex justify-content-space-between mb-s">
      <button
        class="btn btn-primary flex align-items-center justify-content-center"
        @click="showFilters = true"
      >
        <i class="material-icons mr-4">
          filter_list
        </i>
        <span>Add filters</span>
      </button>
      <button
        @click="$emit('refresh')"
        class="btn btn-primary flex align-items-center"
        :disabled="isLoading"
      >
        <i class="material-icons mr-4">
          refresh
        </i>
        <span>Refresh</span>
      </button>
    </div>
    <div v-if="bubbles.length > 0" class="mt-s">
      <h4 class="mt-0 mb-s text-medium">Active filters</h4>
      <div class="flex flex-wrap">
        <div
          class="mr-s mb-8"
          v-for="bubble of bubbles"
          :key="
            bubble.inElemName
              ? bubble.name + '-' + bubble.inElemName
              : bubble.name
          "
        >
          <button
            class="filter-bubble flex align-items-center justify-content-center"
            @click="clearFilter(bubble)"
          >
            <small class="mr-4">X</small>
            <span
              >{{ bubble.displayName }} : {{ bubble.value | capitalize }}</span
            >
          </button>
        </div>
      </div>
    </div>
    <admin-filter
      ref="adminFilter"
      :defaultValues="defaultFilterValues"
      v-show="showFilters"
      @close="showFilters = false"
      :options="filterOptions"
      @query="queryChanged"
      @filters="value => (bubbles = value)"
    />
  </div>
</template>

<script>
import AdminFilter from '../../components/AdminFilter';
import { getCategoryLevels } from '../services/category';

export default {
  props: ['isLoading'],
  data() {
    return {
      showFilters: false,
      bubbles: [],
      filterOptions: [
        {
          name: 'level',
          label: 'Level',
          multiple: true,
          options: []
        },
        {
          name: 'divisions',
          label: 'Divisions',
          multiple: false,
          options: [
            { name: 'Yes', value: 'yes' },
            { name: 'No', value: 'no' }
          ]
        },
        {
          name: 'sort',
          label: 'Sort',
          hasMany: [
            {
              name: 'sortBy',
              label: 'Sort by',
              multiple: false,
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
            {
              name: 'order',
              label: 'Sort order',
              multiple: false,
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
          ]
        }
      ],
      defaultFilterValues: {
        level: [],
        divisions: '',
        sortBy: '',
        order: ''
      }
    };
  },

  components: {
    AdminFilter
  },

  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  mounted() {
    this.getLevels();
  },

  methods: {
    getLevels() {
      getCategoryLevels().then(data => {
        if (data && Array.isArray(data)) {
          const index = this.filterOptions.findIndex(obj => {
            return obj.name == 'level';
          });
          if (index != -1) {
            this.filterOptions[index].options = data.map(val => {
              const strVal = val + '';
              return {
                name: strVal,
                value: strVal
              };
            });
          }
        }
      });
    },

    queryChanged(value) {
      this.$emit('change', value);
    },

    clearFilter(bubble) {
      this.$refs.adminFilter.clearBubble(bubble);
    }
  }
};
</script>
