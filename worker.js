export default {
  async fetch(request, env) {
    const country = request.cf?.country || "default";
    const filePath = country === "CN"
      ? "/cn/index.html"
      : "/default/index.html";

    return env.ASSETS.fetch(filePath);
  }
};