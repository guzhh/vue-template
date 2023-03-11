import { defineStore } from "pinia";
import { getDicLevelByCode } from "@/api/system/dictList";

const useSystemStore = defineStore("system", {
	state: () => ({
		dictCodeMap: new Map(),
		dictMap: new Map()
	}),
	getters: {
		// 根据字典编码获取下级字典
		getDictList(state) {
			return code => {
				const dictList = state.dictCodeMap.get(code);
				if (dictList) return dictList;
				state.getDicLevelByCode(code);
				return [];
			};
		},
		// 根据字典编码获取当前字典
		getDictName(state) {
			return code => {
				const dict = state.dictMap.get(code);
				if (dict) return dict.name;
				state.getDict(code);
				return "";
			};
		}
	},
	actions: {
		async getDicLevelByCode(code) {
			const result = await getDicLevelByCode({ code });
			if (result.success) {
				this.dictCodeMap.set(code, result.result);
			}
		},
		async getDict(code) {
			// const result = await
			console.log("----------", code);
		}
	}
});

export default useSystemStore;
