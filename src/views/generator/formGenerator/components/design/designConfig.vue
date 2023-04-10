<template>
	<n-form layout="vertical" v-if="data" :key="data.key">
		<n-form-item label="字段标识" v-if="data.type !== 'grid'">
			<n-input v-model:value="data.model" />
		</n-form-item>

		<n-form-item label="标题" v-if="data.type !== 'grid' && data.options.showLabel">
			<n-input v-model:value="data.label" />
		</n-form-item>

		<n-form-item label="宽度" v-if="hasKey('width')">
			<n-input v-model:value="data.options.width" />
		</n-form-item>

		<n-form-item label="高度" v-if="hasKey('height')">
			<n-input v-model:value="data.options.height" />
		</n-form-item>

		<n-form-item label="占位内容" v-if="hasKey('placeholder')">
			<n-input v-model:value="data.options.placeholder" />
		</n-form-item>
		{{ data.type }}{{ checkComponent(data.type) }}
		<component v-if="checkComponent(data.type)" :is="componentsMap[data.type]" :select="data" />
	</n-form>
</template>

<script setup>
import Input from "../configs/Input.vue";
import Number from "../configs/Number.vue";
import Grid from "../configs/Grid.vue";
import { checkComponent } from "@/views/generator/formGenerator/enums";

const emits = defineEmits(["update:select"]);

const props = defineProps({
	select: { type: Object }
});

const componentsMap = {
	input: Input,
	number: Number,
	grid: Grid
};

const data = ref(props.select);

watch(
	() => props.select,
	val => {
		data.value = val;
	}
);

watch(data, val => emits("update:select", val));

// 判断表单元素是否需要某个配置字段
const hasKey = key => Object.keys(data.value.options).includes(key);
</script>

<style scoped></style>
