/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the resume out of search results.
  async headers() {
    return [
      {
        source: "/Anurag-Kumar-Resume.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  // There is no projects index page; the list lives on the home page.
  async redirects() {
    return [{ source: "/projects", destination: "/#projects", permanent: false }];
  },
};

export default nextConfig;
