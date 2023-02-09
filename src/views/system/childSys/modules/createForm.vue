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
		<div class="form" style="width: 100%; margin-top: 20px; padding: 0 50px">
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
					<!--					<n-input v-model:value="formValue.sysLogo" placeholder="请输入系统logo" />-->
					<n-upload
						:custom-request="UPactions"
						:show-file-list="false"
						accept="image/*"
						action=""
						class="uploadImage"
						list-type="image"
						@before-upload="beforeUpload"
					>
						<n-image v-if="formValue.sysLogo" :preview-disabled="true" :src="BaseUrl + '/' + formValue.sysLogo" />
						<n-icon v-else color="#ccc" size="30">
							<Plus />
						</n-icon>
					</n-upload>
				</n-form-item>
			</n-form>
		</div>
	</lay-layer>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { saveOrUptSystem } from "@/api/system/childSys";
import { uploadImage } from "@/api/system/index";

const emits = defineEmits(["ok"]);
const BaseUrl = import.meta.env.VITE_BASE_IMAGE_URL;
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

const beforeUpload = data => {
	const isJpgOrPng =
		data.file.type === "image/jpeg" ||
		data.file.type === "image/png" ||
		data.file.type === "image/jpg" ||
		data.file.type === "image/webp" ||
		data.file.type === "image/svg";
	if (!isJpgOrPng) {
		message.error("图片格式不正确！");
	}
	const isLt2M = data.file.file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("图片大小不能超过2MB!");
	}
	return isJpgOrPng && isLt2M;
};
const UPactions = ({ file, onFinish }) => {
	const param = new FormData(); // 创建form对象
	param.append("file", file.file, file.name);
	param.append("type", 1);
	console.log(param, "param");
	uploadImage(param).then(res => {
		if (res.success) {
			formValue.value.sysLogo = res.result.url;
			onFinish();
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
