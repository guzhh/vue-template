<template>
	<div>
		<n-modal v-model:show="showModal" :mask-closable="false" to="#app">
			<n-card
				style="width: 450px; height: 280px; box-sizing: border-box"
				title="许可证"
				:bordered="false"
				size="small"
				role="dialog"
				aria-modal="true"
				:header-style="{ alignItems: 'flex-start' }"
				:style="{ backgroundImage: `url(${backimg})` }"
			>
				<template #header>
					<div style="display: flex; justify-content: center">
						<n-image :src="xukezheng" :preview-disabled="true" />
					</div>
					<div v-if="!ifFailure" style="position: absolute; top: 10px; right: 10px">
						<n-icon size="26" style="cursor: pointer" @click="handleClose">
							<Close />
						</n-icon>
					</div>
				</template>
				<div style="padding: 0 30px" v-if="!ifForever">
					<span
						>尊敬的客户：<span style="color: #3992f3">{{ licenseInfo.customerName }}</span></span
					>
					<div style="text-indent: 2em" v-if="!ifFailure">
						您的
						<span style="color: #3992f3"> {{ licenseInfo.productName }} </span>
						服务将于：
						<span style="color: #3992f3"> {{ licenseInfo.expireDate }} </span> 到期，
						到期时将影响您的服务使用，请您提前联系我司商务。 联系电话：4008-707-991
					</div>
					<div style="text-indent: 2em; margin-top: 10px" v-else>
						<span>{{ failureMessage }}</span>
					</div>
				</div>
				<div style="padding: 0 30px" v-if="ifForever">
					<span
						>尊敬的客户：<span style="color: #3992f3">{{ licenseInfo.customerName }}</span></span
					>
					<div style="text-indent: 2em; margin-top: 10px" v-if="!ifFailure">
						您的
						<span style="color: #3992f3"> {{ licenseInfo.productName }} </span>
						服务时效为 永久有效
					</div>
				</div>
			</n-card>
		</n-modal>
	</div>
</template>

<script>
import { useRoute } from "vue-router";
import { Close } from "@vicons/ionicons5";
import xukezheng from "@/assets/images/xukezheng.png";
import backimg from "@/assets/images/xkzback.png";
import { info } from "@/api/users/user";

export default {
	name: "GlobleTip",
	components: { Close },
	setup() {
		// 挂载在 window 方便与在js中使用
		// @ts-ignore

		const ifFailure = ref(false); // 是否失效
		const showModal = ref(false);
		const failureMessage = ref(""); // 失效提示信息
		const route = useRoute();
		const licenseInfo = ref({});
		// eslint-disable-next-line no-unused-vars
		const ifForever = ref(false); // 是否永久有效

		const getInfo = data => {
			ifFailure.value = false;
			info({}).then(res => {
				if (res.success) {
					if (res.result) {
						licenseInfo.value = res.result;
						ifForever.value = false;
						if (res.result.licenseType === "forever") {
							ifForever.value = true;
						}
						if (res.result.expireDate && data === "2") {
							const expireTime = new Date(res.result.expireDate).getTime();
							const nowTime = new Date().getTime();
							const time = expireTime - nowTime;
							if (time < 10 * 24 * 3600 * 1000) {
								showModal.value = true;
								localStorage.setItem("ifRemind", true);
							}
						}
						if (data === "1") {
							showModal.value = true;
						}
					}
				}
			});
		};
		// remind;
		// eslint-disable-next-line no-unused-vars
		const openTip = data => {
			// showModal.value = true;

			if (data) {
				failureMessage.value = data;
				showModal.value = true;
				ifFailure.value = true;
			} else {
				getInfo("1");
			}
		};

		const handleClose = () => {
			showModal.value = false;
		};

		// eslint-disable-next-line no-unused-vars
		watch(route, (newVal, oldVal) => {
			if (newVal.redirectedFrom && newVal.redirectedFrom.fullPath === "/") {
				if (!localStorage.getItem("ifRemind")) {
					getInfo("2");
				}
			}
		});
		window.$globleTip = {
			open(data) {
				openTip(data);
			}
		};

		return {
			handleClose,
			showModal,
			xukezheng,
			backimg,
			getInfo,
			licenseInfo,
			ifFailure,
			failureMessage,
			ifForever
		};
	}
};
</script>

<style scoped lang="less"></style>
