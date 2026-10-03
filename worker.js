export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only randomize when visiting the root path /
    if (url.pathname === "/" || url.pathname === "") {
      const country = request.cf?.country;

      if (country === "CN") {
        // Pool of random pages for CN traffic
        const cnPool = [
          "/cn/index.html",
          "/cn/index2.html",
          "/cn/index3.html"
        ];
        
        // Pick one at random
        const chosen = cnPool[Math.floor(Math.random() * cnPool.length)];
        url.pathname = chosen;
      } else {
        url.pathname = "/default/index.html";
      }

      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // Serve all assets (videos, scripts, styles) normally
    return env.ASSETS.fetch(request);
  }
};