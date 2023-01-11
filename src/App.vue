<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
		<n-theme-editor>
			<n-notification-provider>
				<n-message-provider>
					<n-dialog-provider>
						<router-view></router-view>
					</n-dialog-provider>
				</n-message-provider>
			</n-notification-provider>
		</n-theme-editor>
	</n-config-provider>
</template>

<script setup>
import { zhCN, dateZhCN, NThemeEditor } from "naive-ui";
</script>

<style scoped></style>
