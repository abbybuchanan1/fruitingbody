/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  // Earlier prototype rooms are kept in the codebase for reference, but anyone
  // who reaches their old addresses is sent to the room that replaced them.
  // Temporary (307) so these can change as the museum is rehung.
  async redirects() {
    return [
      { source: "/index", destination: "/directory", permanent: false },
      { source: "/map", destination: "/vestibule", permanent: false },
      { source: "/garden", destination: "/exhibition?jump=garden", permanent: false },
      { source: "/dark-garden", destination: "/exhibition?jump=garden", permanent: false },
      { source: "/light-garden", destination: "/exhibition?jump=garden", permanent: false },
      { source: "/grotto", destination: "/exhibition?jump=grotto", permanent: false },
      { source: "/threshold", destination: "/exhibition?jump=threshold", permanent: false },
      { source: "/membrane", destination: "/red-room?jump=membrane", permanent: false },
      { source: "/courtyard", destination: "/cloisters", permanent: false },
      { source: "/back-corridor", destination: "/narthex", permanent: false },
      { source: "/collections", destination: "/directory", permanent: false },
      { source: "/collections/:slug", destination: "/directory", permanent: false },
    ];
  },
};

export default nextConfig;
