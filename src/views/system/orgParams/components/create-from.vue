<!--
  文件描述：
  创建时间：2024/2/23 17:20
  创建人：gzh
-->
<template>
	<base-modal style="width: 1000px" title="配置描述" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<n-form
			ref="formRef"
			:model="formValue"
			:rules="rules"
			label-placement="left"
			label-width="auto"
			require-mark-placement="left"
		>
			<n-grid :cols="24" :x-gap="24">
				<n-form-item-gi label="配置项" path="typeName" :span="12">
					<n-input v-model:value="formValue.typeName" placeholder="请输入配置项名称" />
				</n-form-item-gi>
				<n-form-item-gi label="配置编码" path="typeCode" :span="12">
					<n-input v-model:value="formValue.typeCode" placeholder="请输入配置项编码" />
				</n-form-item-gi>
			</n-grid>
			<vxe-table
				stripe
				resizable
				row-id="id"
				border="inner"
				align="center"
				show-overflow
				size="small"
				:data="formValue.paramConfig"
				show-header-overflow="title"
				:row-config="{ isHover: true, isCurrent: true }"
			>
				<vxe-column field="model" width="150" show-overflow="title" title="model">
					<template #header>
						<div class="first-col" style="display: flex; align-items: center">
							<n-button strong secondary circle type="primary" size="small" @click="addConfig">
								<template #icon>
									<n-icon size="12">
										<add12-filled />
									</n-icon>
								</template>
							</n-button>
							<span style="margin-left: 10px"> <span style="color: #ff5555">*</span> model</span>
						</div>
					</template>
					<template #default="{ row }">
						<n-input v-model:value="row.model" placeholder="字段model" size="small" />
					</template>
				</vxe-column>
				<vxe-column field="name" width="150" show-overflow="title" title="name">
					<template #header>
						<span style="margin-left: 10px"> <span style="color: #ff5555">*</span> label</span>
					</template>
					<template #default="{ row }">
						<n-input v-model:value="row.name" placeholder="字段title" size="small" />
					</template>
				</vxe-column>
				<vxe-column field="placeholder" min-width="150px" show-overflow="title" title="字段说明">
					<template #default="{ row }">
						<n-input v-model:value="row.placeholder" placeholder="字段说明" size="small" />
					</template>
				</vxe-column>
				<vxe-column field="options" min-width="150px" show-overflow="title" title="可选值">
					<template #default="{ row }">
						<n-input v-model:value="row.options" placeholder="字段可选值" size="small" />
					</template>
				</vxe-column>
				<vxe-column field="defalutVal" min-width="150px" show-overflow="title" title="默认值">
					<template #default="{ row }">
						<n-input v-model:value="row.defalutVal" placeholder="字段默认值" size="small" />
					</template>
				</vxe-column>
				<vxe-column field="required" min-width="70" show-overflow="title" title="必填">
					<template #default="{ row }">
						<n-checkbox v-model:checked="row.required"></n-checkbox>
					</template>
				</vxe-column>
				<vxe-column width="50" show-overflow="title">
					<template #default="{ row, rowIndex }">
						<n-button strong secondary circle type="error" size="small" title="删除" @click="delConfig(row, rowIndex)">
							<template #icon>
								<n-icon>
									<delete-outlined />
								</n-icon>
							</template>
						</n-button>
					</template>
				</vxe-column>
			</vxe-table>
			<div style="height: 15px"></div>
			<n-form-item label="参数描述" path="paramDescr">
				<n-input v-model:value="formValue.paramDescr" type="textarea" placeholder="请输入参数描述" />
			</n-form-item>
		</n-form>
	</base-modal>
</template>

<script setup>
import { Add12Filled } from "@vicons/fluent";
import { DeleteOutlined } from "@vicons/antd";
import validator from "@/validator";
import { paramConfigSchema } from "@/validator/system/orgParams";
import { isJSONString } from "@/utils";
// eslint-disable-next-line no-unused-vars
import { saveOrUptOrgParam } from "@/api/system/orgParams";

defineOptions({ name: "createFrom" });

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(["ok"]);
const formRef = ref(null);
const visible = ref(false);
const message = useMessage();
const formValue = ref({ typeCode: null, typeName: null, paramConfig: [] });
const rules = {
	typeCode: [{ required: true, message: "请输入配置项编码", trigger: "blur" }],
	typeName: [{ required: true, message: "请输入配置项名称", trigger: "blur" }]
};

const addConfig = () => {
	formValue.value.paramConfig.push({
		model: null,
		name: null,
		placeholder: null,
		options: null,
		defalutVal: null,
		required: false
	});
};

const delConfig = (row, rowIndex) => {
	formValue.value.paramConfig = formValue.value.paramConfig.filter((item, index) => index !== rowIndex);
};

const handleClose = () => {
	visible.value = false;
	formValue.value = { typeCode: null, typeName: null, paramConfig: [] };
};

const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			if (formValue.value.paramConfig.length <= 0) {
				message.error("请至少添加一个字段配置");
				return;
			}
			validator({ data: formValue.value.paramConfig, schema: paramConfigSchema }).then(() => {
				const paramConfig = {};
				// 格式化每个字段配置；格式化为：{"useCaptcha":{"name":"登录验证码","model":"useCaptcha","placeholder":"是否启用登录验证码","options":"true,false","defalutVal":"true"}}
				formValue.value.paramConfig.forEach(item => {
					paramConfig[item.model] = {
						name: item.name,
						model: item.model,
						placeholder: item.placeholder,
						options: item.options,
						defalutVal: item.defalutVal,
						required: item.required
					};
				});
				// 组装请求参数
				const paramsObj = { ...formValue.value, paramConfig: JSON.stringify(paramConfig), paramVal: null };
				// 判断参数值是否为json字符串，如果是则处理请求参数
				if (isJSONString(formValue.value.paramVal)) {
					const modalKey = Object.keys(paramConfig); // 获取字段配置的key
					const paramVal = JSON.parse(formValue.value.paramVal); // 获取参数值
					// 遍历全部参数字段
					Object.keys(paramVal).forEach(key => {
						const orgParamVal = {};
						modalKey.forEach(mKey => {
							orgParamVal[mKey] = paramVal[key][mKey] ? paramVal[key][mKey] : paramConfig[mKey].defalutVal;
						});
						paramVal[key] = orgParamVal;
					});
					paramsObj.paramVal = JSON.stringify(paramVal);
				}
				saveOrUptOrgParam({ ...paramsObj }).then(res => {
					if (res.success) {
						handleClose();
						emits("ok");
					}
				});
			});
		}
	});
};

const add = () => {
	visible.value = true;
};

const edit = row => {
	visible.value = true;
	formValue.value = { ...row, paramConfig: Object.values(JSON.parse(row.paramConfig)) };
};

defineExpose({ add, edit });
</script>

<style scoped></style>
