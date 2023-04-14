import { defineStore } from "pinia";
import { getDict, getDictByPCodes } from "@/api/system/dictList";

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
				state.getDictByPCodes(code);
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
		async getDictByPCodes(code) {
			const result = await getDictByPCodes({ pcodes: code, state: 1 });
			if (result.success) {
				this.dictCodeMap.set(code, result.result[code]);
			}
		},
		async getDict(code) {
			// const result = await
			// console.log("----------", code);
			if (!code) return;
			const result = await getDict({ code, state: 1 });
			if (result.success) {
				this.dictMap.set(code, result.result);
			}
		}
	}
});

export default useSystemStore;
