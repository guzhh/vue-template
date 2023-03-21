// 获取相关CSS属性
const getCss = (o, key) => (o.currentStyle ? o.currentStyle[key] : document.defaultView?.getComputedStyle(o, null)[key]);

const params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false
};

const startDrag = (bar, target, callback) => {
	const screenWidth = document.body.clientWidth; // body当前宽度
	const screenHeight = document.documentElement.clientHeight; // 可见区域高度

	const dragDomW = target.offsetWidth; // 对话框宽度
	const dragDomH = target.offsetHeight; // 对话框高度

	const minDomLeft = target.offsetLeft;
	const minDomTop = target.offsetTop;

	const maxDragDomLeft = screenWidth - minDomLeft - dragDomW;
	const maxDragDomTop = screenHeight - minDomTop - dragDomH;

	if (getCss(target, "left") !== "auto") {
		params.left = getCss(target, "left");
	}
	if (getCss(target, "top") !== "auto") {
		params.top = getCss(target, "top");
	}

	// o是移动对象
	// eslint-disable-next-line no-param-reassign
	bar.onmousedown = event => {
		params.flag = true;
		if (!event) {
			// eslint-disable-next-line no-param-reassign
			event = window.event;
			// 防止IE文字选中
			// eslint-disable-next-line no-param-reassign
			bar.onselectstart = () => false;
		}
		const e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
	};
	document.onmouseup = () => {
		params.flag = false;
		if (getCss(target, "left") !== "auto") {
			params.left = getCss(target, "left");
		}
		if (getCss(target, "top") !== "auto") {
			params.top = getCss(target, "top");
		}
	};
	// eslint-disable-next-line consistent-return
	document.onmousemove = event => {
		const e = event || window.event;
		if (params.flag) {
			const nowX = e.clientX;
			const nowY = e.clientY;
			const disX = nowX - params.currentX;
			const disY = nowY - params.currentY;

			let left = parseInt(params.left, 10) + disX;
			let top = parseInt(params.top, 10) + disY;

			// 拖出屏幕边缘
			if (-left > minDomLeft) {
				left = -minDomLeft;
			} else if (left > maxDragDomLeft) {
				left = maxDragDomLeft;
			}

			if (-top > minDomTop) {
				top = -minDomTop;
			} else if (top > maxDragDomTop) {
				top = maxDragDomTop;
			}

			// eslint-disable-next-line no-param-reassign
			target.style.left = `${left}px`;
			// eslint-disable-next-line no-param-reassign
			target.style.top = `${top}px`;

			if (typeof callback === "function") {
				callback((parseInt(params.left, 10) || 0) + disX, (parseInt(params.top, 10) || 0) + disY);
			}

			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
	};
};

export default startDrag;
