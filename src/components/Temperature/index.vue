<template>
	<div class="table_wrap">
		<!--		<div :key="'comKey' + comKey" class="container" :style="{ marginTop: marginTop + 'px' }">-->
		<!--			<svg width="100%" height="100%"></svg>-->
		<!--		</div>-->
		<table class="temperatureChart">
			<caption>
				<p style="font-size: 20px; font-weight: bold">{{ info.originName }}</p>
				<p style="font-size: 20px; font-weight: bold">体温单</p>
				<p style="position: relative; text-align: left">
					<span class="tbale-label">姓名：</span
					><span style="display: inline-block; width: 50px; text-align: left">{{ info.name }}</span>
					<span class="tbale-label">年龄：</span>
					<span style="display: inline-block; width: 35px; text-align: left">{{ info.age + "" + info.ageunit }}</span>
					<span class="tbale-label">科室：</span>
					<span style="display: inline-block; width: 65px; text-align: left">{{ info.officeName || "-" }}</span>
					<span class="tbale-label">性别：</span>
					<span style="display: inline-block; width: 35px; text-align: left">{{ info.sex }}</span>
					<span class="tbale-label">诊断：</span>
					<span style="display: inline-block; width: 160px; text-align: left">{{ info.inDiagName || "-" }}</span>
					<span class="tbale-label">床号：</span>
					<span style="display: inline-block; width: 60px; text-align: left">{{ info.cwh }}</span>
					<span class="tbale-label">住院号：</span>
					<span style="display: inline-block; width: 100px; text-align: left">{{ info.hospCode }}</span>
				</p>
			</caption>
			<thead></thead>
			<tbody>
				<tr>
					<td
						ref="topTd"
						:colspan="index === 0 ? 8 : 6"
						:class="[index && 'redLineTd', !index && 'table-just']"
						v-for="(item, index) in inHospitalTime"
						:key="index + '|indays'"
					>
						{{ index === 0 ? "日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期" : item }}
					</td>
				</tr>
				<tr>
					<td
						:colspan="index === 0 ? 8 : 6"
						:class="[index && 'redLineTd', !index && 'table-just']"
						v-for="(item, index) in inHospitalDays"
						:key="index + '|inHospitalDays'"
					>
						{{ index === 0 ? "住院天数" : item }}
					</td>
				</tr>

				<tr>
					<td
						:colspan="index === 0 ? 8 : 6"
						:class="[index && 'redLineTd', !index && 'table-just']"
						v-for="(item, index) in surgeryDays"
						:key="index + '|surgeryDays'"
					>
						{{ index === 0 ? "手术或产后日数" : item }}
					</td>
				</tr>
				<tr>
					<td class="table-just" rowspan="2" colspan="8">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间</td>
					<td colspan="3">上午</td>
					<td colspan="3" class="redLineTd">下午</td>
					<td colspan="3">上午</td>
					<td colspan="3" class="redLineTd">下午</td>
					<td colspan="3">上午</td>
					<td colspan="3" class="redLineTd">下午</td>
					<td colspan="3">上午</td>
					<td colspan="3" class="redLineTd">下午</td>
					<td colspan="3">上午</td>
					<td colspan="3" class="redLineTd">下午</td>
					<td colspan="3">上午</td>
					<td colspan="3" class="redLineTd">下午</td>
					<td colspan="3">上午</td>
					<td colspan="3" class="redLineTd">下午</td>
				</tr>
				<tr>
					<td class="focusText">3</td>
					<td>7</td>
					<td>11</td>
					<td>15</td>
					<td class="focusText">19</td>
					<td class="focusText redLineTd">23</td>
					<td class="focusText">3</td>
					<td>7</td>
					<td>11</td>
					<td>15</td>
					<td class="focusText">19</td>
					<td class="focusText redLineTd">23</td>
					<td class="focusText">3</td>
					<td>7</td>
					<td>11</td>
					<td>15</td>
					<td class="focusText">19</td>
					<td class="focusText redLineTd">23</td>
					<td class="focusText">3</td>
					<td>7</td>
					<td>11</td>
					<td>15</td>
					<td class="focusText">19</td>
					<td class="focusText redLineTd">23</td>
					<td class="focusText">3</td>
					<td>7</td>
					<td>11</td>
					<td>15</td>
					<td class="focusText">19</td>
					<td class="focusText redLineTd">23</td>
					<td class="focusText">3</td>
					<td>7</td>
					<td>11</td>
					<td>15</td>
					<td class="focusText">19</td>
					<td class="focusText redLineTd">23</td>
					<td class="focusText">3</td>
					<td>7</td>
					<td>11</td>
					<td>15</td>
					<td class="focusText">19</td>
					<td class="focusText">23</td>
				</tr>
				<tr class="recorde temperature_mark">
					<td colspan="2" rowspan="45">
						<div class="num_wrapper">
							<p style="margin-top: 0">呼<br />吸<br />●</p>
							<p style="margin-top: 12px">90</p>
							<p>80</p>
							<p>70</p>
							<p>60</p>
							<p>50</p>
							<p>40</p>
							<p>30</p>
							<p style="margin-top: 56px">20</p>
						</div>
					</td>
					<td colspan="3" rowspan="45">
						<div style="color: red" class="num_wrapper">
							<p style="margin-top: 0">脉<br />搏<br />●</p>
							<p style="margin-top: 12px">160</p>
							<p>140</p>
							<p>120</p>
							<p>100</p>
							<p>80</p>
							<p>60</p>
							<p>40</p>
							<p style="margin-top: 56px">20</p>
						</div>
					</td>
					<td colspan="3" rowspan="45">
						<div style="color: blue" class="num_wrapper">
							<p style="margin-top: 0">体<br />温<br />x</p>
							<p style="margin-top: 12px">41</p>
							<p>40</p>
							<p>39</p>
							<p>38</p>
							<p>37</p>
							<p>36</p>
							<p>35</p>
							<p style="margin-top: 56px">34</p>
						</div>
					</td>
					<td v-for="(item, y) in tdList" :key="y + 'td0'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']">
						<div class="recorde-text">
							<!--              {{ getSymbolTextArr(y) }}-->
						</div>
					</td>
				</tr>

				<tr class="recorde" v-for="(tr, index) in [0, 0, 0]" :key="index + 'tr1'">
					<td v-for="(item, y) in tdList" :key="y + 'td1'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>

				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td2'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td2'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>

				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr2'">
					<td v-for="(item, y) in tdList" :key="y + 'td3'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>
				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td4'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td4'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>

				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr3'">
					<td v-for="(item, y) in tdList" :key="y + 'td5'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>

				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td6'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td6'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>

				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr4'">
					<td v-for="(item, y) in tdList" :key="y + 'td7'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>

				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td8'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td8'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>

				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr5'">
					<td v-for="(item, y) in tdList" :key="y + 'td9'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>

				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td10'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td10'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>
				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr6'">
					<td v-for="(item, y) in tdList" :key="y + 'td11'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>
				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td11'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td11'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>

				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr7'">
					<td v-for="(item, y) in tdList" :key="y" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>
				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td12'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td12'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>
				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0]" :key="index + 'tr8'">
					<td v-for="(item, y) in tdList" :key="y + 'td13'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>
				<tr class="recorde">
					<template v-for="(item, index) of tdList">
						<td
							:key="index + 'td14'"
							v-if="index % 6 === 5 && index != tdList.length"
							style="border-right: 1px solid #ff6e71; border-bottom: 1px solid #7e7eff"
						></td>
						<td :key="index + 'td14'" v-else style="border-bottom: 1px solid #7e7eff"></td>
					</template>
				</tr>
				<tr class="recorde" v-for="(tr, index) in [0, 0, 0, 0, 0]" :key="index + 'tr9'">
					<td v-for="(item, y) in tdList" :key="y + 'td15'" :class="[y % 6 === 5 && y != tdList.length && 'redLineTd']"></td>
				</tr>
				<tr></tr>
				<tr>
					<td
						:colspan="index === 0 ? 8 : 6"
						v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7]"
						:class="[index && 'redLineTd']"
						:key="index + '|008'"
					>
						<!--						{{ index === 0 ? "血压(mmHg)" : typesViewData["008"] && typesViewData["008"][index - 1] }}-->
					</td>
				</tr>
				<tr>
					<td
						:colspan="index === 0 ? 8 : 6"
						v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7]"
						:class="[index && 'redLineTd']"
						:key="index + '|006'"
					>
						<!--						{{ index === 0 ? "入水量(ml)" : typesViewData["006"] && typesViewData["006"][index - 1] }}-->
					</td>
				</tr>
			</tbody>
		</table>
		<div class="legend">
			<span>标注：</span>
			<div class="legend-text">
				<div class="legend-item" style="color: blue">体温: x</div>
				<div class="legend-item">呼吸: ●</div>
				<div class="legend-item">物理降温： ○</div>
				<div class="legend-item" style="color: red">心率：○</div>
				<div class="legend-item" style="color: red">脉搏：●</div>
			</div>
			<div>
				{{ `第${numberToChinese(+info.weekNo + 1)}周` }}
			</div>
		</div>
	</div>
</template>

<script setup>
import dayjs from "dayjs";
import { numberToChinese } from "@/utils";

// const comKey = ref(1);
// const marginTop = ref(0);

const info = ref({
	// age: 0, // 年龄
	// originName: "河南中医药大学第三附属医院", // 医院名称
	// ageunit: "", // 年龄单位 岁、月
	// beginDate: "", // 开始日期
	// hospCode: "", // 住院号
	// inDiagName: null, // 诊断
	// name: "", // 患者姓名
	// officeName: "", // 科室名称
	// sex: "", // 性别
	// weekNo: "" // 第几周

	age: 66, // 患者年龄
	sex: "男",
	ageunit: "岁", // 年龄单位 岁 /  月
	beginDate: "2023-03-25", // 本组数据开始日期
	hospCode: "0000000006", // 住院号
	originName: "测试医院名称", // 医院名称
	hospDays: 0, // 本组开始日期 是第几天住院天数
	inDiagName: "上呼吸道感染", // 诊断
	name: "患者9", // 患者姓名
	officeName: "住院科室", // 住院科室
	operaDays: null, // 手术日期
	weekNo: "0" // 本组数据是第几周
});

const tdList = ref(new Array(42).fill(0));

// 住院日期
const inHospitalTime = computed(() => {
	const initday = dayjs(info.value.beginDate);
	return [
		null, // 文案天
		initday.format("YYYY-MM-DD"),
		initday.add(1, "day").format("YYYY-MM-DD"),
		initday.add(2, "day").format("YYYY-MM-DD"),
		initday.add(3, "day").format("YYYY-MM-DD"),
		initday.add(4, "day").format("YYYY-MM-DD"),
		initday.add(5, "day").format("YYYY-MM-DD"),
		initday.add(6, "day").format("YYYY-MM-DD")
	];
});

// 住院天数
const inHospitalDays = computed(() => {
	const initday = info.value.hospDays || 0;
	return [
		null, // 文案天
		initday + 1,
		initday + 2,
		initday + 3,
		initday + 4,
		initday + 5,
		initday + 6,
		initday + 7
	];
});

// 产后或手术后天数
const surgeryDays = computed(() => {
	const initday = info.value.operaDays;

	if (!initday) {
		return new Array(8).fill(null);
	}
	return [
		null, // 文案天
		initday,
		initday + 1,
		initday + 2,
		initday + 3,
		initday + 4,
		initday + 5,
		initday + 6
	];
});
</script>

<style scoped lang="less">
.table_wrap {
	line-height: normal;
	position: relative;
	margin: 0 auto;
	width: 835px;
	font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.container {
	// 高度最好动态计算，不然很容易错位
	margin: 30px auto;
	// margin-top: 48px;
	margin-top: 28px;
	width: 800px;
	height: 758px;
	position: absolute;
	top: 170px;
	left: 40px;
}

table {
	font-weight: normal;
	border-collapse: collapse;
	font-size: 8px;
	text-align: center;
	width: 100%;
	table-layout: fixed;
	border: 2px #2f4f4f solid;
}

td {
	border: 1px solid #ccc;
	width: 12px;
	height: 11px;
}

.redLineTd {
	border-right: 1px solid #ff6e71;
}

.recorde-text {
	width: 13px;
	height: 8px;
	color: #ff0000;
	font-size: 10px;
	position: relative;
	top: -4px;
}

.temperature_mark td p {
	position: relative;
	top: 0;
	margin-top: 55px;
}

.num_wrapper {
	width: 100%;
	height: 636px;
	//position: relative;
}

.legend {
	display: flex;
	.legend-text {
		display: flex;
	}
	.legend-item {
		margin-right: 20px;
	}
}
</style>
