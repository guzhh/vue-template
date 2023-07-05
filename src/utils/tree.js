/**
 * 将线行数据转成树形数据
 * @param data 要转换的数据
 * @param id 父字段名
 * @param pid 子字段名
 * @returns {*}
 */
export function setTreeData(data, id, pid) {
	const cloneData = JSON.parse(JSON.stringify(data)); // 对源数据深度克隆,防止污染原始数据
	return cloneData.filter(father => {
		const branchArr = cloneData.filter(child => parseInt(father[id], 10) === parseInt(child[pid], 10)); // 返回每一项的子级数组
		// eslint-disable-next-line no-unused-expressions,no-param-reassign
		branchArr.length > 0 ? (father.children = branchArr) : ""; // 如果存在子级，则给父级添加一个children属性，并赋值
		return parseInt(father[pid], 10) === 0; // 返回第一层
	});
}

/**
 * 将树形数据解构为线性数据
 * @param arr 要解构的数据
 * @param chaildName 子级字段名
 * @returns {[]}
 */
export function resolveTree(arr, chaildName) {
	const data = JSON.parse(JSON.stringify(arr)); // 对源数据深度克隆,防止污染原始数据
	const dataList = []; // 用于保存遍历出的数据
	(function doOneFloor(list) {
		if (Array.isArray(list)) {
			// 判断传递过来的数据是否是数组
			list.forEach(item => {
				// 判断当前数据是否存在子级，存在就递归遍历
				if (item[chaildName] && item[chaildName].length > 0) {
					doOneFloor(item[chaildName]); // 递归遍历
					// eslint-disable-next-line no-param-reassign
					delete item[chaildName];
				}
				dataList.push(item); // 将遍历出的数据保存到空数组中，用于返回
			});
		}
	})(data);
	return dataList; // 返回处理好的数据
}

/**
 * 将线行数据转成树形数据
 * @param arr 要转换的数据
 * @param code 父字段名
 * @param pcode 子字段名
 * @returns {*[]}
 */
export function convertToTreeArray(arr, code = "code", pcode = "pcode", childrenName = "children") {
	const treeArray = [];
	const map = {};

	// 先构建节点映射，方便后续查找节点
	for (let i = 0; i < arr.length; i++) {
		const { [code]: id, ...rest } = arr[i];
		map[id] = { [code]: id, ...rest };
	}

	// 根据父子关系组织节点到树中
	for (let i = 0; i < arr.length; i++) {
		const { [code]: id, [pcode]: parentId } = arr[i];
		const node = map[id];
		const parent = map[parentId];
		if (parent) {
			if (parent[childrenName] && parent[childrenName].length > 0) {
				parent[childrenName].push(node);
			} else {
				parent[childrenName] = [node];
			}
		} else {
			treeArray.push(node);
		}
	}

	return treeArray;
}
