import { defineComponent, h, nextTick, ref } from "vue";
import { NInput } from "naive-ui";

export default defineComponent({
	props: {
		value: [String, Number],
		onUpdateValue: [Function, Array]
	},
	setup(props) {
		const isEdit = ref(false);
		const inputRef = ref(null);
		const inputValue = ref(props.value);
		function handleOnClick() {
			isEdit.value = true;
			nextTick(() => {
				inputRef.value.focus();
			});
		}
		function handleChange() {
			props.onUpdateValue(inputValue.value);
			isEdit.value = false;
		}
		return () =>
			h(
				"div",
				{
					style: "min-height: 22px",
					onClick: handleOnClick
				},
				isEdit.value
					? h(NInput, {
							ref: inputRef,
							value: inputValue.value,
							onUpdateValue: v => {
								inputValue.value = v;
							},
							onChange: handleChange,
							onBlur: handleChange
					  })
					: props.value
			);
	}
});
