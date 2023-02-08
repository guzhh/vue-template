/**
 * 文件选取方法
 * @param accept 要选取的文件个格式
 * @param number 要选取的文件个数
 * @param size 要选取的文件大小
 * @returns {Promise<unknown>}
 */
export default function file({ accept, number, size }) {
	return new Promise(resolve => {
		// 创建文件选择框
		const inputObj = document.createElement("input");
		inputObj.setAttribute("id", "file");
		inputObj.setAttribute("type", "file");
		inputObj.setAttribute("name", "file");
		inputObj.setAttribute("style", "visibility: hidden; display: none");
		inputObj.setAttribute("accept", accept || ""); // 设置文件格式
		if (number && number > 1) {
			inputObj.setAttribute("multiple", "multiple"); // 设置多选
		}
		document.body.appendChild(inputObj);
		inputObj.click(); // 触发选择
		// 选择回调
		inputObj.addEventListener("change", e => {
			console.log(e.target.files);
			let fileList = Array.from(e.target.files);
			if (size) {
				// 过滤不符合大小的文件
				fileList = fileList.filter(item => {
					return item.size <= size * 1024 * 1024;
				});
			}
			if (number && fileList.length > number) {
				// 只拿到需要的文件个数
				fileList = fileList.slice(0, number);
			}
			resolve(fileList);
			inputObj.parentNode.removeChild(inputObj);
		});
	});
}
