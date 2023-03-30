<template>
	<div class="widget-item-container">
		<n-form-item
			class="widget-view"
			v-if="element"
			:key="element.key"
			:class="{ active: selectWidget?.key === element.key }"
			:rules="element.options.rules"
			:label="element.label"
			:show-require-mark="!config.hideRequiredMark && (element.options.rules ? element.options.rules.required : false)"
			:show-label="element.options.showLabel"
		>
			<!--   文字输入框   -->
			<template v-if="element.type === 'input'">
				<n-input
					:type="element.options.type"
					:size="config.size"
					v-model:value="value"
					:style="{ width: element.options.width }"
					:placeholder="element.options.placeholder"
					:maxlength="parseInt(element.options.maxlength)"
					:disabled="element.options.disabled"
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
			<!--   数字输入框   -->
			<template v-if="element.type === 'number'">
				<n-input-number
					:clearable="element.options.allowClear"
					v-model:value="data"
					:size="config.size"
					:style="{ width: element.options.width }"
					:max="element.options.max"
					:min="element.options.min"
					:disabled="disabled || element.options.disabled"
					:round="element.options.round"
					@change="handleChange"
				/>
			</template>
		</n-form-item>
		<div class="widget-view-action" v-if="selectWidget?.key === element.key">
			<n-icon size="20" @click.stop="$emit('copy')">
				<Copy color="#ffffff"></Copy>
			</n-icon>
			<n-icon size="20" @click.stop="$emit('delete')">
				<Delete16Regular color="#ffffff"></Delete16Regular>
			</n-icon>
		</div>

		<div class="widget-view-drag" v-if="selectWidget?.key === element.key">
			<!--			<SvgIcon iconClass="move" className="drag-widget" />-->
			<n-icon size="20" className="drag-widget" class="drag-widget">
				<MoveOutline color="#ffffff"></MoveOutline>
			</n-icon>
		</div>
	</div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useThemeVars } from "naive-ui";
import eventMixin from "@/views/generator/formGenerator/mixins/eventMixin";

export default {
	name: "NaiveWidgetFormItem",
	mixins: [eventMixin],
	components: {},
	props: {
		config: {
			type: Object,
			required: true
		},
		element: {
			type: Object,
			required: true
		},
		selectWidget: {
			type: Object
		},
		widgetForm: {
			type: Object
		}
	},
	emits: ["copy", "delete"],
	data() {
		return {};
	},
	computed: {
		value: {
			get() {
				return this.element.options.defaultValue;
			},
			set(val) {
				// eslint-disable-next-line vue/no-mutating-props
				this.element.options.defaultValue = val;
			}
		}
	},
	setup() {
		const themeVars = useThemeVars();
		const handleFilterOption = (input, option) => option.label.toLowerCase().includes(input);

		return {
			themeVars,
			pattern: ref(""),
			handleFilterOption
		};
	}
};
</script>

<style scoped lang="less">
.widget-item-container {
	position: relative;

	&:hover {
		background: #eafaef;
		//outline-offset: 0;
		//outline: 1px solid v-bind("themeVars.primaryColor");
		//.widget-view-drag {
		//	display: block;
		//}
	}

	.widget-view {
		background-color: rgba(236, 245, 255, 0.3);
		border: 1px dashed rgba(170, 170, 170, 0.7);
		margin: 2px;
		position: relative;
		padding: 5px;

		&:after {
			bottom: 0;
			display: block;
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
		}

		&:hover {
			background: #eafaef;
			outline-offset: 0;
			outline: 1px solid v-bind("themeVars.primaryColor");

			.widget-view-drag {
				display: block;
			}
		}

		&:hover.active {
			border: 1px solid v-bind("themeVars.primaryColor");
			outline-offset: 0;
			outline: 2px solid v-bind("themeVars.primaryColor");
		}
	}

	.widget-view.active {
		border: 1px solid v-bind("themeVars.primaryColor");
		outline: 2px solid v-bind("themeVars.primaryColor");
	}

	.widget-view-action {
		background: v-bind("themeVars.primaryColor");
		bottom: 0px;
		height: 28px;
		line-height: 28px;
		position: absolute;
		right: 0px;
		z-index: 10;
		display: flex;
		align-items: center;

		::v-deep(.n-icon) {
			cursor: pointer;
			font-size: 14px;
			margin: 0 5px;
		}
	}

	.widget-view-drag {
		background: v-bind("themeVars.primaryColor");
		height: 28px;
		left: 0px;
		line-height: 28px;
		position: absolute;
		top: 0px;
		z-index: 10;
		display: flex;
		align-items: center;

		::v-deep(.n-icon) {
			font-size: 14px;
			margin: 0 5px;
			cursor: move;
		}
	}
}
</style>
