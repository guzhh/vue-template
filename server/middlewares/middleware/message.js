module.exports = async (ctx, next) => {
	ctx.res.$success = (data, status = 200) => {
		const _data = {
			status
		};
		if (typeof data === "object") {
			_data.message = "操作成功";
			_data.result = data;
		} else {
			_data.message = data;
		}
		_data.success = true;
		ctx.body = _data;
	};

	ctx.res.$error = (err, status = 500) => {
		const _data = {
			status
		};
		if (typeof err === "object") {
			_data.message = "操作失败";
			_data.result = JSON.stringify(err);
		} else {
			_data.message = err;
		}
		_data.success = false;
		ctx.body = _data;
	};

	await next();
};

/**
 * 示例
 */
/*
 router.get('/demo/:id', async (ctx) => {
  const request = ctx.request.body;
  const { username, password } = request;
  if (username === "tate") {
    let res = await query(USERLIST_SQL);
    const token = sign({ username, test: "testok" }, secret, {
      expiresIn: "1h",
    });
    ctx.res.$success({ token, list: res.data });
  } else {
    ctx.res.$error("请求失败", 403);
  }
})
*/
