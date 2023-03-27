const getRules = defaultType => {
	const rules = {
		trigger: "blur", // 触发方式
		enum: "",
		len: undefined, // 长度
		max: undefined, // 最大值
		message: "", // 提示
		min: undefined, // 最小值
		pattern: "",
		required: false, // 是否必填
		type: "any" // 类型为any的时候，input空字符也将校验通过
	};
	rules.type = defaultType;
	return rules;
};

export const widgetForm = {
	list: [],
	config: {
		size: "medium", // 表单尺寸 'small' | 'medium' | 'large'
		hideRequiredMark: false, // 是否展示必填的星号
		groupType: "radioGroup",
		inline: false, // 	是否展示为行内表单
		labelAlign: "left", // 标签的文本对齐方式 'left' | 'right'
		labelWidth: "auto", // 标签的宽度
		labelPlacement: "top", // 标签显示的位置 'left' | 'top'
		showLabel: true // 是否展示标签
	},
	// getWidget:['list'].map(value => {
	//   console.log('1111=',value)
	// }),
	getWidget(modelKey) {
		let widget = null;
		this.list.forEach(value => {
			if (value.model === modelKey) {
				widget = value;
			}
		});
		return widget;
	}
};

// 基础组件
export const basicComponents = [
	{
		label: "文本输入",
		type: "input",
		options: {
			change: "",
			width: "100%",
			type: "text",
			showLabel: true,
			defaultValue: "",
			placeholder: "",
			maxlength: null,
			showCount: false,
			prefix: "",
			suffix: "",
			disabled: false,
			allowClear: false,
			readonly: false,
			round: false,
			rules: getRules("string")
		}
	},
	{
		label: "数字输入",
		type: "number",
		options: {
			change: "",
			showLabel: true,
			width: "100%",
			defaultValue: 0,
			min: 0,
			max: 100,
			step: 1,
			readonly: false,
			disabled: false,
			rules: getRules("number")
		}
	},
	{
		label: "单选框组",
		type: "radio",
		options: {
			change: "",
			click: "",
			defaultValue: "",
			width: "",
			groupType: "radioGroup",
			remote: false,
			showLabel: true,
			remoteFunc: "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
			options: [
				{
					value: "Option 1",
					label: "Option 1"
				},
				{
					value: "Option 2",
					label: "Option 2"
				},
				{
					value: "Option 3",
					label: "Option 3"
				}
			],
			remoteOptions: [],
			props: {
				value: "value",
				label: "label"
			},
			disabled: false,
			rules: getRules("string")
		}
	},
	{
		label: "多选框组",
		type: "checkbox",
		options: {
			change: "",
			click: "",
			defaultValue: [],
			width: "",
			inline: true,
			remote: false,
			showLabel: true,
			remoteFunc: "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
			options: [
				{
					label: "Option 1",
					value: "Option 1"
				},
				{
					label: "Option 2",
					value: "Option 2"
				},
				{
					label: "Option 3",
					value: "Option 3"
				}
			],
			remoteOptions: [],
			props: {
				value: "value",
				label: "label"
			},
			disabled: false,
			rules: getRules("array")
		}
	},
	{
		label: "时间选择器",
		type: "time",
		options: {
			change: "",
			showLabel: true,
			defaultValue: null,
			width: "",
			placeholder: "请选择时间",
			format: "HH:mm:ss",
			valueFormat: "HH:mm:ss",
			readonly: false,
			allowClear: true,
			disabled: false,
			rules: getRules("string")
		}
	},
	{
		label: "日期选择器",
		type: "date",
		options: {
			change: "",
			showLabel: true,
			defaultValue: null,
			width: "",
			placeholder: "请选择时间",
			format: "yyyy-MM-dd",
			readonly: false,
			type: "date",
			allowClear: true,
			disabled: false,
			rules: getRules("string")
		}
	},
	{
		label: "评分",
		type: "rate",
		options: {
			change: "",
			click: "",
			showLabel: true,
			defaultValue: null,
			max: 5,
			allowClear: true,
			allowHalf: false,
			disabled: false,
			rules: getRules("number")
		}
	},
	{
		label: "下拉选择框",
		type: "select",
		options: {
			change: "",
			defaultValue: [],
			width: "200px",
			placeholder: "请选择",
			multiple: false,
			remote: false,
			showLabel: true,
			filterable: false,
			allowClear: false,
			disabled: false,
			props: {
				label: "label",
				value: "value"
			},
			options: [
				{
					label: "Option 1",
					value: "Option 1"
				},
				{
					label: "Option 2",
					value: "Option 2"
				},
				{
					label: "Option 3",
					value: "Option 3"
				}
			],
			remoteOptions: [],
			remoteFunc: "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
			rules: getRules("string")
		}
	},
	{
		label: "开关",
		type: "switch",
		options: {
			change: "",
			click: "",
			showLabel: true,
			defaultValue: false,
			disabled: false,
			checkedChildren: "",
			unCheckedChildren: "",
			rules: getRules("boolean")
		}
	},
	{
		label: "滑块",
		type: "slider",
		options: {
			change: "",
			showLabel: true,
			defaultValue: 0,
			width: "",
			height: "",
			min: 0,
			max: 100,
			step: 1,
			disabled: false,
			range: false,
			vertical: false,
			reverse: false,
			rules: getRules("number")
		}
	},
	{
		label: "颜色选择器",
		type: "color",
		options: {
			change: "",
			showLabel: true,
			defaultValue: "",
			width: "",
			disabled: false,
			showAlpha: true,
			showPreview: false,
			placement: "bottom-start",
			modes: ["hex"],
			rules: getRules("number")
		}
	}
];

// 布局容器
export const layoutComponents = [
	{
		label: "栅格布局",
		type: "grid",
		columns: [
			{
				span: 12,
				list: []
			},
			{
				span: 12,
				list: []
			}
		],
		options: {
			cols: 24,
			xGap: 0,
			yGap: 0,
			collapsed: false,
			collapsedRows: 1,
			responsive: "self",
			itemResponsive: false,
			justify: "start",
			align: "top"
		}
	}
];
