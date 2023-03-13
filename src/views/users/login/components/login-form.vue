<template>
	<div class="login-form-wrapper">
		<div class="login-form-title">{{ title }}</div>
		<!--		<div class="login-form-sub-title">登录 {{ title }}</div>-->
		<div class="login-form-error-msg">{{ errorMessage }}</div>

		<n-form ref="formRef" :model="userInfo" :rules="rules" label-placement="left" size="large">
			<n-form-item path="account">
				<n-input @keyup.enter="accountEnter" v-model:value="userInfo.account" placeholder="请输入账号">
					<template #prefix>
						<n-icon :component="UserOutlined" />
					</template>
				</n-input>
			</n-form-item>
			<n-form-item path="passwd">
				<n-input
					ref="passwordRef"
					@keyup.enter="handleValidateClick"
					type="password"
					show-password-on="mousedown"
					v-model:value="userInfo.passwd"
					placeholder="请输入密码"
				>
					<template #prefix>
						<n-icon :component="LockOutlined" />
					</template>
				</n-input>
			</n-form-item>
			<n-form-item>
				<n-button style="width: 100%" type="info" attr-type="button" @click="handleValidateClick">登录</n-button>
			</n-form-item>
		</n-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useThemeVars } from "naive-ui";
import { UserOutlined, LockOutlined } from "@vicons/antd";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";

defineOptions({ name: "LoginForm" });

// eslint-disable-next-line no-unused-vars
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const formRef = ref();
const passwordRef = ref();

// 全局公共变量
const themeVars = useThemeVars();
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
			// console.log("验证通过");
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
.login-form-wrapper {
	box-shadow: 0px 0px 30px 20px #f2f3f5;
	//border: 1px solid #51a7ff;
	padding: 24px 36px;
}
.login-form {
	&-wrapper {
		width: 420px;
	}

	&-title {
		color: v-bind("themeVars.textColor1");
		font-weight: bold;
		font-size: 36px;
		line-height: 32px;
		text-align: center;
	}

	&-sub-title {
		color: v-bind("themeVars.textColor3");
		font-size: 16px;
		line-height: 24px;
		text-align: center;
	}

	&-error-msg {
		height: 32px;
		color: v-bind("themeVars.errorColor");
		line-height: 32px;
	}

	&-password-actions {
		display: flex;
		justify-content: space-between;
	}

	&-register-btn {
		color: v-bind("themeVars.textColor3") !important;
	}
}
</style>
