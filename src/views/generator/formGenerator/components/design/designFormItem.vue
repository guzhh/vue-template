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
			<n-input placeholder="输入姓名" />
		</n-form-item>
		<div class="widget-view-action" v-if="selectWidget?.key === element.key">
			<!--			<SvgIcon iconClass="copy" @click.stop="$emit('copy')" />-->
			<!--			<SvgIcon iconClass="delete" @click.stop="$emit('delete')" />-->
			<n-icon size="20" @click.stop="$emit('copy')">
				<Copy color="#ffffff">></Copy>
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

<script setup>
import { useThemeVars } from "naive-ui";

defineOptions({ name: "DesignFormItem" });

defineEmits(["copy", "delete"]);
defineProps({
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
});

const themeVars = useThemeVars();
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
		bottom: 5px;
		height: 28px;
		line-height: 28px;
		position: absolute;
		right: 10px;
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
		left: 10px;
		line-height: 28px;
		position: absolute;
		top: 5px;
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
