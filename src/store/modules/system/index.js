import { defineStore } from "pinia";
import { getDict, getDictByPCodes } from "@/api/system/dictList";
import { getAllParam } from "@/api/system/param";

const useSystemStore = defineStore("system", {
	state: () => ({
		dictCodeMap: new Map(), // 根据父级字典存储字典map
		dictMap: new Map(), // 每个字典map
		dictAjaxTimer: {}, // 定义三秒内只发送一次获取同一个字典map
		paramMap: new Map() // 存储参数
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
		},
		// 根据字典值和父级编码获取当前字典
		getDictNameByValue(state) {
			return (pcode, dictValue) => {
				// 根据字典编码获取下级字典
				const list = (() => {
					const dictList = state.dictCodeMap.get(pcode);
					if (dictList) return dictList;
					state.getDictByPCodes(pcode);
					return [];
				})();
				// 根据字典值查找字典
				const currentDict = list.find(item => {
					return dictValue === item.dictVal;
				});
				if (currentDict) {
					const dict = state.dictMap.get(currentDict.code);
					if (dict) return dict.name;
					state.getDict(currentDict.code);
				}
				return "未知字典";
			};
		},
		// 根据参数编码获取参数值
		getParamVal(state) {
			return code => {
				const param = state.paramMap.get(code);
				if (param) return param.paramVal;
				return undefined;
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
				if (result.success && result.result) {
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
				if (result.success && result.result) {
					this.dictMap.set(code, result.result);
				} else {
					this.dictMap.set(code, {
						id: new Date().getTime(),
						code,
						name: "未知字典",
						dictVal: null,
						state: null
					});
				}
			}
		},

		/**
		 * 获取全部系统参数
		 * @returns {Promise<void>}
		 */
		async getAllParam() {
			getAllParam().then(res => {
				if (res.success) {
					res.result.forEach(param => {
						this.paramMap.set(param.paramCode, param);
					});
				}
			});
		},

		// 删除缓存中的字典
		removeDictByPCode(pcode) {
			this.dictCodeMap.delete(pcode);
		}
	}
});

export default useSystemStore;
