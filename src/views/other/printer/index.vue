<template>
	<page-content>
		<n-card size="small" title="标签打印">
			<n-button v-print="print">打印</n-button>
			<div style="display: flex; justify-content: center; width: 100%">
				<div style="flex-shrink: 0; width: 80mm" id="printArea">
					<div
						style="
							position: relative;
							box-sizing: border-box;
							width: 80mm;
							height: 50.1mm;
							padding: 5px 10px;
							font-weight: 600;
							line-height: 1.8;
						"
						v-for="i in 1"
						:key="i"
					>
						<p>心血管内一科病区</p>
						<p>床号：2365 <span v-html="'&nbsp;&nbsp;'"></span>张晓明</p>
						<p>36566852144<span v-html="'&nbsp;&nbsp;'"></span>男<span v-html="'&nbsp;&nbsp;'"></span>88 岁</p>
						<span>外用重组人碱性成纤维细胞生长因子[30ml*1瓶]</span>
						<div style="position: absolute; bottom: 0">
							<span>频次：一次</span>
							<span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;'" />
							<span>用法：口服</span>
						</div>
						<div style="position: absolute; top: 10px; right: 20px; width: 15mm; height: 15mm">
							<vue-qr :text="'00000000' + i" :size="55" :margin="0"></vue-qr>
						</div>
					</div>
				</div>
			</div>
		</n-card>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import vueQr from "vue-qr/src/packages/vue-qr.vue";

const print = ref({
	id: "printArea"
});
</script>

<style scoped></style>
