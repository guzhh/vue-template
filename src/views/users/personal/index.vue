<template>
	<page-content>
		<div class="header">
			<n-image style="border-radius: 50%" width="50" src="http://aw.vueadminwork.com/assets/img_avatar.1d4c4a34.gif" />
			<n-button text style="margin-top: 25px; filter: invert(50%)">{{ userStore.name }}</n-button>
			<div style="margin-top: 10px; filter: invert(50%)">
				<n-button text size="tiny">
					<template #icon>
						<n-icon>
							<user-outlined />
						</n-icon>
					</template>
					{{ userStore.account }}
				</n-button>
				<n-button text style="margin-left: 20px" size="tiny">
					<template #icon>
						<n-icon>
							<PhoneOutlined />
						</n-icon>
					</template>
					{{ userStore.email ? userStore.email : "暂无" }}
				</n-button>
				<n-button text style="margin-left: 20px" size="tiny">
					<template #icon>
						<n-icon>
							<VoicemailArrowForward16Regular />
						</n-icon>
					</template>
					{{ userStore.phone ? userStore.phone : "暂无" }}
				</n-button>
			</div>
		</div>
	</page-content>
</template>

<script setup>
import { useUserStore } from "@/store";

defineOptions({ name: "personal" });

const userStore = useUserStore();
</script>

<style scoped>
.header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 204px;
	background: url("@/assets/images/user-info.png") no-repeat;
	background-size: cover;
	border-radius: 4px;
}
</style>
