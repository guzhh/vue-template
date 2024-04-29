<template>
	<div :style="{ border: showBorder ? '1px solid #cccccc' : 'none' }">
		<Toolbar
			v-if="showToolbar"
			style="border-bottom: 1px solid #cccccc"
			:editor="editorRef"
			:defaultConfig="toolbarConfig"
			mode="default"
		/>
		<Editor
			mode="default"
			v-model="valueHtml"
			style="overflow-y: hidden"
			@onCreated="handleCreated"
			:defaultConfig="editorConfig"
			:style="{ height: height + 'px' }"
		/>
	</div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { uploadImage } from "@/api/system";

defineOptions({ name: "WangEditor" });

const emits = defineEmits(["update:value"]);
const props = defineProps({
	showToolbar: {
		type: Boolean,
		default: true
	},
	showBorder: {
		type: Boolean,
		default: true
	},
	height: {
		type: Number,
		default: 300
	},
	placeholder: {
		type: String,
		default: "请输入内容..."
	},
	value: {
		type: [String, null],
		required: true
	}
});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = computed({
	get() {
		return props.value;
	},
	set(val) {
		emits("update:value", val);
	}
});

const toolbarConfig = {
	excludeKeys: ["fullScreen", "group-video"]
};
const editorConfig = {
	placeholder: props.placeholder,
	MENU_CONF: {
		uploadImage: {
			// 单个文件的最大体积限制，默认为 2M
			maxFileSize: 1 * 1024 * 1024, // 1M

			// 最多可上传几个文件，默认为 100
			maxNumberOfFiles: 1,
			// 自定义上传
			customUpload(file, insertFn) {
				const param = new FormData(); // 创建form对象
				param.append("file", file, file.name); // 通过append向form对象添加数据
				param.append("type", 4);
				uploadImage(param).then(res => {
					if (res.success) {
						// formState.photo = res.result.domainUrl
						// 从 res 中找到 url alt href ，然后插图图片
						insertFn(res.result.domainUrl, file.name, "");
					} else {
						window.$message.error(res.message);
					}
				});
			}
		},
		insertImage: {
			checkImage(src) {
				console.log("image src", src);
				if (src.indexOf("http") !== 0) {
					return "图片网址必须以 http/https 开头";
				}
				return true;
			}
		}
	}
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});

const handleCreated = editor => {
	editorRef.value = editor; // 记录 editor 实例，重要！
};
//
// [
//   "headerSelect",
//   "blockquote",
//   "|",
//   "bold",
//   "underline",
//   "italic",
//   {
//     "key": "group-more-style",
//     "title": "更多",
//     "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path></svg>",
//     "menuKeys": [
//       "through",
//       "code",
//       "sup",
//       "sub",
//       "clearStyle"
//     ]
//   },
//   "color",
//   "bgColor",
//   "|",
//   "fontSize",
//   "fontFamily",
//   "lineHeight",
//   "|",
//   "bulletedList",
//   "numberedList",
//   "todo",
//   {
//     "key": "group-justify",
//     "title": "对齐",
//     "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
//     "menuKeys": [
//       "justifyLeft",
//       "justifyRight",
//       "justifyCenter",
//       "justifyJustify"
//     ]
//   },
//   {
//     "key": "group-indent",
//     "title": "缩进",
//     "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
//     "menuKeys": [
//       "indent",
//       "delIndent"
//     ]
//   },
//   "|",
//   "emotion",
//   "insertLink",
//   {
//     "key": "group-image",
//     "title": "图片",
//     "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
//     "menuKeys": [
//       "insertImage",
//       "uploadImage"
//     ]
//   },
//   {
//     "key": "group-video",
//     "title": "视频",
//     "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z\"></path></svg>",
//     "menuKeys": [
//       "insertVideo",
//       "uploadVideo"
//     ]
//   },
//   "insertTable",
//   "codeBlock",
//   "divider",
//   "|",
//   "undo",
//   "redo",
//   "|",
//   "fullScreen"
// ]
</script>

<style scoped></style>
