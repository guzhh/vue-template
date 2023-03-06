<template>
	<page-content>
		<n-card title="数据库配置" size="small">
			<n-form
				require-mark-placement="left"
				:rules="rules"
				ref="formRef"
				:label-width="90"
				:model="dataBaseConfig"
				inline
				label-placement="left"
			>
				<n-grid cols="13" item-responsive>
					<n-grid-item span="6 600:4 1000:2 1200:2 ">
						<n-form-item label="数据库IP" path="host">
							<n-input v-model:value="dataBaseConfig.host" placeholder="请输入数据库IP" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="6 600:4 1000:2 1200:2 ">
						<n-form-item label="端口号" path="port">
							<n-input v-model:value="dataBaseConfig.port" placeholder="请输入数据库端口号" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="6 600:4 1000:2 1200:2 ">
						<n-form-item label="用户名" path="user">
							<n-input v-model:value="dataBaseConfig.port" placeholder="请输入数据库用户名" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="6 600:4 1000:2 1200:2 ">
						<n-form-item label="密码" path="password">
							<n-input v-model:value="dataBaseConfig.password" placeholder="请输入数据库密码" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="6 600:4 1000:2 1200:2 ">
						<n-form-item label="数据库名" path="database">
							<n-input v-model:value="dataBaseConfig.database" placeholder="请输入数据库名" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="6 600:4 1000:2 1200:2 ">
						<n-form-item label="数据表名" path="datasheet">
							<n-input v-model:value="dataBaseConfig.datasheet" placeholder="请输入数据表名" />
						</n-form-item>
					</n-grid-item>
					<n-grid-item span="6 600:4 800:2 1200:1 ">
						<n-form-item>
							<n-button attr-type="button" type="primary" style="margin-left: 5px" @click="handleValidateClick"
								>读取数据表
							</n-button>
						</n-form-item>
					</n-grid-item>
				</n-grid>
			</n-form>
		</n-card>
		<n-card title="TABLE配置" size="small" style="margin-top: 5px">
			<template #header-extra>
				<n-button size="small" type="primary" @click="fileGeneration">文件生成</n-button>
			</template>
			<vxe-table
				:data="tableList"
				:size="tableSize"
				align="center"
				border
				resizable
				row-id="columnName"
				show-header-overflow="title"
				show-overflow
			>
				<vxe-column field="columnName" show-overflow="title" title="字段名" min-width="100px"></vxe-column>
				<vxe-column field="humpName" show-overflow="title" title="字段驼峰名" min-width="100px">
					<template #default="{ row }">
						<n-input v-model:value="row.humpName" placeholder="请输入字段驼峰名" />
					</template>
				</vxe-column>
				<vxe-column field="columnType" min-width="100px" show-overflow="title" title="字段类型"></vxe-column>
				<vxe-column field="columnComment" min-width="100px" show-overflow="title" title="字段备注"></vxe-column>
				<vxe-column field="columnTitle" min-width="100px" show-overflow="title" title="列标题">
					<template #default="{ row }">
						<n-input v-model:value="row.columnTitle" placeholder="请输入表格列标题" />
					</template>
				</vxe-column>
				<vxe-column field="columnWidth" min-width="100px" show-overflow="title" title="列宽度">
					<template #default="{ row }">
						<n-input-number v-model:value="row.columnWidth" placeholder="请输入表格列宽度" />
					</template>
				</vxe-column>
				<vxe-column field="isShow" min-width="100px" show-overflow="title" title="是否展示">
					<template #default="{ row }">
						<n-switch v-model:value="row.isShow" :checked-value="1" :unchecked-value="0">
							<template #checked> 展示</template>
							<template #unchecked> 不展示</template>
						</n-switch>
					</template>
				</vxe-column>
			</vxe-table>
		</n-card>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { generateTable, getDataSheet } from "@/api/generator/tableGenerator";
import useTable from "@/hooks/useTable";

const message = useMessage();
const formRef = ref();
const { tableSize } = useTable();
const dataBaseConfig = ref({
	host: "192.168.1.163",
	port: "3306",
	user: "root",
	password: "pankujava",
	database: "panku-sso",
	datasheet: "t_auth_param"
});

const rules = {
	host: { required: true, message: "请输入数据库IP", trigger: "blur" },
	port: { required: true, message: "请输入数据库端口", trigger: ["input", "blur"] },
	user: { required: true, message: "请输入数据库用户名", trigger: ["input", "blur"] },
	password: { required: true, message: "请输入数据库密码", trigger: ["input", "blur"] },
	database: { required: true, message: "请输入数据库名", trigger: ["input", "blur"] },
	datasheet: { required: true, message: "请输入数据表名", trigger: ["input", "blur"] }
};

const tableList = ref([]);

const handleValidateClick = e => {
	e.preventDefault();
	formRef.value?.validate(errors => {
		if (!errors) {
			getDataSheet(dataBaseConfig.value).then(res => {
				if (res.success) {
					tableList.value = res.result;
				}
			});
		}
	});
};

const fileGeneration = () => {
	if (tableList.value.length <= 0) {
		message.warning("请首先读取数据表");
	} else {
		generateTable(tableList.value).then(res => {
			if (res.success) {
				message.success(`文件生成成功，文件位置 D:\\index.vue`);
			} else {
				message.error("文件生成失败");
			}
		});
	}
};
</script>

<style scoped></style>
