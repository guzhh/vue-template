<template>
	<div class="login-form-wrapper">
		<div class="login-form-sub-title">
			<img src="@/assets/images/login/logo.jpg" height="24" width="88" />
			<span style="margin-left: 12px">河南盘古信息技术有限公司</span>
		</div>
		<div class="login-form-title">{{ title }}</div>
		<div class="login-form-error-msg">{{ errorMessage }}</div>

		<n-form ref="formRef" :model="userInfo" :rules="rules" label-placement="left" size="large">
			<n-form-item path="account">
				<n-input @keyup.enter="accountEnter" v-model:value="userInfo.account" placeholder="请输入账号">
					<template #prefix>
						<user-icon width="22" height="22" viewBox="0 0 28 28"></user-icon>
					</template>
				</n-input>
			</n-form-item>

			<n-form-item path="passwd">
				<n-input
					ref="passwordRef"
					@keyup.enter="handleValidateClick"
					v-model:value="userInfo.passwd"
					placeholder="请输入密码"
					type="password"
					show-password-on="click"
				>
					<template #password-invisible-icon>
						<pass-hide-icon width="22" height="22" viewBox="0 0 28 28"></pass-hide-icon>
					</template>

					<template #password-visible-icon>
						<pass-show-icon width="22" height="22" viewBox="0 0 28 28"></pass-show-icon>
					</template>

					<template #prefix>
						<pass-icon width="22" height="22" viewBox="0 0 28 28"></pass-icon>
					</template>
				</n-input>
			</n-form-item>
			<n-form-item style="margin-top: 52px">
				<n-button style="width: 100%" type="info" attr-type="button" @click="handleValidateClick">登录</n-button>
			</n-form-item>
		</n-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";

import UserIcon from "@/assets/images/login/user_icon.svg";
import PassIcon from "@/assets/images/login/pass_icon.svg";
import PassShowIcon from "@/assets/images/login/pass_show_icon.svg";
import PassHideIcon from "@/assets/images/login/pass_hide_icon.svg";

defineOptions({ name: "LoginForm" });

const router = useRouter();
const userStore = useUserStore();
const formRef = ref();
const passwordRef = ref();

// 全局公共变量

const title = import.meta.env.VITE_SYSTEM_NAME;
const errorMessage = ref("");

const userInfo = reactive({
	account: "admin",
	passwd: "111111"
});

const rules = {
	account: {
		required: true,
		message: "请输入账号",
		trigger: "blur"
	},
	passwd: {
		required: true,
		message: "请输入密码",
		trigger: "blur"
	}
};

const accountEnter = () => {
	passwordRef.value.focus();
};

const handleValidateClick = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			userStore.login({ ...userInfo }).then(() => {
				router.push({ path: "/" });
			});
		} else {
			console.log(errors);
		}
	});
};
</script>

<style lang="less" scoped>
.n-button,
.n-input {
	height: 48px !important;
	line-height: 48px !important;
}

::v-deep(.n-input .n-input__prefix) {
	margin-right: 10px !important;
}

.login-form {
	font-family: "PingFang SC";
	font-style: normal;
	&-wrapper {
		width: 100%;
		padding: 0px 65px;
	}
	&-title {
		color: #2b2b2e;
		font-size: 28px;
		font-weight: 600;
		line-height: 39px;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 40px;
	}

	&-sub-title {
		color: #2b2b2e;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		height: 24px;
		margin-top: 77px;
		text-align: center;
		img {
			vertical-align: middle;
		}
	}

	&-error-msg {
		height: 32px;
		color: darkred;
		line-height: 32px;
	}
}
</style>
