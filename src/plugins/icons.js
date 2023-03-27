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
	HomeOutlined,
	AlignLeftOutlined
} from "@vicons/antd";
import {
	Search,
	Copy,
	CubeOutline,
	ChevronDown,
	ListOutline,
	AppsSharp,
	BarcodeOutline,
	LogoAppleAr,
	MoveOutline
} from "@vicons/ionicons5";

import { Refresh, FoldDown, Download, Upload, Edit, Plus, Forms } from "@vicons/tabler";
import {
	ArrowBetweenDown24Filled,
	Settings48Regular,
	AutoFitHeight20Filled,
	VoicemailArrowForward16Regular,
	Delete16Regular,
	FullScreenMaximize24Regular,
	FullScreenMinimize24Regular
} from "@vicons/fluent";

export const Icons = {
	Edit,
	Plus,
	Copy,
	Forms,
	Search,
	Upload,
	Refresh,
	FoldDown,
	Download,
	AppsSharp,
	MoveOutline,
	CubeOutline,
	ListOutline,
	ChevronDown,
	LogoAppleAr,
	UserOutlined,
	MenuOutlined,
	HomeOutlined,
	EditOutlined,
	PhoneOutlined,
	BarcodeOutline,
	Delete16Regular,
	Settings48Regular,
	PicCenterOutlined,
	AlignLeftOutlined,
	OrderedListOutlined,
	AppstoreAddOutlined,
	UsergroupAddOutlined,
	FileMarkdownOutlined,
	AutoFitHeight20Filled,
	InsertRowBelowOutlined,
	ArrowBetweenDown24Filled,
	FullScreenMinimize24Regular,
	FullScreenMaximize24Regular,
	VoicemailArrowForward16Regular
};

export function setupIcon(app) {
	Object.keys(Icons).forEach(item => {
		app.component(item, Icons[item]);
	});
}
