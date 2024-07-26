<!--
  文件描述：
  创建时间：2024/2/29 17:45
  创建人：gzh
-->
<template>
	<n-date-picker
		v-if="type === 'datetimerange'"
		style="width: 100%"
		:clearable="clearable"
		type="datetimerange"
		format="yyyy-MM-dd HH:mm:ss"
		v-model:formatted-value="modelValue"
		:default-time="['00:00:00', '23:59:59']"
		:shortcuts="rangeShortcuts"
	>
	</n-date-picker>
	<n-date-picker
		v-else-if="type === 'daterange'"
		style="width: 100%"
		type="daterange"
		format="yyyy-MM-dd"
		:clearable="clearable"
		v-model:formatted-value="modelValue"
		:shortcuts="rangeShortcuts"
	/>
</template>

<script setup>
import dayjs from "dayjs";

defineOptions({ name: "DateRange" });

const emits = defineEmits(["update:value"]);

const props = defineProps({
	value: {
		type: [String, Array]
	},
	dataType: {
		type: String,
		default: "string", // 值为string 或者 array
		validator(value) {
			return ["string", "array"].includes(value);
		}
	},
	type: {
		type: String,
		default: "datetimerange", // 值为datetimerange 或者 daterange
		validator(value) {
			return ["datetimerange", "daterange"].includes(value);
		}
	},
	clearable: {
		type: Boolean,
		default: true
	}
});

const modelValue = computed({
	get() {
		if (props.value && props.dataType === "string") {
			console.log(props.value);
			return props.value.split(" ~ ");
		}
		return props.value;
	},
	set(val) {
		if (val && props.dataType === "string") {
			emits("update:value", val.join(" ~ "));
		} else {
			emits("update:value", val);
		}
	}
});

const rangeShortcuts = {
	昨天: [dayjs().subtract(1, "day").startOf("day").valueOf(), dayjs().subtract(1, "day").endOf("day").valueOf()],
	今天: [dayjs().startOf("day").valueOf(), dayjs().endOf("day").valueOf()],
	三天: [dayjs().subtract(3, "day").startOf("day").valueOf(), dayjs().endOf("day").valueOf()],
	本月: [dayjs().startOf("month").valueOf(), dayjs().endOf("month").valueOf()],
	上一月: [dayjs().subtract(1, "month").startOf("month").valueOf(), dayjs().subtract(1, "month").endOf("month").valueOf()],
	半年: [dayjs().subtract(6, "month").startOf("day").valueOf(), dayjs().endOf("day").valueOf()],
	今年: [dayjs().startOf("year").valueOf(), dayjs().endOf("year").valueOf()],
	去年: [dayjs().subtract(1, "year").startOf("year").valueOf(), dayjs().subtract(1, "year").endOf("year").valueOf()],
	三年: [dayjs().subtract(3, "year").startOf("day").valueOf(), dayjs().endOf("year").valueOf()],
	十年: [dayjs().subtract(10, "year").startOf("day").valueOf(), dayjs().endOf("year").valueOf()]
	// [`${dayjs().subtract(10, "year").format(format)} 00:00:00`, `${dayjs().format(format)} 23:59:59`];
};
// setDateRange(1);
</script>

<style scoped></style>
