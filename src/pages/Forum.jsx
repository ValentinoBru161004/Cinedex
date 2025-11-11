import { useEffect, useState } from "react";

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

const sample = [
  {
    id: 1,
    title: "Bienvenido al foro",
    content: "Comparte tus opiniones y recomienda películas aquí.",
    tag: "general",
    author: "Admin",
    avatar: "https://i.pravatar.cc/40?u=admin",
    replies: [],
    views: 34,
    date: new Date().toISOString(),
  },
];

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("general");
  const [author, setAuthor] = useState(() => localStorage.getItem("username") || "Anon");

  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("forumThreads");
    if (raw) setThreads(JSON.parse(raw));
    else {
      setThreads(sample);
      localStorage.setItem("forumThreads", JSON.stringify(sample));
    }
  }, []);

  function createThread(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Completa el título y el contenido antes de publicar.");
      return;
    }
    const t = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      tag,
      author: author || "Anon",
      avatar: `https://i.pravatar.cc/40?u=${Math.floor(Math.random() * 1000)}`,
      replies: [],
      views: 0,
      date: new Date().toISOString(),
    };
    const next = [t, ...threads];
    setThreads(next);
    localStorage.setItem("forumThreads", JSON.stringify(next));
    setTitle("");
    setContent("");
    setError("");
  }

  function openThread(id) {
    const next = threads.map((t) => {
      if (t.id === id) return { ...t, views: (t.views || 0) + 1 };
      return t;
    });
    setThreads(next);
    localStorage.setItem("forumThreads", JSON.stringify(next));
    const thread = next.find((t) => t.id === id);
    setSelected(thread);
    setReplyText("");
  }

  function closeThread() {
    setSelected(null);
    setReplyText("");
  }

  function postReply(e) {
    e.preventDefault();
    if (!replyText.trim() || !selected) return;
    const reply = {
      id: Date.now(),
      author: author || "Anon",
      text: replyText.trim(),
      date: new Date().toISOString(),
    };
    const next = threads.map((t) => {
      if (t.id === selected.id) {
        const replies = Array.isArray(t.replies) ? [...t.replies, reply] : [reply];
        return { ...t, replies, views: t.views || 0 };
      }
      return t;
    });
    setThreads(next);
    localStorage.setItem("forumThreads", JSON.stringify(next));
    setSelected(next.find((t) => t.id === selected.id));
    setReplyText("");
  }

  return (
    <div className="text-center p-10">
      <h2 className="text-4xl text-gray-200 p-2 font-bold mb-10">FORO</h2>

      <form onSubmit={createThread} className="bg-[#0f1724] p-4 rounded mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <input value={author} onChange={(e) => { setAuthor(e.target.value); localStorage.setItem('username', e.target.value); }} placeholder="Tu nombre" className="bg-[#0b1220] p-2 rounded text-sm col-span-1" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título del tema" className="bg-[#0b1220] p-2 rounded text-sm col-span-2 md:col-span-2" />
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={3} className="w-full bg-[#0b1220] p-2 rounded text-sm mb-2" placeholder="Escribe tu opinión o inicia un debate..." />
        <div className="flex items-center gap-2 justify-between">
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="bg-[#0b1220] p-2 rounded text-sm">
            <option value="general">General</option>
            <option value="anime">Peliculas</option>
            <option value="review">Director</option>
            <option value="discussion">Saga</option>
          </select>
          <div className="flex items-center gap-2">
            {error ? <div className="text-xs text-red-400 mr-2">{error}</div> : null}
            <button
              type="submit"
              className={`px-4 py-1 bg-[#89023E] rounded text-sm disabled:opacity-50`}
              disabled={!title.trim() || !content.trim()}
              title={!title.trim() || !content.trim() ? "Completa título y contenido" : "Publicar"}
            >
              Publicar
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {threads.map((t) => (
          <div
            key={t.id}
            onClick={() => openThread(t.id)}
            className="bg-[#0b1724] rounded p-4 flex items-start gap-4 cursor-pointer hover:shadow-lg"
          >
            <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{t.title}</h3>
                  <p className="text-gray-300 text-sm mt-1 line-clamp-2">{t.content}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-400">{t.views || 0} <span className="ml-1">👁</span></span>
                  <span className="text-xs text-gray-400">{Array.isArray(t.replies) ? t.replies.length : t.replies} <span className="ml-1">💬</span></span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>{t.author}</span>
                  <span>·</span>
                  <span>{timeAgo(t.date)} ago</span>
                </div>
                <div>
                  <span className="text-xs bg-[#89023E] text-white px-3 py-1 rounded-full">{t.tag}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Thread detail */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#071226] max-w-2xl w-full rounded-lg p-6 text-left">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-bold">{selected.title}</h3>
                <p className="text-sm text-gray-400">por {selected.author} · {timeAgo(selected.date)} ago</p>
              </div>
              <div className="text-right">
                <button onClick={closeThread} className="text-gray-300">Cerrar</button>
              </div>
            </div>

            <div className="mt-4 text-gray-200">{selected.content}</div>

            <div className="mt-6">
              <h4 className="font-semibold text-white">Respuestas</h4>
              <div className="space-y-3 mt-3 max-h-56 overflow-auto">
                {(Array.isArray(selected.replies) ? selected.replies : []).map((r) => (
                  <div key={r.id} className="bg-[#0b1724] p-3 rounded">
                    <div className="text-sm text-gray-300">{r.text}</div>
                    <div className="text-xs text-gray-400 mt-2">{r.author} · {timeAgo(r.date)} ago</div>
                  </div>
                ))}
              </div>

              <form onSubmit={postReply} className="mt-4 flex gap-2">
                <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Escribe tu respuesta..." className="flex-1 bg-[#0b1220] p-2 rounded" />
                <button className="px-3 py-1 bg-[#89023E] rounded">Responder</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
