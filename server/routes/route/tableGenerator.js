const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
const { query } = require("../../dbhelper/db");
const { toHump, isFileExisted } = require("../../utils/index");

router.prefix("/generator");

router.get("/", ctx => {
	ctx.body = "这是生成器响应!";
});

router.get("/getDataSheet", async ctx => {
	const result = await query(
		{
			host: ctx.query.host,
			port: ctx.query.port,
			user: ctx.query.user,
			password: ctx.query.password,
			database: ctx.query.database
		},
		`SELECT
          COLUMN_NAME columnName,
          column_comment columnComment,
          column_type columnType,
          column_key columnKey
        FROM
          information_schema.COLUMNS
        WHERE
          table_schema = '${ctx.query.database}' and
          table_name = '${ctx.query.datasheet}'`
	);

	ctx.res.$success(
		result.map(item => {
			return { ...item, humpName: toHump(item.columnName), columnTitle: item.columnComment, columnWidth: 100, isShow: 1 };
		})
	);
});

/**
 * 生成table表格
 */
router.post("/generateTable", async ctx => {
	const tableList = ctx.request.body;
	const coums = tableList
		.filter(item => item.isShow === 1)
		.map(item => {
			return `<vxe-column field="${item.humpName}" min-width="${item.columnWidth}px" show-overflow="title" title="${item.columnTitle}"></vxe-column>`;
		})
		.join("\n\t\t\t\t\t");
	isFileExisted("D:\\index.vue");
	const vueText = fs.readFileSync(path.resolve(process.cwd(), "server/static/template.vue"), "utf-8");

	fs.writeFileSync(path.resolve(process.cwd(), "server/static/index.vue"), vueText.replace("&*****&", coums));
	// const pathUrl = path.resolve(process.cwd(), "server/static/index.vue");
	ctx.body = Buffer.from(vueText.replace("&*****&", coums), "utf-8"); // fs.readFileSync(pathUrl);
});

module.exports = router;
