<template>
	<n-config-provider :theme="theme" style="height: 100%">
		<n-loading-bar-provider>
			<n-dialog-provider>
				<DialogContent />
				<LoadingContent></LoadingContent>
				<n-notification-provider>
					<Notification />
					<n-message-provider>
						<MessageContent />
						<slot></slot>
					</n-message-provider>
				</n-notification-provider>
			</n-dialog-provider>
		</n-loading-bar-provider>
	</n-config-provider>
</template>

<script>
import { computed, defineComponent } from "vue";
import { NDialogProvider, NNotificationProvider, NMessageProvider, NLoadingBarProvider, darkTheme } from "naive-ui";
import { MessageContent } from "@/components/MessageContent";
import { DialogContent } from "@/components/DialogContent";
import { Notification } from "@/components/Notification";
import useAppStore from "@/store/modules/user";
import { LoadingContent } from "@/components/loadingContent/index.js";

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Application",
	components: {
		NDialogProvider,
		NNotificationProvider,
		NMessageProvider,
		NLoadingBarProvider,
		MessageContent,
		DialogContent,
		Notification,
		LoadingContent
	},
	setup() {
		console.log(
			`\n %c ${import.meta.env.VITE_SYSTEM_NAME} `.concat(" %c http://panku.com/ \n\n"),
			"color: #ffffff; background: #3c9cff; padding:5px 0;",
			"color: #ffffff; background: #fe3f69; padding:5px 0;"
		);
		const appStore = useAppStore();
		const theme = computed(() => (appStore.theme === "dark" ? darkTheme : null));
		return {
			theme
		};
	}
});
</script>
<style lang="less">
.n-config-provider {
	height: 100% !important;
}
</style>
