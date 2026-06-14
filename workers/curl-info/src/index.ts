export interface Env {
  // Cloudflare Workers environment bindings
}

const ASCII_HEADER = `
+================================================+
| ██╗  ██╗███████╗██╗     ██╗      ██████╗       |
| ██║  ██║██╔════╝██║     ██║     ██╔═══██╗      |
| ███████║█████╗  ██║     ██║     ██║   ██║      |
| ██╔══██║██╔══╝  ██║     ██║     ██║   ██║      |
| ██║  ██║███████╗███████╗███████╗╚██████╔╝      |
| ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝       |
|                                                |
| ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗ ██╗ |
| ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗██║ |
| ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║██║ |
| ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║╚═╝ |
| ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝██╗ |
|  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝ |
+================================================+
`;

const HOMEPAGE_INFO = `
Taha Khan | Software Engineer

Currently working at Alexa (voice assistant). Generalist (full-stack) engineer with
experience in front-end, back-end, and infrastructure/cloud.

LINKS:
  • Posts:  https://taha-khan.medium.com/
  • GitHub: https://github.com/TahaNKhan/
  • LinkedIn: https://www.linkedin.com/in/tahakhan1112/
  • Email:   taha1112+curl@gmail.com

P.S. You found the easter egg. Great work!
================================================================================
`;

function isCurlRequest(request: Request): boolean {
  const userAgent = request.headers.get("User-Agent") || "";
  return userAgent.toLowerCase().startsWith("curl/");
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // If curl detected, return terminal-friendly homepage
    if (isCurlRequest(request)) {
      return new Response(`${ASCII_HEADER}\n${HOMEPAGE_INFO}`, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Served-By": "Cloudflare-Worker",
        },
      });
    }

    // Otherwise redirect to www.tahakhan.xyz
    const url = new URL(request.url);
    return Response.redirect(`https://www.tahakhan.xyz${url.pathname}${url.search}`, 301);
  },
};
