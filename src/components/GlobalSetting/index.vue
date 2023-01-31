<template>
	<div v-if="!appStore.navbar" class="fixed-settings" @click="setVisible">
		<n-button type="primary">
			<template #icon>
				<n-icon>
					<setting-outlined />
				</n-icon>
			</template>
		</n-button>
	</div>
	<n-drawer close-on-esc @after-leave="cancel" @mask-click="cancel" @esc="cancel" :width="300" :show="visible">
		<n-drawer-content title="页面设置">
			<Block :options="contentOpts" title="内容区域" />
			<theme-color />
			<Block :options="othersOpts" title="其他设置" />
			<n-alert :show-icon="false" type="warning"
				>配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置" 按钮，将配置替换到 src/settings.js 中即可。</n-alert
			>
			<template #footer>
				<n-button @click="cancel"> 关闭 </n-button>
				<n-button @click="copySettings" type="success" style="margin-left: 20px"> 复制配置 </n-button>
			</template>
		</n-drawer-content>
	</n-drawer>
</template>

<script setup>
import { computed } from "vue";
import { SettingOutlined } from "@vicons/antd";
import { useClipboard } from "@vueuse/core";
import { useMessage } from "naive-ui";
import { useAppStore } from "@/store";
import Block from "./block.vue";
import ThemeColor from "./theme-color.vue";

const emit = defineEmits(["cancel"]);

const appStore = useAppStore();
const message = useMessage();
const { copy } = useClipboard();
const visible = computed(() => appStore.globalSettings);

// watch(
// 	() => appStore.colorWeak,
// 	value => {
// 		document.body.style.filter = value ? "invert(80%)" : "none";
// 	},
// 	{ immediate: true }
// );

const contentOpts = computed(() => [
	{ name: "导航栏", key: "navbar", defaultVal: appStore.navbar },
	{
		name: "菜单栏",
		key: "menu",
		defaultVal: appStore.menu
	},
	{ name: "底部", key: "footer", defaultVal: appStore.footer },
	{ name: "多页签", key: "tabBar", defaultVal: appStore.tabBar },

	{
		name: "菜单宽度 (px)",
		key: "menuWidth",
		defaultVal: appStore.menuWidth,
		type: "number"
	}
]);

const othersOpts = computed(() => [
	{
		name: "色弱模式",
		key: "colorWeak",
		defaultVal: appStore.colorWeak
	}
]);

const setVisible = () => {
	appStore.updateSettings({ globalSettings: true });
};

const cancel = () => {
	appStore.updateSettings({ globalSettings: false });
	emit("cancel");
};

const copySettings = async () => {
	const text = JSON.stringify(appStore.$state, null, 2);
	await copy(text);
	message.success("复制成功，请粘贴到 src/settings.js 文件中");
};
</script>

<style scoped lang="less">
.fixed-settings {
	position: fixed;
	top: 280px;
	right: 0;

	svg {
		font-size: 18px;
		vertical-align: -4px;
	}
}
</style>
