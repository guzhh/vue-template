import {
	UsergroupAddOutlined,
	AppstoreAddOutlined,
	UserOutlined,
	MenuOutlined,
	OrderedListOutlined,
	PicCenterOutlined
} from "@vicons/antd";
import { CubeOutline } from "@vicons/ionicons5";

import { Refresh, FoldDown } from "@vicons/tabler";
import { ArrowBetweenDown24Filled, Settings48Regular, AutoFitHeight20Filled } from "@vicons/fluent";

export const Icons = {
	UsergroupAddOutlined,
	AppstoreAddOutlined,
	UserOutlined,
	CubeOutline,
	MenuOutlined,
	OrderedListOutlined,
	PicCenterOutlined,
	Refresh,
	FoldDown,
	ArrowBetweenDown24Filled,
	Settings48Regular,
	AutoFitHeight20Filled
};

export function setupIcon(app) {
	Object.keys(Icons).forEach(item => {
		app.component(item, Icons[item]);
	});
}
