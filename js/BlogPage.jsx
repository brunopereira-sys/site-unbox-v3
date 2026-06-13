// BlogPage.jsx — índice do Blog "Venda Mais!" no design atual.
// Lê window.BLOG_POSTS (metadados gerados do CSV do Webflow).

const POST_URL = (slug) => "Unbox - Blog-Post.html?slug=" + encodeURIComponent(slug);

function BlogMeta({ post }) {
  return (
    <div className="blog-card-meta">
      <span>{post.author}</span>
      <span className="dot"></span>
      <span>{post.date}</span>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <a className="blog-card reveal" href={POST_URL(post.slug)}>
      <div className="blog-card-media">
        {post.image ? <img src={post.image} alt={post.name} loading="lazy" /> : null}
      </div>
      <div className="blog-card-body">
        <span className="blog-chip">{post.category}</span>
        <h3 className="blog-card-title">{post.name}</h3>
        <p className="blog-card-overview">{post.overview}</p>
        <BlogMeta post={post} />
      </div>
    </a>
  );
}

function FeaturedPost({ post }) {
  return (
    <a className="blog-feature reveal" href={POST_URL(post.slug)}>
      <div className="blog-feature-media">
        {post.image ? <img src={post.image} alt={post.name} loading="lazy" /> : null}
      </div>
      <div className="blog-feature-body">
        <span className="blog-chip">Em destaque · {post.category}</span>
        <h2 className="blog-card-title">{post.name}</h2>
        <p className="blog-card-overview">{post.overview}</p>
        <BlogMeta post={post} />
      </div>
    </a>
  );
}

function BlogPage() {
  const all = (window.BLOG_POSTS || []);
  const [q, setQ] = React.useState("");

  useReveal();

  const term = q.trim().toLowerCase();
  const filtered = term
    ? all.filter((p) =>
        (p.name + " " + p.overview).toLowerCase().includes(term))
    : all;

  // Quando não há busca, o primeiro vira destaque e o resto entra no grid.
  const featured = !term && filtered.length ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  // Re-observa o reveal sempre que a lista muda (busca).
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    els.forEach((el) => el.classList.add("in"));
  }, [term]);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <section className="blog-hero">
          <div className="blog-hero-aura"></div>
          <div className="container">
            <span className="fpage-hero-badge reveal">Blog Venda Mais!</span>
            <h1 className="h1 reveal">
              Tudo para criar uma <em className="accent-em">marca incrível</em>.
            </h1>
            <p className="lede blog-hero-lede reveal" style={{ transitionDelay: "120ms" }}>
              Dicas, estratégias e novidades sobre e-commerce, marketing e gestão
              para você vender mais e melhor. 💜
            </p>
            <div className="blog-search reveal" style={{ transitionDelay: "180ms" }}>
              <span className="blog-search-ico">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
              </span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar no blog…"
                aria-label="Buscar no blog"
              />
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "8px" }}>
          <div className="container">
            {featured ? <FeaturedPost post={featured} /> : null}

            {rest.length ? (
              <div className="blog-grid">
                {rest.map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
            ) : null}

            {!filtered.length ? (
              <p className="blog-empty">Nenhum artigo encontrado para “{q}”.</p>
            ) : null}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
window.BlogPage = BlogPage;
ReactDOM.createRoot(document.getElementById("root")).render(<BlogPage />);
