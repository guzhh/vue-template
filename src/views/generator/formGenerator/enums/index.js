export const ComponentType = {
	Input: "input",
	Number: "number",
	// Radio: "radio",
	// Checkbox: "checkbox",
	// Time: "time",
	// Date: "date",
	// Rate: "rate",
	// Select: "select",
	// Switch: "switch",
	// Slider: "slider",
	// Color: "color"
	// // 高级组件
	// Upload: "upload",
	// RichtextEditor: "richtext-editor",
	// Cascader: "cascader",
	// Tree: "tree",
	// Table: "table",
	Grid: "grid"
	// DynamicTable: "dynamicTable",
	// SelectTree: "selectTree",
	// Transfer: "transfer",
	// Alert: "alert",
	// Text: "text",
	// Divider: "divider",
	// DynamicTags: "dynamicTags",
	// Button: "button"
};

export function checkComponent(test) {
	return Object.values(ComponentType).indexOf(test) !== -1;
}
