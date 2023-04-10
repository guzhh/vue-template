<template>
	<n-form
		ref="generateForm"
		:model="model"
		:rules="rules"
		:inline="widgetForm.config.inline"
		:labelAlign="widgetForm.config.labelAlign"
		:label-placement="widgetForm.config.labelPlacement"
		:labelWidth="widgetForm.config.labelWidth"
		:show-require-mark="!widgetForm.config.hideRequiredMark"
		:show-label="widgetForm.config.showLabel"
	>
		<template v-for="element of widgetForm.list">
			<template v-if="element.type === 'grid'">
				<n-grid
					v-if="element.key"
					:key="element.key"
					:x-gap="element.options.xGap ?? 0"
					:y-gap="element.options.yGap ?? 0"
					:cols="element.options.cols ?? 24"
					:collapsed="element.options.collapsed"
					:collapsed-rows="element.options.collapsedRows"
					:responsive="element.options.responsive"
					:item-responsive="element.options.itemResponsive"
				>
					<n-gi v-for="(col, colIndex) of element.columns" :key="colIndex" :span="col.span ?? 0">
						<GenerateFormItem
							v-for="colItem of col.list"
							:model="model"
							:key="colItem.key"
							:element="colItem"
							:config="data.config"
							:disabled="disabled"
							:widgetForm="widgetForm"
						/>
					</n-gi>
				</n-grid>
			</template>
		</template>
	</n-form>
</template>

<script setup>
import { naiveui } from "../config";
import GenerateFormItem from "./generateFormItem.vue";

const props = defineProps({
	data: {
		type: Object,
		default: naiveui.widgetForm
	},
	value: {
		type: Object
	},
	disabled: {
		type: Boolean,
		default: false
	}
});

const formJson = (props.data && JSON.parse(JSON.stringify(props.data))) ?? naiveui.widgetForm;
Object.keys(naiveui.widgetForm).forEach(key => {
	if (naiveui.widgetForm.hasOwnProperty.call(key) && typeof naiveui.widgetForm[key] === "function") {
		formJson[key] = naiveui.widgetForm[key];
	}
});

const model = ref({});
const rules = ref({});
const widgetForm = ref(formJson);

// const generateModel = list => {
// 	for (let i = 0; i < list.length; i++) {
// 		// const
// 	}
// };
</script>

<style scoped></style>
