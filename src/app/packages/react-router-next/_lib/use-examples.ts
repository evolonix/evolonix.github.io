import { notFound } from "@evolonix/react-router-next";
import { use } from "react";
import type { HighlightLang } from "./highlight";

export interface Example {
  id: string;
  title: string;
  blurb: string;
  detail: string;
  code: string;
  lang?: HighlightLang;
  tone: string;
}

const EXAMPLES: Example[] = [
  {
    id: "page-and-layout",
    title: "page.tsx + layout.tsx",
    blurb: "The two file conventions that drive every route.",
    detail:
      "A page.tsx is the leaf component for a route. A layout.tsx wraps its children via <Outlet /> and persists across navigation between sibling routes.",
    tone: "from-slate-400 to-slate-300",
    code: `// src/app/dashboard/layout.tsx
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <section>
      <h1>Dashboard</h1>
      <Outlet />
    </section>
  );
}

// src/app/dashboard/page.tsx
export default function DashboardHome() {
  return <p>Welcome back.</p>;
}`,
  },
  {
    id: "dynamic-segments",
    title: "Dynamic segments [id]",
    blurb: "Typed params from the folder name — no manual generics.",
    detail:
      "A folder named [postId] becomes :postId in the URL and a typed { postId: string } on the page's RouteProps. The runtime parses params from the URL and passes them in as a prop.",
    tone: "from-blue-500 to-sky-400",
    code: `// src/app/posts/[postId]/page.tsx
import type { RouteProps } from "virtual:react-router-next/posts/[postId]";

export default function PostPage({ params }: RouteProps) {
  return <article>Post id: {params.postId}</article>;
}`,
  },
  {
    id: "route-groups",
    title: "Route groups (group)",
    blurb: "Organize folders without leaking into the URL.",
    detail:
      "A folder name wrapped in parentheses is stripped from the route. Use it to colocate marketing pages, admin areas, or feature flags under a shared prefix without changing the URL.",
    tone: "from-blue-500 to-sky-400",
    lang: "text",
    code: `src/app/
└── (marketing)/        // ← stripped from URL
    ├── about/page.tsx  // /about
    └── pricing/page.tsx// /pricing`,
  },
  {
    id: "parallel-slots",
    title: "Parallel slots @name",
    blurb: "Render multiple independent route trees in one layout.",
    detail:
      "A folder starting with @ does not contribute a URL segment. Instead it is matched independently against the current URL and passed to the parent layout as a named prop alongside the main <Outlet />.",
    tone: "from-fuchsia-500 to-pink-400",
    code: `// src/app/dashboard/layout.tsx
export default function DashboardLayout({
  analytics,
}: {
  analytics: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <main><Outlet /></main>
      <aside>{analytics}</aside>
    </div>
  );
}`,
  },
  {
    id: "intercepting-routes",
    title: "Intercepting routes (.)",
    blurb: "Modals that survive refresh and back/forward.",
    detail:
      "An interceptor folder named (.) (or (..) or (...)) renders its page.tsx on soft-navigation (PUSH/REPLACE), while a hard load or POP renders the original target page. Pair with a @modal slot so the underlying page stays mounted behind the dialog.",
    tone: "from-amber-500 to-orange-400",
    lang: "text",
    code: `gallery/
├── layout.tsx              // ({ modal }) — main flow + slot overlay
├── page.tsx                // /gallery (stays mounted on soft-nav)
├── [id]/page.tsx           // /gallery/:id (refresh / POP)
└── @modal/
    ├── default.tsx         // null when nothing selected
    └── (.)[id]/page.tsx    // /gallery/:id (PUSH / REPLACE)`,
  },
  {
    id: "loading-and-error",
    title: "loading.tsx & error.tsx",
    blurb: "Boundaries that wrap the whole subtree.",
    detail:
      "Drop a loading.tsx and the runtime injects a Suspense + transition fallback around every descendant. Drop an error.tsx and it becomes the errorElement for the route. Both scoped to wherever you place them.",
    tone: "from-emerald-500 to-green-400",
    code: `// src/app/posts/loading.tsx
export default function Loading() {
  return <p>Loading posts…</p>;
}

// src/app/posts/[postId]/error.tsx
import { useRouteError } from "@evolonix/react-router-next";

export default function PostError() {
  const error = useRouteError();
  return <p>Something went wrong: {String(error)}</p>;
}`,
  },
  {
    id: "not-found",
    title: "notFound() + not-found.tsx",
    blurb: "Throw from anywhere, render the nearest boundary.",
    detail:
      "A not-found.tsx renders when a URL doesn't match a descendant or when notFound() is called during render. The nearest ancestor wins, so you can scope 404 UI per area of the app.",
    tone: "from-emerald-500 to-green-400",
    code: `// src/app/posts/_lib/use-posts.ts
import { notFound } from "@evolonix/react-router-next";
import { use } from "react";

const cache = new Map<string, Promise<Post>>();

export function usePost(id: string): Post {
  let p = cache.get(id);
  if (!p) {
    p = fetchPost(id).then((post) => {
      if (!post) notFound();
      return post;
    });
    cache.set(id, p);
  }
  return use(p);
}`,
  },
  {
    id: "typed-generate",
    title: "Typed generate(...)",
    blurb: "URL builders that fail at compile time, not runtime.",
    detail:
      "Every dynamic route exposes a generate(params) helper from its virtual module. Pass the wrong shape and TypeScript catches it before the URL is built.",
    tone: "from-blue-500 to-sky-400",
    code: `import { generate as generatePost } from "virtual:react-router-next/posts/[postId]";

<NavLink to={generatePost({ postId: "a" })}>First post</NavLink>;`,
  },
];

const listPromise: Promise<Example[]> = new Promise((resolve) => {
  setTimeout(() => resolve(EXAMPLES), 120);
});

const itemCache = new Map<string, Promise<Example>>();

function loadExample(id: string): Promise<Example> {
  let p = itemCache.get(id);
  if (!p) {
    p = new Promise<Example>((resolve) => {
      setTimeout(() => {
        const match = EXAMPLES.find((e) => e.id === id);
        if (!match) notFound();
        resolve(match!);
      }, 200);
    });
    itemCache.set(id, p);
  }
  return p;
}

export function useExamples(): Example[] {
  return use(listPromise);
}

export function useExample(id: string): Example {
  return use(loadExample(id));
}
