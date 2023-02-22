import { computed } from "vue";
import { useWindowSize as windowSize } from "@vueuse/core";
import { useAppStore } from "@/store";

export function useWindowSize() {
	const { width, height: aHeight } = windowSize();
	const appStore = useAppStore();

	const height = computed(() => {
		let paddingWidth = 0;
		if (appStore.footer) {
			paddingWidth += 40;
		}
		if (appStore.tabBar) {
			paddingWidth += 30;
		}
		if (appStore.navbar) {
			paddingWidth += 54;
		}
		return aHeight.value - paddingWidth;
	});

	return { width, height };
}
