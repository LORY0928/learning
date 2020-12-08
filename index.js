const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

router.prefix("/api");

router.post("/user", (ctx) => {
  const { role } = ctx.request.header;
  const { name, email } = ctx.request.body;
  if (!name || !email) {
    ctx.body = { code: 404, msg: "name与email不能为空" };
  } else if (
    role === "admin" &&
    name === "imooc" &&
    email === "imooc@email.com"
  ) {
    ctx.body = {
      code: 200,
      msg: "上传成功",
      data: { name: name, email: email },
    };
  } else if (!role || role !== "admin") {
    ctx.body = { code: 401, msg: "unauthorized post" };
  }
});

app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
