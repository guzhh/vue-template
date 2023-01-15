<template>
	<n-config-provider
		:theme="theme"
		:locale="zhCN"
		:date-locale="dateZhCN"
		:theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
	>
		<n-theme-editor>
			<n-global-style />
			<n-notification-provider>
				<n-message-provider>
					<n-dialog-provider>
						<router-view></router-view>
						<global-setting />
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
import GlobalSetting from "@/components/GlobalSetting/index.vue";

const appStore = useAppStore();
const theme = computed(() => (appStore.theme === "dark" ? darkTheme : null));

const lightThemeOverrides = {
	common: {
		bodyColor: "rgb(242,243,245)"
	}
};

const darkThemeOverrides = {
	common: {
		bodyColor: "#29292c"
	}
};
</script>

<style lang="less"></style>
