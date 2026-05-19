<script lang="ts" setup generic="T extends Object">
import { ref, type Component, type Ref } from 'vue'
import { useDimensions } from '../hooks/use-dimensions'
import { toTypedKeys } from '@/utils/toTypedKeys'

export interface ColumnConfig<T, K extends keyof T> {
  name: string; display: string, centered?: boolean
  key: K
  style?: string
  cellRenderer?: Component
}

interface Props {
  title?: string
  rows: T[]
  columns: ColumnConfig<T, keyof T>[]
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

const { isDesktop, isTablet, isMobile, containerWidth } = useDimensions(tableContainer)


const shouldShow = (items: string[], key: string | symbol | number) => {
  if (typeof key === 'string') return items.includes(key)
}

</script>

<template>
  <table
    ref="tableContainer"
    class="table"
  >
    <thead>
      <tr v-if="title">
        <th :colspan="columns.length">{{ title }}</th>
      </tr>
      <tr class="header">
        <th
          v-for="column in columns"
          :key="column.name"
          :class="{
            column: true,
            hide: isDesktop && shouldShow(desktopHide, column.name),
            hideInTablet: isTablet && shouldShow(tabletHide, column.name),
            hideInMobile: isMobile && shouldShow(mobileHide, column.name),
            centered: column.centered
          }"
        >
          {{ column.display }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) of rows"
        :key="index"
        :class="{ even: index % 2 }"
      >
        <td
          v-for="(cell, index) in toTypedKeys(item)"
          :key="cell"
          :class="{
            cell: true,
            hide: isDesktop && shouldShow(desktopHide, cell),
            hideInTablet: isTablet && shouldShow(tabletHide, cell),
            hideInMobile: isMobile && shouldShow(mobileHide, cell),
            centered: columns[index].centered
          }"
        >
          <template v-if="columns[index]?.cellRenderer && typeof item[cell] === 'object'">
            <component
              :is="columns[index]?.cellRenderer"
              v-bind="item[cell]"
              :style="columns[index]?.style"
            />
          </template>
          <div
            v-else
            v-html="item[cell]"
            :style="columns[index]?.style"
          ></div>
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
  width: v-bind(containerWidth)
}

.header {
  background-color: var(--vt-c-indigo-faded);
  color: var(--vt-c-text-dark-1)
}

.column {
  text-align: left;
  height: 40px;
  font-size: 12px;
}

.even {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
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
