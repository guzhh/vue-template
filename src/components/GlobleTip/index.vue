<template>
	<div>
		<n-modal v-model:show="showModal" :mask-closable="false" to="#app">
			<n-card
				style="
					width: 480px;
					min-height: 320px;
					box-sizing: border-box;
					background: linear-gradient(180deg, #ffffff 30%, #dce1ff 100%);
				"
				title="许可证"
				:bordered="false"
				size="small"
				role="dialog"
				aria-modal="true"
				:header-style="{ alignItems: 'flex-start' }"
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
					<div>
						<span>尊敬的客户：</span>
						<span class="customerName">{{ licenseInfo.customerName }}</span>
					</div>

					<div style="text-indent: 2em" v-if="!ifFailure">
						<span>您的</span>
						<span class="productName"> {{ licenseInfo.productName }} </span>
						<span> 服务将于：</span>
						<span class="expireDate"> {{ licenseInfo.expireDate }} </span>
						<span>到期， 到期时将影响您的服务使用，请您提前联系我司商务。 联系电话：4008-707-991</span>
					</div>

					<div style="text-indent: 2em; margin-top: 10px" v-else>
						<span>{{ failureMessage }}</span>
					</div>

					<n-form style="margin-top: 20px" ref="formRef" :model="formValue" label-width="auto" require-mark-placement="left">
						<n-form-item
							:label="ifFailure ? '许可证' : '更新许可证'"
							path="content"
							:rule="{
								required: true,
								message: ifFailure ? '请输入许可证' : '请输入更新许可证',
								trigger: ['change', 'blur']
							}"
						>
							<n-input
								v-model:value="formValue.content"
								type="textarea"
								:autosize="{ minRows: 7, maxRows: 7 }"
								style="width: 100%"
								:placeholder="ifFailure ? '请输入许可证' : '请输入更新许可证'"
								clearable
							/>
						</n-form-item>
						<n-space justify="center">
							<n-button type="primary" size="small" class="panku-button" @click="saveLicense" :loading="loading">确定</n-button>
						</n-space>
					</n-form>
				</div>
				<div style="padding: 0 30px" v-if="ifForever">
					<div>
						<span>尊敬的客户：</span>
						<span class="customerName">{{ licenseInfo.customerName }}</span>
					</div>

					<div style="text-indent: 2em; margin-top: 10px" v-if="!ifFailure">
						<span>您的</span>
						<span class="productName"> {{ licenseInfo.productName }} </span>
						<span>服务时效为 永久有效</span>
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
import { info, updateLicense } from "@/api/system/licence";

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

		const loading = ref(false);
		const formRef = ref(null);
		const defaultValue = {
			content: "" //
		};
		const formValue = ref({ ...defaultValue });

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
			formValue.value = { ...defaultValue };
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

		// 保存许可证
		const saveLicense = () => {
			console.log("saveLicense======", formRef.value);
			formRef.value?.validate(errors => {
				if (!errors) {
					loading.value = true;
					updateLicense({ ...formValue.value })
						.then(res => {
							if (res.success) {
								handleClose();
							}
						})
						.finally(() => {
							loading.value = false;
						});
				}
			});
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
			ifForever,
			formRef,
			formValue,
			loading,
			saveLicense
		};
	}
};
</script>

<style scoped lang="less">
.customerName,
.productName,
.expireDate {
	color: #3992f3;
}
.panku-button {
	min-width: 90px;
	height: 36px;
}
</style>
