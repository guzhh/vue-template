import { ref, computed } from "vue";
import { tableSizeOptions as options } from "@/constant/table";
import useAppStore from "@/store/modules/app";

export default () => {
	const appStore = useAppStore();
	const tableSizeOptions = ref(options);
	const tableSize = computed({
		get() {
			return appStore.tableSize;
		},
		set(val) {
			appStore.tableSize = val;
		}
	});

	return { tableSize, tableSizeOptions };
};
