<template>
	<lay-layer
		v-model="visible"
		:resize="true"
		:shadeClose="false"
		:maxmin="true"
		:type="1"
		:zIndex="100"
		area="1000px"
		:title="title"
		@close="handleClose"
		:btn="[
			{ text: '确认', callback: handleOk },
			{ text: '取消', callback: handleClose }
		]"
	>
		<n-form
			ref="formRef"
			:label-width="80"
			:model="formValue"
			:rules="rules"
			label-placement="left"
			require-mark-placement="left"
			style="padding: 15px 10px 0 10px"
		>
			<n-grid x-gap="12" :cols="3">
				<n-gi>
					<n-form-item path="sysId" label="所属系统">
						<n-select filterable v-model:value="formValue.sysId" :options="systemList" placeholder="请选择所属系统" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item path="pid" label="上级资源">
						<n-tree-select
							default-expand-all
							placeholder="请选择上级资源"
							v-model:value="formValue.pid"
							:options="[{ name: '顶级资源', id: 0 }, ...treeData]"
							label-field="name"
							key-field="id"
							children-field="children"
						/>
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item path="showNum" label="资源序号">
						<n-input-number v-model:value="formValue.showNum" clearable placeholder="请输入资源序号" style="width: 100%" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item path="name" label="资源名称">
						<n-input v-model:value="formValue.name" placeholder="请输入资源名称" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item path="permissionFlag" label="权限标识">
						<n-input v-model:value="formValue.permissionFlag" placeholder="请输入资源权限标识" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item path="type" label="资源类型">
						<n-select v-model:value="formValue.type" :options="typeFlagOptions" placeholder="请选择资源类型" />
					</n-form-item>
				</n-gi>
				<n-gi v-if="formValue.type == 1">
					<n-form-item path="linkType" label="链接类型">
						<n-select v-model:value="formValue.linkType" :options="lintTypeOptions" placeholder="请选择连接类型" />
					</n-form-item>
				</n-gi>
				<n-gi v-if="formValue.type != 2 && formValue.linkType != 1">
					<n-form-item path="url" label="资源地址">
						<n-input v-model:value="formValue.url" placeholder="请输入资源地址" />
					</n-form-item>
				</n-gi>
				<n-gi v-if="formValue.type != 2 && formValue.linkType != 1">
					<n-form-item path="compName" label="组件名称">
						<n-input v-model:value="formValue.compName" placeholder="请输入组件名称" />
					</n-form-item>
				</n-gi>
				<n-gi v-if="formValue.type != 2 && formValue.linkType != 1">
					<n-form-item path="ifcache" label="是否缓存">
						<n-select v-model:value="formValue.ifcache" :options="ifcacheOptions" placeholder="请选择是否缓存" />
					</n-form-item>
				</n-gi>
				<n-gi v-if="formValue.type == 1">
					<n-form-item path="hidden" label="是否隐藏菜单">
						<n-select v-model:value="formValue.hidden" :options="ifcacheOptions" placeholder="请选择是否隐藏菜单" />
					</n-form-item>
				</n-gi>
				<n-gi v-if="formValue.linkType != 3">
					<n-form-item path="linkValue" label="链接地址">
						<n-input v-model:value="formValue.linkValue" placeholder="请输入链接地址" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item path="extend" label="扩展字段">
						<n-input v-model:value="formValue.extend" placeholder="请输入扩展字段值" />
					</n-form-item>
				</n-gi>
				<n-gi>
					<n-form-item path="icon" label="资源图标">
						<n-input v-model:value="formValue.icon" placeholder="请输入资源图标" />
					</n-form-item>
				</n-gi>
			</n-grid>
			<iframe src="https://xicons.org/#/" style="width: 100%; height: 500px"></iframe>
		</n-form>
	</lay-layer>
</template>

<script setup>
import { ref } from "vue";
import { typeFlagOptions, ifcacheOptions, lintTypeOptions } from "@/constant/system/resource";
import { saveOrUptResource, getSystemList } from "@/api/system/resource";

defineOptions({ name: "resource-form" });

defineProps({
	treeData: {
		type: Array,
		required: true,
		default() {
			return [];
		}
	}
});

const emits = defineEmits(["ok"]);
const title = ref("");
const visible = ref(false);
const systemList = ref([]);

const defaultForm = {
	pid: null,
	name: "",
	sysId: null,
	url: "",
	compName: "",
	type: 1,
	icon: null,
	permissionFlag: "",
	showNum: null,
	ifcache: 0,
	hidden: 0,
	hideChildren: 0,
	linkType: 3,
	linkValue: "",
	extend: ""
};
const formRef = ref();
const formValue = ref({ ...defaultForm });
const rules = {
	sysId: { type: "number", required: true, message: "请选择所属系统", trigger: ["blur", "change"] },
	pid: { type: "number", required: true, message: "请选择上级资源", trigger: ["blur", "change"] },
	name: { required: true, message: "请输入资源名称", trigger: "blur" },
	url: { required: true, message: "请输入资源地址", trigger: "blur" },
	compName: { required: true, message: "请输入组件名称", trigger: "blur" },
	permissionFlag: { required: true, message: "请输入资源权限标识", trigger: "blur" },
	showNum: { type: "number", required: true, message: "请输入资源序号", trigger: "blur" }
};

getSystemList({ ifInternal: 1 }).then(res => {
	if (res.success) {
		systemList.value = res.result.map(item => {
			return { label: item.sysName, value: item.id };
		});
	}
});

// 新增资源
const openModal = () => {
	title.value = "新增资源";
	visible.value = true;
};

// 编辑资源
const edit = row => {
	title.value = "编辑资源";
	visible.value = true;
	formValue.value = { ...row };
};

// 克隆资源
const cloning = row => {
	title.value = "新增资源";
	visible.value = true;
	formValue.value = { ...row, id: null };
};

const handleClose = () => {
	visible.value = false;
	formValue.value = { ...defaultForm };
};

const handleOk = () => {
	visible.value = false;
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUptResource(formValue.value).then(res => {
				if (res.success) {
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ openModal, edit, cloning });
</script>

<style scoped></style>
