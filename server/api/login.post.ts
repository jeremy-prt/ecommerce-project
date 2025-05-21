export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig();
  const password = config.password;

  if (body?.password === password) {
    setCookie(event, "auth", "ok", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });
    return { success: true };
  }
  event.node.res.statusCode = 401;
  return { message: "Mot de passe incorrect" };
});
