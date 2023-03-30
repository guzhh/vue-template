<template>
	<page-content>
		<div style="display: flex; justify-content: space-between">
			<n-card
				size="small"
				title="组件"
				header-style="padding: 7px;"
				style="width: 200px; margin-right: 5px; flex-shrink: 0"
				content-style="overflow: auto; padding: 8px 0 8px 8px;"
				:style="{ height: `${height - 15}px` }"
				:segmented="{ content: true }"
			>
				<n-scrollbar>
					<component-group title="基础组件" :fields="basicFields" :list="naiveui.basicComponents" />
					<ComponentGroup title="布局组件" :fields="layoutFields" :list="naiveui.layoutComponents" />
				</n-scrollbar>
			</n-card>
			<n-card
				size="small"
				title="设计器"
				header-style="padding: 7px;"
				content-style="overflow: auto;"
				:style="{ height: `${height - 15}px` }"
				:segmented="{ content: true }"
			>
				<template #header-extra>
					<n-button text @click="handleGenerateJson"> 生成JSON</n-button>
				</template>
				<design-form v-model:widget-form="state.widgetForm" v-model:widgetFormSelect="state.widgetFormSelect" />
			</n-card>
			<n-card
				size="small"
				content-style="padding: 0;"
				style="margin-left: 5px; width: 300px; flex-shrink: 0"
				:style="{ height: `${height - 15}px` }"
			>
				<n-tabs type="line" :tabs-padding="20" pane-style="padding: 20px;height: 100%; overflow: auto">
					<n-tab-pane name="widget" tab="字段属性">
						<!--						<DesignConfig v-model:select="state.widgetFormSelect" />-->
					</n-tab-pane>
					<n-tab-pane name="form" tab="表单属性">
						<form-config v-model:config="widgetForm.config"></form-config>
					</n-tab-pane>
				</n-tabs>
			</n-card>
		</div>
	</page-content>
</template>

<script setup>
import { useWindowSize } from "@/hooks/useWindowSize";
import { naiveui } from "./config";
import FormConfig from "./components/formConfig.vue";
import DesignForm from "./components/design/designForm.vue";
import ComponentGroup from "./components/componentGroup.vue";
// import DesignConfig from "./components/design/designConfig.vue";

defineOptions({ name: "formGenerator" });

const { height } = useWindowSize();
const basicFields = ["input", "number", "radio", "checkbox", "time", "date", "rate", "select", "switch", "slider", "color"];
const layoutFields = ["grid"];

const widgetForm = JSON.parse(JSON.stringify(naiveui.widgetForm));
// eslint-disable-next-line no-restricted-syntax
for (const key in naiveui.widgetForm) {
	if (typeof naiveui.widgetForm[key] === "function") {
		widgetForm[key] = naiveui.widgetForm[key];
	}
}

const state = reactive({
	widgetForm,
	widgetFormSelect: undefined
});

const handleGenerateJson = () => {
	console.log(JSON.stringify(state.widgetForm, null, 2));
};
</script>

<style scoped></style>
