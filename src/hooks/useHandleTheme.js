import { computed } from "vue";
import { useDark, useToggle } from "@vueuse/core/index";
import useAppStore from "@/store/modules/app";

export default function useHandleTheme() {
	const appStore = useAppStore();
	const isDark = useDark({
		selector: "body",
		attribute: "naive-theme",
		valueDark: "dark",
		valueLight: "light",
		storageKey: "naive-theme",
		onChanged(dark) {
			// overridden default behavior
			appStore.toggleTheme(dark);
		}
	});

	const toggleTheme = useToggle(isDark);

	return {
		theme: computed(() => {
			return appStore.theme;
		}),
		handleToggleTheme: () => {
			toggleTheme();
		}
	};
}
