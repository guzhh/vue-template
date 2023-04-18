const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
// eslint-disable-next-line camelcase
const { query_mysql, query_oracle } = require("../../dbhelper/db");
const { toHump, isFileExisted } = require("../../utils/index");

router.prefix("/generator");

router.get("/", ctx => {
	ctx.body = "这是生成器响应!";
});

router.get("/getDataSheet", async ctx => {
	if (ctx.query.dbType === "mysql") {
		const result = await query_mysql(
			{
				host: ctx.query.host,
				port: ctx.query.port,
				user: ctx.query.user,
				password: ctx.query.password,
				database: ctx.query.database
			},
			`SELECT
          COLUMN_NAME columnname,
          column_comment columncomment,
          column_type columntype,
          column_key columnkey
        FROM
          information_schema.COLUMNS
        WHERE
          table_schema = '${ctx.query.database}' and
          table_name = '${ctx.query.datasheet}'`
		);

		console.log("-------", result);

		ctx.res.$success(
			result.map(item => {
				return { ...item, humpname: toHump(item.columnname), columntitle: item.columncomment, columnwidth: 100, isshow: 1 };
			})
		);
	} else {
		const result = await query_oracle(
			{
				user: ctx.query.user,
				password: ctx.query.password,
				connectString: `${ctx.query.host}:${ctx.query.port}/orcl` // 数据库地址：{IP:PORT/数据库名称}
			},
			`SELECT b.column_name columnname
            ,a.comments columncomment
            ,b.data_type columntype
            FROM all_col_comments a
            ,all_tab_columns b
            WHERE a.table_name = b.table_name and a.OWNER = b.OWNER and a.Column_name = b.Column_name and
            a.table_name = '${ctx.query.datasheet.toUpperCase()}'
            `
		);

		console.log("--------", result);

		ctx.res.$success(
			result.map(item => {
				return { ...item, humpname: toHump(item.columnname), columntitle: item.columncomment, columnwidth: 100, isshow: 1 };
			})
		);
	}
});

/**
 * 生成table表格
 */
router.post("/generateTable", async ctx => {
	const tableList = ctx.request.body;
	const coums = tableList
		.filter(item => item.isshow === 1)
		.map(item => {
			return `<vxe-column field="${item.humpname}" min-width="${item.columnwidth}px" show-overflow="title" title="${item.columntitle}"></vxe-column>`;
		})
		.join("\n\t\t\t\t\t");
	isFileExisted("D:\\index.vue");
	const vueText = fs.readFileSync(path.resolve(process.cwd(), "server/static/template.vue"), "utf-8");

	fs.writeFileSync(path.resolve(process.cwd(), "server/static/index.vue"), vueText.replace("&*****&", coums));
	// const pathUrl = path.resolve(process.cwd(), "server/static/index.vue");
	ctx.body = Buffer.from(vueText.replace("&*****&", coums), "utf-8"); // fs.readFileSync(pathUrl);
});

module.exports = router;
