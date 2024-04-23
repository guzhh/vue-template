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
				<n-form-item label="科室名称" path="name">
					<n-input v-model:value="formValue.name" placeholder="请输入科室名称" />
				</n-form-item>
				<n-form-item label="科室类型">
					<n-select v-model:value="formValue.deptType" :options="deptTypeOption" placeholder="请选择科室类型" />
				</n-form-item>
				<n-form-item label="三方科室编码" path="outCode">
					<n-input v-model:value="formValue.outCode" placeholder="请输入三方科室编码" />
				</n-form-item>
				<n-form-item label="医保编码" path="nmsDeptCode">
					<n-input v-model:value="formValue.nmsDeptCode" placeholder="请输入医保科室编码" />
				</n-form-item>
				<n-form-item label="医保名称" path="nmsDeptName">
					<n-input v-model:value="formValue.nmsDeptName" placeholder="请输入医保科室名称" />
				</n-form-item>
				<n-form-item label="排序号" path="sortNum">
					<n-input-number clearable :precision="0" v-model:value="formValue.sortNum" placeholder="请排序号" style="width: 100%" />
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
import { getDictByPCodes } from "@/api/system/dictList";

const emits = defineEmits(["ok"]);
const title = ref("");
const visible = ref(false);
const formRef = ref();
const message = useMessage();
const addRow = ref({});
const defaultValue = {
	id: null,
	pcode: null,
	code: null,
	name: null,
	descr: null,
	orgCode: null,
	outCode: null,
	deptType: null,
	sortNum: null,
	nmsDeptCode: null,
	nmsDeptName: null
};

const formValue = ref({ ...defaultValue });
const deptTypeOption = ref([]);

const rules = {
	name: { required: true, message: "请输入科室名称", trigger: "blur" },
	orgCode: { required: true, message: "请选择所属机构", trigger: "blur" }
};

// eslint-disable-next-line no-unused-vars
const add = ({ row, orgCode }) => {
	title.value = "新增科室";
	if (row.id) {
		title.value = "新增下级科室";
		formValue.value.pcode = row.code;
		addRow.value = row;
	}
	formValue.value.orgCode = orgCode;
	// eslint-disable-next-line no-use-before-define
	getDeptType();
};

const edit = row => {
	title.value = "编辑科室";
	formValue.value = {
		id: `${row.id}`,
		pcode: row.pcode,
		code: row.code,
		name: row.name,
		sortNum: row.sortNum,
		descr: row.descr,
		orgCode: row.orgCode,
		outCode: row.outCode,
		deptType: row.deptType,
		nmsDeptCode: row.nmsDeptCode,
		nmsDeptName: row.nmsDeptName
	};
	addRow.value = row;
	// eslint-disable-next-line no-use-before-define
	getDeptType();
};

const handleClose = () => {
	formRef.value?.restoreValidation();
	visible.value = false;
	title.value = "";
	formValue.value = { ...defaultValue };
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

// 获取科室类型字典
const getDeptType = () => {
	getDictByPCodes({ pcodes: "DEPT_TYPE", state: 1 })
		.then(res => {
			if (res.success) {
				deptTypeOption.value = res.result.DEPT_TYPE.map(item => {
					return { label: item.name, value: item.code };
				});
			}
		})
		.finally(() => {
			visible.value = true;
		});
};

defineExpose({ add, edit });
</script>

<style scoped></style>
