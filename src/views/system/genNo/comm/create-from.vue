<template>
	<base-modal style="width: 800px" :title="title" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<n-form
			ref="formRef"
			:model="formValue"
			require-mark-placement="left"
			:rules="rules"
			label-placement="left"
			label-width="auto"
			style="padding: 15px 10px 0"
		>
			<n-grid :cols="2" :x-gap="12" :y-gap="4">
				<n-gi>
					<n-form-item label="类型编码" path="typeCode">
						<n-input v-model:value="formValue.typeCode" placeholder="请输入类型编码" :readonly="disEnabel" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item label="类型名称" path="typeName">
						<n-input v-model:value="formValue.typeName" placeholder="请输入类型名称" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item label="编号前缀" path="noPrefix">
						<n-input v-model:value="formValue.noPrefix" placeholder="请输入编号前缀" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item label="当前编号" path="currNo">
						<n-input v-model:value="formValue.currNo" placeholder="请输入当前编号" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item label="是否包含年" path="containYear">
						<n-radio-group v-model:value="formValue.containYear" name="radiogroup">
							<n-space>
								<n-radio v-for="song in genNoOption" :key="song.value" :value="song.value">
									{{ song.label }}
								</n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item label="是否包含月" path="containMonth">
						<n-radio-group v-model:value="formValue.containMonth" name="radiogroup">
							<n-space>
								<n-radio v-for="song in genNoOption" :key="song.value" :value="song.value">
									{{ song.label }}
								</n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item label="是否包含日" path="containDay">
						<n-radio-group v-model:value="formValue.containDay" name="radiogroup">
							<n-space>
								<n-radio v-for="song in genNoOption" :key="song.value" :value="song.value">
									{{ song.label }}
								</n-radio>
							</n-space>
						</n-radio-group>
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item label="递增码位数" path="digit">
						<n-input-number v-model:value="formValue.digit" :show-button="false" style="width: 100%" />
					</n-form-item>
				</n-gi>
			</n-grid>
		</n-form>
		<template #footer>
			<div style="text-align: center; width: 100%">
				<n-button type="tertiary" @click="handleClose"> 取 消 </n-button>
				<n-button type="primary" style="margin-left: 15px" @click="handleOk"> 确定 </n-button>
			</div>
		</template>
	</base-modal>
</template>

<script setup>
import { ref } from "vue";
import { getByCode, saveOrUpt } from "@/api/system/genNo";
import { ifcacheOptions as genNoOption } from "@/constant/system/resource";

const emits = defineEmits(["ok"]);

const formRef = ref();
const visible = ref(false);
const title = ref("");
const deviceList = ref([]);
const disEnabel = ref(false);
const defaultForm = {
	typeCode: null,
	typeName: null,
	noPrefix: null,
	currNo: null,
	containYear: null,
	containMonth: null,
	containDay: null,
	digit: null
};

const formValue = ref({ ...defaultForm });
// 非空
const rules = {
	typeCode: { required: true, message: "请输入类型编码", trigger: "blur" },
	typeName: { required: true, message: "请输入类型名称", trigger: "blur" },
	// noPrefix: { required: true, message: "请输入编号前缀", trigger: "blur" },
	currNo: { required: true, message: "请输入当前编号", trigger: "blur" },
	containYear: { type: "number", required: true, message: "请选择是否包含年", trigger: ["blur", "change"] },
	containMonth: { type: "number", required: true, message: "请选择是否包含月", trigger: ["blur", "change"] },
	containDay: { type: "number", required: true, message: "请选择是否包含日", trigger: ["blur", "change"] },
	digit: { type: "number", required: true, message: "请选择递增码位数", trigger: ["blur", "change"] }
};

const addGenNo = () => {
	visible.value = true;
	title.value = "新增编号自动生成信息";
};

const commonFunc = {
	// 用于给表单赋值，从数据行中提取表单中有的字段，进而产生新的对象
	fillFormVal(data, formFields) {
		const keys = Object.keys(formFields);
		const temp = {};
		keys.forEach(key => {
			temp[key] = data[key];
		});
		return temp;
	}
};

const editGenNo = code => {
	visible.value = true;
	disEnabel.value = true;
	title.value = "编辑编号自动生成信息";
	getByCode({ code }).then(res => {
		if (res.success) {
			formValue.value = commonFunc.fillFormVal(res.result, formValue.value);
		}
	});
};

const handleClose = () => {
	title.value = "";
	visible.value = false;
	formValue.value = { ...defaultForm };
	deviceList.value = [];
	disEnabel.value = false;
};

const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUpt({ ...formValue.value }).then(res => {
				if (res.success) {
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ addGenNo, editGenNo });
</script>

<style scoped></style>
