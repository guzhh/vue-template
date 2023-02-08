import {
	UsergroupAddOutlined,
	AppstoreAddOutlined,
	UserOutlined,
	MenuOutlined,
	OrderedListOutlined,
	PicCenterOutlined,
	FileMarkdownOutlined,
	PhoneOutlined
} from "@vicons/antd";
import { CubeOutline, Search } from "@vicons/ionicons5";

import { Refresh, FoldDown, Download, Upload } from "@vicons/tabler";
import {
	ArrowBetweenDown24Filled,
	Settings48Regular,
	AutoFitHeight20Filled,
	VoicemailArrowForward16Regular
} from "@vicons/fluent";

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
	FileMarkdownOutlined,
	ArrowBetweenDown24Filled,
	Settings48Regular,
	AutoFitHeight20Filled,
	Search,
	Download,
	Upload,
	PhoneOutlined,
	VoicemailArrowForward16Regular
};

export function setupIcon(app) {
	Object.keys(Icons).forEach(item => {
		app.component(item, Icons[item]);
	});
}
