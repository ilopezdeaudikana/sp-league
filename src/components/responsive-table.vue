<script lang="ts" setup>
import { ref, type Component, type Ref, computed } from 'vue'
import { useDimensions } from '../hooks/use-dimensions'
interface MetaData {
  [key: string]: {
    style?: string
    cellRenderer?: Component
  }
}
interface Props {
  items: any[]
  columns: { name: string; display: string }[]
  meta: MetaData
  desktopHide?: string[]
  mobileHide?: string[]
  tabletHide?: string[]
}

withDefaults(defineProps<Props>(), {
  desktopHide: () => [],
  mobileHide: () => [],
  tabletHide: () => []
})

const tableContainer = ref() as Ref<HTMLElement>

const { isDesktop, isTablet, isMobile } = useDimensions(tableContainer)

const columnWidth = computed(() => {
  if (isDesktop.value) return '20%' 
  if (isTablet.value) return '25%'
  if (isMobile.value) return '33%'
  return 'auto'
})
</script>

<template>
  <table ref="tableContainer" class="table">
    <thead class="header">
      <th
        v-for="column in columns"
        :key="column.name"
        :class="{
          column: true,
          hide: isDesktop && desktopHide.includes(column.name),
          hideInTablet: isTablet && tabletHide.includes(column.name),
          hideInMobile: isMobile && mobileHide.includes(column.name)
        }"
      >
        {{ column.display }}
      </th>
    </thead>
    <tbody>
      <tr v-for="(item, index) of items" :key="item.id" :class="{ even: index % 2 }">
        <td
          v-for="cell in Object.keys(item)"
          :key="cell"
          :class="{
            cell: true,
            hide: isDesktop && desktopHide.includes(cell),
            hideInTablet: isTablet && tabletHide.includes(cell),
            hideInMobile: isMobile && mobileHide.includes(cell)
          }"
        >
          <template v-if="meta[cell]?.cellRenderer">
            <component :is="meta[cell].cellRenderer" v-bind="item[cell]" />
          </template>
          <div v-else v-html="item[cell]" :style="meta[cell]?.style"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  border: 0;
  outline: 0;
  border-spacing: 0;
}

.header {
  background-color: #e4edf2;
  padding: 0 20px;
}

.column {
  text-align: left;
  height: 40px;
  font-size: 12px;
  width: v-bind(columnWidth)
}

.even {
  background-color: #f6f7f7;
  border: 1px solid #e4edf2;
}
.cell {
  height: 60px;
  font-size: 14px;
  vertical-align: middle;
}

.cell:first-child,
.column:first-child {
  padding-left: 20px;
}

.cell:last-child,
.column:last-child {
  padding-right: 20px;
}

.hide {
  display: none;
}

.hideInTablet {
  display: none;
}

.hideInMobile {
  display: none;
}
</style>
