<template>
	<div class="widget-cate">{{ title }}</div>
	<!--
	  list: 需要绑定的数组
	 :handle=".mover" 只有当鼠标在class为mover类的元素上才能触发拖到事件
   group: 如果一个页面有多个拖拽区域，通过设置group名称可以实现多个区域之间相互拖拽,或者 { name: "...", pull: [true, false, 'clone', array , function], put: [true, false, array , function] }
   :ghost-class="ghostClass" 设置拖动元素的占位符类名,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
  :sort="false" 是否开启排序,如果设置为false,它所在组无法排序
    -->
	<Draggable
		tag="ul"
		item-key="type"
		ghostClass="ghost"
		:group="{ name: 'people', pull: 'clone', put: false }"
		:sort="false"
		:list="list"
	>
		<template #item="{ element }">
			<li v-if="fields.includes(element.type)" class="form-edit-widget-label" :class="{ 'no-put': element.tpye === 'divider' }">
				<a v-if="!element.dev">
					<span>{{ element.label }}</span>
				</a>
				<a v-else style="color: grey; cursor: no-drop">
					<span>{{ element.label }}【研发中】</span>
				</a>
			</li>
		</template>
	</Draggable>
</template>

<script setup>
import Draggable from "vuedraggable";
import { useThemeVars } from "naive-ui";

defineOptions({ name: "ComponentGroup" });

defineProps({
	title: {
		type: String,
		required: true
	},
	fields: {
		type: Array,
		required: true
	},
	list: {
		type: Array,
		required: true
	}
});

const themeVars = useThemeVars();
</script>

<style lang="less">
.widget-cate {
	font-size: 13px;
	padding: 8px 12px;
}

ul {
	margin: 0;
	overflow: hidden;
	padding: 0 10px 10px;
	position: relative;
}

.form-edit-widget-label {
	border: 1px solid #f4f6fc;
	display: block;
	float: left;
	font-size: 12px;
	left: 0;
	line-height: 26px;
	margin: 1%;
	overflow: hidden;
	position: relative;
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 80px;
	text-align: center;

	&:hover {
		border: 1px dashed v-bind("themeVars.primaryColor");
	}

	&:hover > a {
		color: v-bind("themeVars.primaryColor");
	}
}

.form-edit-widget-label > a {
	background: #f4f6fc;
	border: 1px solid #f4f6fc;
	color: #333333;
	cursor: move;
	display: block;
	padding: 0 5px;

	.svg-icon {
		display: inline-block;
		font-size: 14px;
		//margin-left: 8px;
		margin-right: 6px;
		vertical-align: middle;
	}

	span {
		display: inline-block;
		vertical-align: middle;
	}
}

.ghost {
	width: 100%;
	background: #18a058;
	border: 2px solid #18a058;
	box-sizing: border-box;
	position: relative;
	content: "";
	font-size: 0;
	height: 3px;
	outline-width: 0;
	overflow: hidden;
	padding: 0;
	&:after {
		background: #18a058;
	}
}
</style>
