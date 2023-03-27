<template>
	<div class="widget-form-container">
		<n-form
			:inline="widgetForm.config.inline"
			:labelAlign="widgetForm.config.labelAlign"
			:label-placement="widgetForm.config.labelPlacement"
			:labelWidth="widgetForm.config.labelWidth"
			:show-require-mark="!widgetForm.config.hideRequiredMark"
			:show-label="widgetForm.config.showLabel"
		>
			<Draggable
				class="widget-form-list"
				item-key="key"
				ghostClass="ghost"
				handle=".drag-widget"
				:animation="200"
				:group="{ name: 'people' }"
				:list="widgetForm.list"
				@add="handleMoveAdd"
			>
				<!--        #item="{ element, index }"-->
				<template #item="{ element, index }">
					<transition-group name="fade" tag="div">
						<template v-if="element.type === 'grid'">
							<n-grid
								v-if="element.key"
								:key="element.key"
								:class="{ active: widgetFormSelect?.key === element.key }"
								:x-gap="element.options.xGap ?? 0"
								:y-gap="element.options.yGap ?? 0"
								:cols="element.options.cols ?? 24"
								:collapsed="element.options.collapsed"
								:collapsed-rows="element.options.collapsedRows"
								:responsive="element.options.responsive"
								:item-responsive="element.options.itemResponsive"
								@click="handleItemClick(element)"
								class="widget-col widget-view"
							>
								<n-gi v-for="(col, colIndex) of element.columns" :key="colIndex" :span="col.span ?? 0">
									<Draggable
										class="widget-col-list"
										item-key="key"
										ghostClass="ghost"
										handle=".drag-widget"
										:animation="200"
										:group="{ name: 'people' }"
										:no-transition-on-drag="true"
										:list="col.list"
										@add="handleColMoveAdd($event, element, colIndex)"
									>
										<template #item="{ element, index }">
											<transition-group name="fade" tag="div">
												<DesignFormItem
													v-if="element.key"
													:key="element.key"
													:element="element"
													:config="widgetForm.config"
													:selectWidget="widgetFormSelect"
													@click.stop="handleItemClick(element)"
													@copy="handleCopyClick(index, col.list)"
													@delete="handleDeleteClick(index, col.list)"
												/>
											</transition-group>
										</template>
									</Draggable>
									<div class="widget-view-action widget-col-action" v-if="widgetFormSelect?.key === element.key">
										<!--										<SvgIcon iconClass="delete" class-name="delete" />-->
										<n-icon size="20" @click.stop="handleDeleteClick(index, widgetForm.list)">
											<Delete16Regular color="#fff"></Delete16Regular>
										</n-icon>
									</div>

									<div class="widget-view-drag widget-col-drag" v-if="widgetFormSelect?.key === element.key">
										<n-icon size="20" className="drag-widget">
											<MoveOutline color="#fff"></MoveOutline>
										</n-icon>
									</div>
								</n-gi>
							</n-grid>
						</template>
						<template v-else>
							<DesignFormItem
								:widgetForm="widgetForm"
								v-if="element.key"
								:key="element.key"
								:element="element"
								:config="widgetForm.config"
								:selectWidget="widgetFormSelect"
								@click="handleItemClick(element)"
								@copy="handleCopyClick(index, widgetForm.list)"
								@delete="handleDeleteClick(index, widgetForm.list)"
							/>
						</template>
					</transition-group>
				</template>
			</Draggable>
		</n-form>
	</div>
</template>

<script setup>
import Draggable from "vuedraggable";
import { nanoid } from "nanoid";
import { useWindowSize } from "@/hooks/useWindowSize";
import DesignFormItem from "./designFormItem.vue";

defineOptions({ name: "DesignForm" });

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(["update:widgetForm", "update:widgetFormSelect"]);
const props = defineProps({
	widgetForm: {
		type: Object,
		required: true
	},
	widgetFormSelect: {
		type: Object
	}
});

const { height } = useWindowSize();

const containerHeight = computed(() => `${height.value - 105}px`);

// 插入一个元素
const handleListInsert = (key, list, obj) => {
	const newList = [];
	list.forEach(item => {
		if (item.key === key) {
			newList.push(item);
			newList.push(obj);
		} else {
			if (item.type === "table") {
				// eslint-disable-next-line no-param-reassign
				item.columns = item.columns.map(tr =>
					tr.map(td => ({
						...td,
						list: handleListInsert(key, td.list, obj)
					}))
				);
			} else if (item.columns) {
				// eslint-disable-next-line no-param-reassign
				item.columns = item.columns.map(col => ({
					...col,
					list: handleListInsert(key, col.list, obj)
				}));
			}
			newList.push(item);
		}
	});
	console.log("newList=", newList);
	return newList;
};

// 删除一个元素
const handleListDelete = (key, list) => {
	const newList = [];
	list.forEach(item => {
		if (item.key !== key) {
			if (item.type === "table") {
				// eslint-disable-next-line no-param-reassign
				item.columns = item.columns.map(tr =>
					tr.map(td => ({
						...td,
						list: handleListDelete(key, td.list)
					}))
				);
			} else if (item.columns) {
				// eslint-disable-next-line no-param-reassign
				item.columns = item.columns.map(col => ({
					...col,
					list: handleListDelete(key, col.list)
				}));
			}
			newList.push(item);
		}
	});
	return newList;
};

// 删除一个元素
const handleDeleteClick = (index, list) => {
	const oldList = JSON.parse(JSON.stringify(props.widgetForm.list));

	if (list.length - 1 === index) {
		if (index === 0) {
			nextTick(() => emits("update:widgetFormSelect", null));
		} else {
			emits("update:widgetFormSelect", list[index - 1]);
		}
	} else {
		emits("update:widgetFormSelect", list[index + 1]);
	}

	emits("update:widgetForm", {
		...props.widgetForm,
		list: handleListDelete(list[index].key, oldList)
	});
};

// 监听到有新元素拖到编辑器
const handleMoveAdd = event => {
	const { newIndex } = event;

	const key = nanoid().replaceAll("-", ""); // 为拖进来的节点生成一个key
	// 纯数据深拷贝，防止污染原数据, 当拖动进来一个数据时，vuedraggable 会自动把数据插入拖动到的位置
	const list = JSON.parse(JSON.stringify(props.widgetForm.list));
	// // 对数据进行格式化, 为数据插入 key 和 model 以及 rules 校验规则集合
	list[newIndex] = { ...list[newIndex], key, model: `${list[newIndex].type}_${key}`, rules: [] };

	// if (list[newIndex].type === "radio" || list[newIndex].type === "checkbox" || list[newIndex].type === "select") {
	// 	list[newIndex] = {
	// 		...list[newIndex],
	// 		options: {
	// 			...list[newIndex].options,
	// 			options: list[newIndex].options.options.map(item => ({
	// 				...item
	// 			}))
	// 		}
	// 	};
	// }

	// if (list[newIndex].type === "grid") {
	// 	list[newIndex] = { ...list[newIndex], columns: list[newIndex].columns.map(item => ({ ...item })) };
	// }

	emits("update:widgetForm", { ...props.widgetForm, list });
	emits("update:widgetFormSelect", list[newIndex]);
};

// 点击子项
const handleItemClick = row => {
	emits("update:widgetFormSelect", row);
};

// eslint-disable-next-line consistent-return
const handleColMoveAdd = (event, row, index) => {
	const { newIndex, oldIndex, item } = event;
	const list = JSON.parse(JSON.stringify(props.widgetForm.list));

	if (item.className.includes("data-grid")) {
		// eslint-disable-next-line no-unused-expressions
		item.tagName === "DIV" && list.splice(oldIndex, 0, row.columns[index].list[newIndex]);
		row.columns[index].list.splice(newIndex, 1);
		return false;
	}

	const key = nanoid().replaceAll("-", "");

	row.columns[index].list[newIndex] = {
		...row.columns[index].list[newIndex],
		key,
		model: `${row.columns[index].list[newIndex].type}_${key}`,
		rules: []
	};

	if (
		row.columns[index].list[newIndex].type === "radio" ||
		row.columns[index].list[newIndex].type === "checkbox" ||
		row.columns[index].list[newIndex].type === "select"
	) {
		row.columns[index].list[newIndex] = {
			...row.columns[index].list[newIndex],
			options: {
				...row.columns[index].list[newIndex].options,
				// eslint-disable-next-line no-shadow
				options: row.columns[index].list[newIndex].options.options.map(item => ({ ...item }))
			}
		};
	}

	emits("update:widgetFormSelect", row.columns[index].list[newIndex]);
};

const handleCopyClick = (index, list) => {
	const key = nanoid().replaceAll("-", "");
	const oldList = JSON.parse(JSON.stringify(props.widgetForm.list));

	let copyData = {
		...list[index],
		key,
		model: `${list[index].type}_${key}`,
		rules: list[index].rules ?? []
	};

	if (list[index].type === "radio" || list[index].type === "checkbox" || list[index].type === "select") {
		copyData = {
			...copyData,
			options: {
				...copyData.options,
				options: copyData.options.options.map(item => ({ ...item }))
			}
		};
	}

	emits("update:widgetForm", {
		...props.widgetForm,
		list: handleListInsert(list[index].key, oldList, copyData)
	});

	emits("update:widgetFormSelect", copyData);
};
</script>

<style scoped lang="less">
.widget-form-container {
	width: 100%;

	.widget-form-list {
		border: 1px dashed #999999;
		//margin: 5px;
		min-height: v-bind("containerHeight");
		padding: 10px;
		box-sizing: border-box;

		.ghost {
			background: #18a058;
			border: 2px solid #18a058;
			box-sizing: border-box;
			content: "";
			font-size: 0;
			height: 3px;
			outline-width: 0;
			overflow: hidden;
			padding: 0;
		}
	}

	::v-deep(.n-form--inline .widget-form-list) {
		width: 100%;
		display: inline-flex;
		align-items: flex-start;
		align-content: space-around;
	}
}

.widget-col-list {
	background: #fff;
	border: 1px dashed #ccc;
	min-height: 50px;
	height: auto;
}

.widget-col {
	background-color: rgba(253, 246, 236, 0.3);
	padding: 5px;
	&:hover {
		background: #fdf6ec;
		outline-offset: 0px;
		outline: 1px solid #f0a020;
	}
	&:hover.active {
		border: 1px solid #f0a020;
		outline-offset: 0;
		outline: 2px solid #f0a020;
	}
	.widget-view-action.widget-col-action {
		background: #f0a020;
		bottom: -2px;
		height: 28px;
		line-height: 28px;
		position: absolute;
		right: -2px;
		z-index: 10;
		.svg-icon {
			color: #ffffff;
			cursor: move;
			font-size: 14px;
			margin: 0 5px;
		}
		.svg-icon.delete {
			cursor: pointer;
		}
	}
	.widget-view-drag.widget-col-drag {
		background: #f0a020;
		height: 28px;
		left: -2px;
		line-height: 28px;
		position: absolute;
		top: -2px;
		z-index: 10;
		.svg-icon {
			color: #fff;
			cursor: move;
			font-size: 14px;
			margin: 0 5px;
		}
	}
	&:after {
		display: none;
	}
}
.widget-col.active {
	border: 1px solid #f0a020;
	outline: 2px solid #f0a020;
}
</style>
