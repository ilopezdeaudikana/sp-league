<script lang="ts" setup generic="T extends Object">
import { ref, type Component, type Ref, computed } from 'vue'
import { useDimensions } from '../hooks/use-dimensions'

type MetaData<N extends string | number | symbol> = {
  [K in N]: {
    style?: string
    cellRenderer?: Component
  }
}
interface Props {
  items: T[]
  columns: { name: string; display: string, centered?: boolean }[]
  meta: MetaData<keyof T>
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

const toKeys = <T extends Object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[]
}

const shouldShow = (items: string[], key: string | symbol | number) => {
  if (typeof key === 'string') return items.includes(key)
}

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
      <th v-for="column in columns" :key="column.name" :class="{
        column: true,
        hide: isDesktop && shouldShow(desktopHide, column.name),
        hideInTablet: isTablet && shouldShow(tabletHide, column.name),
        hideInMobile: isMobile && shouldShow(mobileHide, column.name),
        centered: column.centered
      }">
        {{ column.display }}
      </th>
    </thead>
    <tbody>
      <tr v-for="(item, index) of items" :key="index" :class="{ even: index % 2 }">
        <td v-for="(cell, index) in toKeys(item)" :key="cell" :class="{
          cell: true,
          hide: isDesktop && shouldShow(desktopHide, cell),
          hideInTablet: isTablet && shouldShow(tabletHide, cell),
          hideInMobile: isMobile && shouldShow(mobileHide, cell),
          centered: columns[index].centered
        }">
          <template v-if="meta[cell]?.cellRenderer && typeof item[cell] === 'object'">
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

.centered {
  text-align: center;
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
