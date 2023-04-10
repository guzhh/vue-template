<template>
	<n-form-item
		v-if="element"
		:key="element.key"
		:label="element.label"
		:rule="element.options.rules"
		:show-require-mark="!config.hideRequiredMark && (element.options.rules ? element.options.rules.required : false)"
		:path="element.model"
		:show-label="element.options.showLabel"
	>
		<template v-if="element.type === 'input'">
			<n-input
				:type="element.options.type"
				:size="config.size"
				v-model:value="data"
				:style="{ width: element.options.width }"
				:placeholder="element.options.placeholder"
				:maxlength="parseInt(element.options.maxlength)"
				:disabled="disabled || element.options.disabled"
				:clearable="element.options.allowClear"
				:round="element.options.round"
				:show-count="element.options.showCount"
				show-password-on="click"
				@change="handleChange"
			>
				<template #prefix v-if="element.options.prefix">
					{{ element.options.prefix }}
				</template>
				<template #suffix v-if="element.options.suffix">
					{{ element.options.suffix }}
				</template>
				<template #count="{ value }">
					{{ value.length }}{{ element.options.maxlength ? " / " + element.options.maxlength : "" }}
				</template>
			</n-input>
		</template>
	</n-form-item>
</template>

<script>
import eventMixin from "../mixins/eventMixin";

export default {
	name: "generateFormItem",
	mixins: [eventMixin],
	props: {
		widgetForm: {
			type: Object
		},
		config: {
			type: Object,
			required: true
		},
		element: {
			type: Object,
			required: true
		},
		model: {
			type: Object,
			required: true
		},
		disabled: {
			type: Boolean,
			required: true
		}
	},
	setup(props) {
		const data = computed({
			// get: () => 1,
			get: () => props.model[props.element.model],
			set: val => {
				// eslint-disable-next-line vue/no-mutating-props,no-param-reassign
				props.model[props.element.model] = val;
			}
		});
		return { data };
	}
};
</script>

<style scoped></style>
