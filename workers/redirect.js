export default {
  async fetch(request) {
    const url = new URL(request.url);
    return Response.redirect(`https://bupplatform.com${url.pathname}${url.search}`, 301);
  }
};
