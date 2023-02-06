<template>
	<page-content>
		<n-card size="small">
			<n-row gutter="12">
				<n-col :span="4">
					<n-image style="border-radius: 50%" width="100" src="http://aw.vueadminwork.com/assets/img_avatar.1d4c4a34.gif" />
				</n-col>
				<n-col :span="16">
					<n-descriptions label-placement="left" :column="2">
						<n-descriptions-item label="用户名"> {{ userStore.name }}</n-descriptions-item>
						<n-descriptions-item label="在线状态">
							<!--              userStore.ifOnline === 1-->
							<n-tag :bordered="false" type="success" size="small" v-if="userStore.ifOnline === 1"> 在线</n-tag>
							<n-tag :bordered="false" type="error" size="small" v-else-if="userStore.ifOnline === 0"> 离线</n-tag>
						</n-descriptions-item>
						<n-descriptions-item label="账号"> {{ userStore.account }}</n-descriptions-item>
						<n-descriptions-item label="手机号码"> {{ userStore.phone ? userStore.phone : "暂无" }}</n-descriptions-item>
						<n-descriptions-item label="邮箱号"> {{ userStore.email ? userStore.email : "暂无" }}</n-descriptions-item>
						<n-descriptions-item label="注册时间"> {{ userStore.createTime }}</n-descriptions-item>
					</n-descriptions>
				</n-col>
			</n-row>
		</n-card>
		<n-card style="margin-top: 5px">
			<n-tabs
				class="card-tabs"
				default-value="signin"
				size="large"
				animated
				style="margin: 0 -4px"
				pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
			>
				<n-tab-pane name="signin" tab="重设密码">
					<div style="width: 500px; margin: 20px auto 80px">
						<n-form :model="passwordFormValue" ref="passwordFormRef" :rules="rules">
							<n-form-item-row label="原密码" path="oldPasswd">
								<n-input v-model:value="passwordFormValue.oldPasswd" placeholder="请输入原密码" />
							</n-form-item-row>
							<n-form-item-row label="新密码" path="newPasswd">
								<n-input
									v-model:value="passwordFormValue.newPasswd"
									show-password-on="mousedown"
									placeholder="请输入新密码"
									type="password"
								/>
							</n-form-item-row>
							<n-form-item-row label="确认密码" path="confirmPassword">
								<n-input
									v-model:value="passwordFormValue.confirmPassword"
									show-password-on="mousedown"
									placeholder="请确认密码"
									type="password"
								/>
							</n-form-item-row>
						</n-form>
						<n-button type="primary" block secondary strong @click="changeThePassword"> 密码确认修改</n-button>
					</div>
				</n-tab-pane>
			</n-tabs>
		</n-card>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store";
import { uptPasswd } from "@/api/users/user";

const userStore = useUserStore();

const passwordFormRef = ref();
const passwordFormValue = ref({
	newPasswd: "", // 新密码
	confirmPassword: "", // 确认密码
	oldPasswd: "" // 旧密码
});

function validatePasswordStartWith(rule, value) {
	return (
		!!passwordFormValue.value.newPasswd &&
		passwordFormValue.value.newPasswd.startsWith(value) &&
		passwordFormValue.value.newPasswd.length >= value.length
	);
}

function validatePasswordSame(rule, value) {
	return value === passwordFormValue.value.newPasswd;
}

const rules = {
	oldPasswd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
	newPasswd: [
		{
			required: true,
			validator(rule, value) {
				if (!value) {
					return new Error("请输入新密码");
				}
				if (!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/.test(value)) {
					return new Error("密码为 8 ~ 16 的数字、字母、特殊符号中的两种");
				}
				return true;
			},
			trigger: ["input", "blur"]
		}
	],
	confirmPassword: [
		{
			required: true,
			message: "请再次输入密码",
			trigger: ["input", "blur"]
		},
		{
			validator: validatePasswordStartWith,
			message: "两次密码输入不一致",
			trigger: "input"
		},
		{
			validator: validatePasswordSame,
			message: "两次密码输入不一致",
			trigger: ["blur", "password-input"]
		}
	]
};

const changeThePassword = e => {
	e.preventDefault();
	passwordFormRef.value?.validate(errors => {
		if (!errors) {
			uptPasswd({ userId: userStore.id, ...passwordFormValue.value }).then(res => {
				if (res.success) {
					userStore.logout().finally(() => {
						window.location.reload();
					});
				}
			});
		}
	});
};
</script>

<style scoped></style>
