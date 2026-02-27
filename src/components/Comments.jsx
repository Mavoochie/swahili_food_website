import React, { useEffect, useState } from 'react';
import { getComments, createComment, deleteComment } from '../api/api';

function Comments({ dishId }) {
  const [comments, setComments] = useState([]);
  const [text, setText]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const token    = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    getComments(dishId)
      .then(res => setComments(res.data))
      .catch(() => setError('Failed to load comments.'));
  }, [dishId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await createComment({ dish: dishId, text });
      setComments([res.data, ...comments]);
      setText('');
    } catch {
      setError('Failed to post. Make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      setComments(comments.filter(c => c.id !== id));
    } catch {
      setError('Failed to delete comment.');
    }
  };

  return (
    <div className="comments-section">

      {/* Header */}
      <div className="comments-header">
        <span className="comments-title">💬 Comments</span>
        <span className="comments-count">{comments.length}</span>
      </div>

      {/* Post form */}
      {token ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Share your thoughts…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={300}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '…' : 'Post'}
          </button>
        </form>
      ) : (
        <p className="comment-login-note">
          <a href="/login">Sign in</a> to leave a comment.
        </p>
      )}

      {error && <p className="msg-error">{error}</p>}

      {/* Comment list — flex wrap */}
      <ul className="comment-list">
        {comments.length === 0 && (
          <li className="comment-empty">No comments yet. Be the first!</li>
        )}
        {comments.map(c => (
          <li key={c.id} className="comment-item">
            <div className="comment-meta">
              <span className="comment-author">{c.username}</span>
              <span className="comment-date">
                {new Date(c.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-text">{c.text}</p>
            {username === c.username && (
              <button
                className="btn-danger comment-delete"
                onClick={() => handleDelete(c.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;