<template>
	<page-content>
		<n-card size="small" title="字典单选">
			<dict-select dict-code="RULE_FIELD" v-model:value="data.dictValue" />
			<div style="height: 10px"></div>
			<dict-show :dict-code="data.dictValue" />
		</n-card>
		<n-card size="small" title="字典多选" style="margin-top: 10px">
			<dict-multi dict-code="RULE_FIELD" v-model:value="data.dictMulti" />
			<div style="height: 10px"></div>
			<dict-show :dict-code="data.dictMulti" />
		</n-card>
		<n-card size="small" title="选中的值" style="margin-top: 10px">
			<pre>{{ JSON.stringify(data, null, 4) }}</pre>
		</n-card>
	</page-content>
</template>

<script setup>
const data = reactive({
	dictValue: null,
	dictMulti: null
});
</script>

<style scoped>
pre {
	box-sizing: border-box;
	padding: 9.5px;
	margin-top: 0;
	margin-bottom: 10px;

	/* 以上样式是自动换行代码，需要的加上，不需要的删除 */
	overflow: auto;
	font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
	font-size: 13px;
	line-height: 1.42857;
	color: #333333;
	word-break: break-all; /* Internet Explorer 5.5+ */
	word-wrap: break-word;

	/* 以下样式是自动换行代码 */
	white-space: pre-wrap; /* css-3 */
	white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
	//white-space: -pre-wrap; /* Opera 4-6 */ white-space: -o-pre-wrap; /* Opera 7 */
	background-color: #f5f5f5;
	border: 1px solid #cccccc;
	border-radius: 4px;
}
</style>
