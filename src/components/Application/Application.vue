<template>
	<n-loading-bar-provider>
		<n-dialog-provider>
			<DialogContent />
			<n-notification-provider>
				<Notification />
				<n-message-provider>
					<MessageContent />
					<slot></slot>
				</n-message-provider>
			</n-notification-provider>
		</n-dialog-provider>
	</n-loading-bar-provider>
</template>

<script>
import { defineComponent } from "vue";
import { NDialogProvider, NNotificationProvider, NMessageProvider, NLoadingBarProvider } from "naive-ui";
import { MessageContent } from "@/components/MessageContent";
import { DialogContent } from "@/components/DialogContent";
import { Notification } from "@/components/Notification";

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
		Notification
	},
	setup() {
		console.log(
			`\n %c ${import.meta.env.VITE_SYSTEM_NAME} `.concat(" %c http://panku.com/ \n\n"),
			"color: #ffffff; background: #3c9cff; padding:5px 0;",
			"color: #ffffff; background: #fe3f69; padding:5px 0;"
		);
		return {};
	}
});
</script>
