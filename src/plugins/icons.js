import {
	UsergroupAddOutlined,
	AppstoreAddOutlined,
	UserOutlined,
	MenuOutlined,
	OrderedListOutlined,
	PicCenterOutlined,
	FileMarkdownOutlined,
	PhoneOutlined,
	InsertRowBelowOutlined,
	EditOutlined,
	HomeOutlined
} from "@vicons/antd";
import { CubeOutline, Search, ChevronDown, ListOutline, AppsSharp, BarcodeOutline, LogoAppleAr } from "@vicons/ionicons5";

import { Refresh, FoldDown, Download, Upload, Edit, Plus } from "@vicons/tabler";
import {
	ArrowBetweenDown24Filled,
	Settings48Regular,
	AutoFitHeight20Filled,
	VoicemailArrowForward16Regular,
	Delete16Regular
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
	EditOutlined,
	FileMarkdownOutlined,
	ArrowBetweenDown24Filled,
	Settings48Regular,
	AutoFitHeight20Filled,
	Search,
	Download,
	Upload,
	PhoneOutlined,
	ChevronDown,
	VoicemailArrowForward16Regular,
	ListOutline,
	Edit,
	Delete16Regular,
	Plus,
	AppsSharp,
	LogoAppleAr,
	HomeOutlined,
	BarcodeOutline,
	InsertRowBelowOutlined
};

export function setupIcon(app) {
	Object.keys(Icons).forEach(item => {
		app.component(item, Icons[item]);
	});
}
