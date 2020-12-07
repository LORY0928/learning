const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.prefix("/api");

router.post("/user", (ctx) => {
  const { role } = ctx.request.header;
  const { name, email } = ctx.request.body;
  const resultBody = [
    { code: 404, msg: "404" },
    { code: 404, msg: "name与email不能为空" },
    { code: 401, msg: "unauthorized post" },
    { code: 200, msg: "上传成功", data: { name: name, email: email } },
  ];
  let i = 0;
  if (role === "admin" && name === "imooc" && email === "imooc@email.com")
    i = 3;
  if (!role || role !== "admin") i = 2;
  if (!name || !email) i = 1;
  console.log("index: ", i);
  ctx.body = resultBody[i];
});

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
