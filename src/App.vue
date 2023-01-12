<template>
	<n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
		<n-theme-editor>
			<n-global-style />
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
import { computed } from "vue";
import { zhCN, dateZhCN, NThemeEditor, darkTheme } from "naive-ui";
import { useAppStore } from "@/store";

const appStore = useAppStore();
const theme = computed(() => (appStore.theme === "dark" ? darkTheme : null));
</script>

<style lang="less"></style>
