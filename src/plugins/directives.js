/**
 * 注册全局自定义指令
 * @param app
 */
import { useUserStore } from "@/store";

export function setupDirectives(app) {
	const userStore = useUserStore();

	/**
	 * 判断当前用户是否拥有某项权限权限
	 * @param key
	 * @returns {boolean}
	 */
	function checkArray(key) {
		const permissionList = userStore.resourceList.map(item => item.permissionFlag);
		const index = permissionList.indexOf(key);
		return index > -1;
	}

	/**
	 * Action 权限指令
	 * 指令用法：
	 * ---
	 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method]
	 *  - 说明：[method] 为当前资源的权限标识
	 *  - 例如：`<el-button v-action:addUser>添加用户</el-button>`
	 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
	 */
	app.directive("action", {
		mounted(el, binding) {
			const actionName = binding.arg;
			if (actionName) {
				const hasPermission = checkArray(actionName); // 判断当前用户是否拥有该权限
				if (!hasPermission) {
					// 没有权限
					// eslint-disable-next-line no-unused-expressions
					el.parentNode && el.parentNode.removeChild(el);
				}
			}
		}
	});
	// app.directive("action", (el, binding, vnode) => {
	// 	const actionName = binding.arg;
	// 	if (actionName) {
	// 		const hasPermission = checkArray(actionName);
	// 		if (!hasPermission) {
	// 			const comment = document.createComment(" ");
	// 			Object.defineProperty(comment, "setAttribute", {
	// 				value: () => undefined
	// 			});
	// 			console.log(vnode);
	// 			// vnode.elm = comment;
	// 			// vnode.text = " ";
	// 			// vnode.isComment = true;
	// 			// vnode.context = undefined;
	// 			// vnode.tag = undefined;
	// 			// vnode.data.directives = undefined;
	// 			//
	// 			// if (vnode.componentInstance) {
	// 			// 	vnode.componentInstance.$el = comment;
	// 			// }
	// 			//
	// 			// if (el.parentNode) {
	// 			// 	el.parentNode.replaceChild(comment, el);
	// 			// }
	// 		}
	// 	}
	// });

	/**
	 * currentUser 当前登陆人指令
	 * 指令用法：
	 * ---
	 *  - 传入用户id判断该用户是否为当前登录人 v-currentUser="userId"
	 *  - 说明：userId 为用户id
	 *  - 例如：`<el-button v-currentUser="scope.row.userId">创建人</el-button>`
	 *  - 如果当前登陆人和项目的负责人不一致，组件上使用了该指令则会被隐藏
	 */
	app.directive("currentUser", {
		updated(el, binding) {
			const userId = userStore.id;
			if (binding.value !== userId) {
				// eslint-disable-next-line no-param-reassign
				el.style.visibility = "hidden";
			} else {
				// eslint-disable-next-line no-param-reassign
				el.style.visibility = "visible";
			}
		}
	});
}
