import { useState, useEffect } from 'react';

const api = async (url, opts = {}) => {
  const res = await fetch(url, { ...opts, headers: { 'Content-Type': 'application/json', ...opts.headers } });
  return res.json();
};

function Nav({ tab, setTab }) {
  const tabs = [
    { id: 'posts', label: 'Blog Posts' },
    { id: 'contacts', label: 'Contact Submissions' },
    { id: 'newsletter', label: 'Newsletter Subscribers' },
  ];
  return (
    <header style={{ background: '#1E3A8A', color: 'white', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <strong style={{ fontSize: '1.1rem' }}>Essence Admin</strong>
      <nav style={{ display: 'flex', gap: '0.5rem' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
              background: tab === t.id ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'white' }}>
            {t.label}
          </button>
        ))}
      </nav>
      <a href="/" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to site</a>
    </header>
  );
}

function PostEditor({ post, onSave, onCancel }) {
  const [form, setForm] = useState(post || { slug: '', title: '', excerpt: '', category: '', read_time: '5 min read', image: '', body: [], published: false });
  const [bodyText, setBodyText] = useState(JSON.stringify(form.body || [], null, 2));
  const set = (k) => (e) => setForm({ ...form, [k]: typeof e === 'object' ? e.target.value : e });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    let body;
    try { body = JSON.parse(bodyText); } catch { alert('Body JSON invalid'); setSaving(false); return; }
    const payload = { ...form, body };
    const method = form.id ? 'PUT' : 'POST';
    await api('/api/posts', { method, body: JSON.stringify(payload) });
    setSaving(false);
    onSave();
  };

  const slugify = () => {
    if (!form.slug && form.title) {
      setForm({ ...form, slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') });
    }
  };

  const inputStyle = { width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.85rem' };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.25rem', marginTop: '0.75rem' };

  return (
    <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', maxWidth: '700px' }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{form.id ? 'Edit Post' : 'New Post'}</h2>
      <label style={labelStyle}>Title</label>
      <input style={inputStyle} value={form.title} onChange={set('title')} onBlur={slugify} placeholder="Post title" />
      <label style={labelStyle}>Slug</label>
      <input style={inputStyle} value={form.slug} onChange={set('slug')} placeholder="url-friendly-slug" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div><label style={labelStyle}>Category</label><input style={inputStyle} value={form.category} onChange={set('category')} /></div>
        <div><label style={labelStyle}>Read Time</label><input style={inputStyle} value={form.read_time} onChange={set('read_time')} /></div>
      </div>
      <label style={labelStyle}>Excerpt</label>
      <textarea style={{ ...inputStyle, minHeight: '60px' }} value={form.excerpt} onChange={set('excerpt')} />
      <label style={labelStyle}>Cover Image Path</label>
      <input style={inputStyle} value={form.image} onChange={set('image')} placeholder="/images/filename.webp" />
      <label style={labelStyle}>Body (JSON array of {'{h, p}'} sections)</label>
      <textarea style={{ ...inputStyle, minHeight: '200px', fontFamily: 'monospace', fontSize: '0.8rem' }} value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
          Published
        </label>
      </div>
      <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={save} disabled={saving}
          style={{ padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: 'none', background: '#1E3A8A', color: 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel}
          style={{ padding: '0.6rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '0.85rem' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function PostsTab() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await api('/api/posts?all=1');
    setPosts(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!confirm('Delete this post?')) return;
    await api('/api/posts', { method: 'DELETE', body: JSON.stringify({ id }) });
    load();
  };

  if (editing !== null) {
    const post = editing === 'new' ? null : posts.find(p => p.id === editing);
    return <PostEditor post={post} onSave={() => { setEditing(null); load(); }} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Blog Posts</h2>
        <button onClick={() => setEditing('new')}
          style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', border: 'none', background: '#1E3A8A', color: 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
          + New Post
        </button>
      </div>
      {loading ? <p>Loading...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Title</th>
              <th style={{ padding: '0.5rem' }}>Category</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
              <th style={{ padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.5rem' }}>{p.title}</td>
                <td style={{ padding: '0.5rem' }}>{p.category}</td>
                <td style={{ padding: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 600,
                    background: p.published ? '#dcfce7' : '#fef3c7', color: p.published ? '#166534' : '#92400e' }}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td style={{ padding: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditing(p.id)} style={{ padding: '0.3rem 0.8rem', borderRadius: '0.3rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Edit</button>
                  <button onClick={() => del(p.id)} style={{ padding: '0.3rem 0.8rem', borderRadius: '0.3rem', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer', fontSize: '0.75rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function SubmissionsTab({ type, title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await api(`/api/submissions?type=${type}`);
    setItems(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, [type]);

  const markRead = async (id) => {
    await api('/api/submissions', { method: 'PUT', body: JSON.stringify({ id, read: true }) });
    load();
  };
  const del = async (id) => {
    await api('/api/submissions', { method: 'DELETE', body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</h2>
      {loading ? <p>Loading...</p> : items.length === 0 ? <p style={{ color: '#94a3b8' }}>No submissions yet.</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map(s => {
            const d = typeof s.data === 'string' ? JSON.parse(s.data) : s.data;
            return (
              <div key={s.id} style={{ background: 'white', borderRadius: '0.75rem', padding: '1rem 1.25rem', border: s.read ? '1px solid #f1f5f9' : '2px solid #2563EB',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  {type === 'contact' ? (
                    <>
                      <strong>{d.name}</strong> — <span style={{ color: '#64748b' }}>{d.email}</span>
                      {d.phone && <span style={{ color: '#94a3b8', marginLeft: '0.5rem' }}>({d.phone})</span>}
                      {d.concern && <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: '#7c3aed', fontWeight: 600 }}>{d.concern}</div>}
                      {d.message && <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#475569' }}>{d.message}</p>}
                    </>
                  ) : (
                    <span>{d.email}</span>
                  )}
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem' }}>{new Date(s.created_at).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {!s.read && <button onClick={() => markRead(s.id)} style={{ padding: '0.3rem 0.6rem', borderRadius: '0.3rem', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '0.7rem' }}>Mark read</button>}
                  <button onClick={() => del(s.id)} style={{ padding: '0.3rem 0.6rem', borderRadius: '0.3rem', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer', fontSize: '0.7rem' }}>×</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('posts');
  return (
    <div>
      <Nav tab={tab} setTab={setTab} />
      <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1.5rem' }}>
        {tab === 'posts' && <PostsTab />}
        {tab === 'contacts' && <SubmissionsTab type="contact" title="Contact Form Submissions" />}
        {tab === 'newsletter' && <SubmissionsTab type="newsletter" title="Newsletter Subscribers" />}
      </div>
    </div>
  );
}
