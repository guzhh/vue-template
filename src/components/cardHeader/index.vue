<template>
	<div class="title">
		<i></i>
		<span>
			<slot></slot>
		</span>
	</div>
</template>

<script></script>

<style scoped lang="less">
.title {
	display: flex;
	align-items: center;
	font-size: 14px;
	font-weight: bold;
	color: #202532;

	i {
		display: inline-block;
		border-left: 4px solid #0774ff;
		height: 14px;
		margin-right: 4px;
		margin-bottom: 2px;
	}
}
</style>
