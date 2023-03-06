import axios from "axios";
import { NButton } from "naive-ui";

export default function setupVersionGuard(router) {
	router.afterEach(async () => {
		if (import.meta.env.MODE === "development") return;
		const response = await axios.get("version.json");
		// eslint-disable-next-line no-underscore-dangle,no-undef
		if (__APP_VERSION__INFO__.version !== response.data.version) {
			window.$notification.create({
				title: "发现新版本",
				content: `检测到最新版本，刷新后立即使用`,
				// eslint-disable-next-line no-underscore-dangle
				meta: response.data.time,
				action: () =>
					h(
						NButton,
						{
							text: true,
							type: "primary",
							onClick: () => window.location.reload() // 版本不同 刷新 获取最新版本
						},
						{
							default: () => "立即刷新"
						}
					),
				// eslint-disable-next-line consistent-return
				onClose: () => {
					window.$message.warning("请立即刷新网页以体验最新版本");
					return false;
				}
			});
		}
	});
}
