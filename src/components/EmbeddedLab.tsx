import React from "react";

type EmbeddedLabProps = {
  src: string;
  title?: string;
  height?: string | number;
};

const HOST_WHITELIST = [
  "phet.colorado.edu",
  "phet.colorado.edu:443",
  "phet.colorado.edu:80",
  "demo.playcanvas.com",
  "cdn.jsdelivr.net",
  "openstax.org",
];

function isAllowedHost(url: string) {
  try {
    const u = new URL(url);
    return HOST_WHITELIST.includes(u.hostname) || HOST_WHITELIST.includes(`${u.hostname}:${u.port}`) || HOST_WHITELIST.includes(u.host);
  } catch {
    return false;
  }
}

const EmbeddedLab: React.FC<EmbeddedLabProps> = ({ src, title, height = "80vh" }) => {
  if (!src) {
    return <div className="p-6">No simulation URL provided.</div>;
  }

  const allowed = isAllowedHost(src);

  if (!allowed) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center p-6 bg-muted/30 rounded-md">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Embedding blocked</h3>
          <p className="text-sm text-muted-foreground">The provided URL is not on the trusted hosts whitelist.</p>
          <p className="mt-2 text-xs text-muted-foreground">If you control the target lab, add its host to <code>HOST_WHITELIST</code> in <code>src/components/EmbeddedLab.tsx</code>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <iframe
        title={title ?? "Embedded Lab"}
        src={src}
        className="w-full h-full border-0 rounded-md shadow-sm"
        sandbox={"allow-forms allow-scripts allow-same-origin allow-popups"}
        loading="lazy"
      />
    </div>
  );
};

export default EmbeddedLab;
