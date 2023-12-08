import { useResizeObserver } from '@vueuse/core'
import { computed, ref, type Ref } from 'vue'

export const useDimensions = (container: Ref<HTMLElement>) => {
  const containerWidth = ref<number>()
  useResizeObserver(container, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    containerWidth.value = width
  })

  const isTablet = computed(
    () => containerWidth.value && containerWidth.value > 500 && containerWidth.value < 750
  )

  const isDesktop = computed(() => containerWidth.value && containerWidth.value >= 750)

  const isMobile = computed(() => containerWidth.value && containerWidth.value <= 500)
  
  return { isTablet, isDesktop, isMobile }
}
