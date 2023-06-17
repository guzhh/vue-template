export const getOptionFind = (options, val) => { let option = options.find(item => item.value === val); if (!option) { option = {
label: "未知", type: "info" }; } return option; }; /** * 主要用于select组件动态查看分页 * @type {number} */ export const page = {
pageSize: 10, pageNo: 1 };
