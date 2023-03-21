<template>
	<base-modal style="width: 700px" :title="title" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<div style="width: 100%; padding: 0 20px; margin-top: 20px">
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
				<n-form-item v-show="false" path="pcode">
					<n-input v-model:value="formValue.pcode" placeholder="请输入pcode" />
				</n-form-item>
				<n-form-item label="科室名称" path="name">
					<n-input v-model:value="formValue.name" placeholder="请输入科室名称" />
				</n-form-item>
				<n-form-item label="三方科室编码" path="outCode">
					<n-input v-model:value="formValue.outCode" placeholder="请输入三方科室编码" />
				</n-form-item>
				<n-form-item label="科室介绍" path="descr">
					<n-input v-model:value="formValue.descr" :resizable="false" placeholder="请输入科室介绍" type="textarea" />
				</n-form-item>
			</n-form>
		</div>
	</base-modal>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { saveOrUptDept } from "@/api/system/depAdmin";

const emits = defineEmits(["ok"]);
const title = ref("");
const visible = ref(false);
const formRef = ref();
const message = useMessage();
const addRow = ref({});

const formValue = ref({
	id: null,
	pcode: "",
	code: "",
	name: "",
	descr: "",
	orgCode: "",
	outCode: ""
});

const rules = {
	name: { required: true, message: "请输入科室名称", trigger: "blur" },
	orgCode: { required: true, message: "请选择所属机构", trigger: "blur" }
};

// eslint-disable-next-line no-unused-vars
const add = ({ row, orgCode }) => {
	title.value = "新增科室";
	visible.value = true;
	if (row.id) {
		title.value = "新增下级科室";
		formValue.value.pcode = row.code;
		addRow.value = row;
	}
	formValue.value.orgCode = orgCode;
};

const edit = row => {
	title.value = "编辑科室";
	formValue.value = {
		id: `${row.id}`,
		pcode: row.pcode,
		code: row.code,
		name: row.name,
		descr: row.descr,
		orgCode: row.orgCode,
		outCode: row.outCode
	};
	addRow.value = row;
	visible.value = true;
};

const handleClose = () => {
	formRef.value?.restoreValidation();
	visible.value = false;
	title.value = "";
	formValue.value = {
		id: null,
		pcode: "",
		code: "",
		name: "",
		descr: "",
		orgCode: "",
		outCode: ""
	};
	addRow.value = {};
};

// eslint-disable-next-line no-unused-vars
const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUptDept({ ...formValue.value }).then(res => {
				if (res.success) {
					message.success("保存成功");
					// 判断是否是编辑
					if (!formValue.value.id) {
						emits("ok", addRow.value, false);
					} else {
						emits("ok", addRow.value, true);
					}
					handleClose();
				}
			});
		}
	});
};

defineExpose({ add, edit });
</script>

<style scoped></style>
