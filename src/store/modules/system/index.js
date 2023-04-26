import { defineStore } from "pinia";
import { getDict, getDictByPCodes } from "@/api/system/dictList";

const useSystemStore = defineStore("system", {
	state: () => ({
		dictCodeMap: new Map(),
		dictMap: new Map(),
		dictAjaxTimer: {}
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
		// 根据附件字典编码获取下级字典
		async getDictByPCodes(code) {
			if (!this.dictAjaxTimer[code]) {
				// 记录本次请求
				this.dictAjaxTimer = { ...this.dictAjaxTimer, [code]: new Date().getTime() };
				// 三秒后清空请求缓存记录，让其可以再次调用
				setTimeout(() => {
					this.dictAjaxTimer = { ...this.dictAjaxTimer, [code]: null };
				}, 3 * 1000);
				// 发送请求
				const result = await getDictByPCodes({ pcodes: code, state: 1 });
				if (result.success) {
					this.dictCodeMap.set(code, result.result[code]);
				}
			}
		},
		// 根据字典编码获取当前字典
		async getDict(code) {
			if (!code) return;
			if (!this.dictAjaxTimer[code]) {
				// 记录本次请求
				this.dictAjaxTimer = { ...this.dictAjaxTimer, [code]: new Date().getTime() };
				// 三秒后清空请求缓存记录，让其可以再次调用
				setTimeout(() => {
					this.dictAjaxTimer = { ...this.dictAjaxTimer, [code]: null };
				}, 3 * 1000);
				const result = await getDict({ code, state: 1 });
				if (result.success) {
					this.dictMap.set(code, result.result);
				}
			}
		}
	}
});

export default useSystemStore;
