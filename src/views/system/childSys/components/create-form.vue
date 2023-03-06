<template>
	<lay-layer
		v-model="visible"
		:btn="[
			{ text: '确认', callback: handleOk },
			{ text: '取消', callback: handleClose }
		]"
		:maxmin="true"
		:resize="true"
		:shadeClose="false"
		:title="title"
		:type="1"
		:zIndex="100"
		area="700px"
		@close="handleClose"
	>
		<div class="form" style="width: 100%; padding: 0 50px; margin-top: 20px">
			<n-form
				ref="formRef"
				:model="formValue"
				:rules="rules"
				label-placement="left"
				label-width="auto"
				require-mark-placement="left"
			>
				<n-form-item v-show="false" path="id">
					<n-input v-model:value="formValue.id" placeholder="请输入ID" />
				</n-form-item>
				<n-form-item label="系统名称:" path="sysName">
					<n-input v-model:value="formValue.sysName" placeholder="请输入系统名称" />
				</n-form-item>
				<n-form-item label="系统类型:" path="sysType">
					<n-select
						v-model:value="formValue.sysType"
						:options="typeOptions"
						clearable
						placeholder="请选择系统类型"
						style="width: 100%"
					/>
				</n-form-item>
				<n-form-item label="是否内部系统:" path="ifInternal">
					<n-radio-group v-model:value="formValue.ifInternal" name="radiogroup">
						<n-space>
							<n-radio v-for="item in options" :key="item.value" :value="item.value">
								{{ item.label }}
							</n-radio>
						</n-space>
					</n-radio-group>
				</n-form-item>
				<n-form-item label="系统首页地址:" path="sysIndexUrl">
					<n-input v-model:value="formValue.sysIndexUrl" placeholder="请输入系统首页地址" />
				</n-form-item>
				<n-form-item label="系统描述:" path="sysDescr">
					<n-input v-model:value="formValue.sysDescr" placeholder="请输入系统描述" />
				</n-form-item>
				<n-form-item label="显示顺序:" path="showNum">
					<n-input-number
						v-model:value="formValue.showNum"
						:max="1000"
						:min="1"
						clearable
						placeholder="请输入"
						style="width: 100%"
					/>
				</n-form-item>
				<n-form-item label="系统logo:" path="sysLogo">
					<n-input v-model:value="formValue.sysLogo" placeholder="请输入系统logo" />
				</n-form-item>
			</n-form>
		</div>
	</lay-layer>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { saveOrUptSystem } from "@/api/system/childSys";

const emits = defineEmits(["ok"]);
const title = ref("");
const visible = ref(false);
const formRef = ref();
const message = useMessage();
const options = ref([
	{
		label: "是",
		value: "1"
	},
	{
		label: "否",
		value: "0"
	}
]);
const typeOptions = ref([
	{
		label: "B/S架构",
		value: "1"
	},
	{
		label: "C/S架构",
		value: "2"
	}
]);

const formValue = ref({
	id: null,
	sysName: "",
	sysType: undefined,
	sysDescr: "",
	sysIndexUrl: "",
	ifInternal: "1",
	sysLogo: "",
	showNum: null
});

const rules = {
	sysName: { required: true, message: "请输入系统名称", trigger: "blur" },
	sysType: { required: true, message: "请选择系统类型", trigger: "blur" },
	sysIndexUrl: { required: true, message: "请输入系统首页地址", trigger: "blur" },
	ifInternal: { required: true, message: "请选择", trigger: "blur" }
};

const add = () => {
	title.value = "新增参数";
	visible.value = true;
};

const edit = row => {
	title.value = "编辑参数";
	visible.value = true;
	formValue.value = {
		id: `${row.id}`,
		sysName: row.sysName,
		sysType: `${row.sysType}`,
		sysDescr: row.sysDescr,
		sysIndexUrl: row.sysIndexUrl,
		ifInternal: `${row.ifInternal}`,
		sysLogo: row.sysLogo,
		showNum: row.showNum
	};
};

const handleClose = () => {
	formRef.value?.restoreValidation();
	visible.value = false;
	title.value = "";
	formValue.value = {
		id: null,
		sysName: "",
		sysType: undefined,
		sysDescr: "",
		sysIndexUrl: "",
		ifInternal: "1",
		sysLogo: "",
		showNum: null
	};
};

// eslint-disable-next-line no-unused-vars
const handleOk = () => {
	console.log(formValue.value);
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUptSystem({ ...formValue.value }).then(res => {
				if (res.success) {
					message.success("参数提交成功");
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

defineExpose({ add, edit });
</script>

<style lang="less" scoped>
.uploadImage {
	width: 150px;
	height: 150px;
	border: 1px dashed #ccc;
	cursor: pointer;

	:deep(.n-upload-trigger) {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:deep(img) {
		width: 100%;
		height: 100%;
	}
}
</style>
