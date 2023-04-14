<template>
	<base-modal style="width: 900px" :title="title" v-model:show="visible" @ok="handleOk" @close="handleClose">
		<n-form
			ref="formRef"
			:model="formValue"
			:rules="rules"
			label-placement="left"
			label-width="100px"
			require-mark-placement="left"
			style="padding: 15px 10px 0 10px"
		>
			<n-form-item label="用户名称" path="name">
				<n-input v-model:value="formValue.name" placeholder="请输入用户名称" />
			</n-form-item>
			<n-form-item label="账号" path="account">
				<n-input v-model:value="formValue.account" placeholder="请输入账号" />
			</n-form-item>
			<n-form-item v-if="!ifEdit" label="密码" path="passwd">
				<n-input v-model:value="formValue.passwd" placeholder="请输入密码" type="password" />
			</n-form-item>
			<n-form-item label="科室" path="deptCodeList">
				<n-tree-select v-model:value="formValue.deptCodeList" :default-expand-all="true" :options="treeData" multiple />
			</n-form-item>
			<n-form-item label="用户类型">
				<n-select v-model:value="formValue.userType" :options="userTypeOption" placeholder="请选择用户类型" />
			</n-form-item>
			<n-form-item label="手机号" path="phone">
				<n-input v-model:value="formValue.phone" placeholder="请输入手机号" />
			</n-form-item>
			<n-form-item label="邮箱" path="email">
				<n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
			</n-form-item>
		</n-form>
	</base-modal>
</template>

<script setup>
import { ref } from "vue";
import { saveOrUpt } from "@/api/system/user";
import { getDeptByOrgCode, getDepartsByUser } from "@/api/system/depAdmin";
import { getDictByPCodes } from "@/api/system/dictList";

// eslint-disable-next-line no-unused-vars
const emits = defineEmits(["ok"]);
const formRef = ref();
const visible = ref(false);
const title = ref("");
const ifEdit = ref(false);
const treeData = ref([]);

const defaultForm = {
	id: null,
	orgCode: "",
	orgName: "",
	name: "",
	account: "",
	passwd: "",
	phone: "",
	email: "",
	deptCodeList: [],
	userType: undefined
};
const userTypeOption = ref([]);

const formValue = ref({ ...defaultForm });
const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const rules = {
	name: { required: true, message: "请输入用户名称", trigger: "blur" },
	account: { required: true, message: "请输入账号", trigger: "blur" },
	deptCodeList: {
		required: true,
		validator(rule, value) {
			if (value.length <= 0) {
				return new Error("请选择科室");
			}
			return true;
		},
		trigger: "change"
	},
	passwd: [
		{ required: true, message: "请输入密码", trigger: "change" },
		{ max: 16, min: 6, message: "密码长度在6~16位之间", trigger: "change" }
	],
	phone: {
		required: false,
		validator(rule, value) {
			if (value && !reg.test(value)) {
				return new Error("请输入正确的联系方式");
			}
			return true;
		},
		trigger: "change"
	}
};

// 新增用户
const addUser = data => {
	title.value = "新增用户";
	formValue.value.deptCodeList = [];
	formValue.value.deptCodeList.push(data.depCode);
	formValue.value.orgCode = data.orgCode;
	formValue.value.orgName = data.orgName;
	// eslint-disable-next-line no-use-before-define
	getDep(data);
	// eslint-disable-next-line no-use-before-define
	getUserType();
};

// 编辑用户
const editUser = row => {
	ifEdit.value = true;
	// eslint-disable-next-line no-use-before-define
	getDep(row);
	title.value = "编辑用户";
	formValue.value = { ...row, deptCodeList: [] };
	getDepartsByUser({ orgCode: row.orgCode, userId: `${row.id}` }).then(res => {
		if (res.success) {
			res.result.forEach(item => {
				formValue.value.deptCodeList.push(item.code);
			});
		}
	});
	// eslint-disable-next-line no-use-before-define
	getUserType();
};

// 获取机构下所有的科室
const getDep = data => {
	getDeptByOrgCode({ orgCode: data.orgCode }).then(res => {
		if (res.success) {
			const optionData = res.result.map(item => {
				return { code: item.code, pcode: item.pcode ? item.pcode : "", key: item.code, label: item.name };
			});

			// 转为树形数据
			const cloneData = JSON.parse(JSON.stringify(optionData)); // 对源数据深度克隆,防止污染原始数据
			treeData.value = cloneData.filter(father => {
				const branchArr = cloneData.filter(child => father.code === child.pcode); // 返回每一项的子级数组
				// eslint-disable-next-line no-unused-expressions,no-param-reassign
				branchArr.length > 0 ? (father.children = branchArr) : ""; // 如果存在子级，则给父级添加一个children属性，并赋值
				return father.pcode === ""; // 返回第一层
			});
		}
	});
};

const handleClose = () => {
	title.value = "";
	treeData.value = [];
	visible.value = false;
	formValue.value = { ...defaultForm };
	ifEdit.value = false;
};

const handleOk = () => {
	console.log(formValue.value, "formValue.value");
	formRef.value?.validate(errors => {
		if (!errors) {
			saveOrUpt({ ...formValue.value }).then(res => {
				if (res.success) {
					emits("ok");
					handleClose();
				}
			});
		}
	});
};

// 获取用户类型字典
const getUserType = () => {
	getDictByPCodes({ pcodes: "USER_TYPE", state: 1 })
		.then(res => {
			if (res.success) {
				userTypeOption.value = res.result.USER_TYPE.map(item => {
					return { label: item.name, value: item.code };
				});
			}
		})
		.finally(() => {
			visible.value = true;
		});
};

defineExpose({ addUser, editUser });
</script>

<style scoped></style>
