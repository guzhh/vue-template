import { createApp } from "vue";
import Loading from "./index.vue";

// const $loading = createApp();

class LoadingFun {
	constructor(msg) {
		this.$loading_box = document.createElement("div");
		document.body.appendChild(this.$loading_box);
		this.$loading_app = createApp(Loading, { msg }).mount(this.$loading_box);
	}

	static load(msg) {
		return new LoadingFun(msg);
	}

	close() {
		this.$loading_box.remove();
		this.$loading_app = null;
		this.$loading_box = null;
	}
}

export default LoadingFun;
