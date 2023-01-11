import { UsergroupAddOutlined } from "@vicons/antd";

export const Icons = {
	UsergroupAddOutlined
};

export function setupIcon(app) {
	Object.keys(Icons).forEach(item => {
		app.component(item, Icons[item]);
	});
}
