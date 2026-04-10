import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageSquare, Send, User, X } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: string;
  resolved: boolean;
}

interface CommentPanelProps {
  color: string;
}

export function CommentPanel({ color }: CommentPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const mockComments: Comment[] = [
    {
      id: '1',
      author: 'Sarah Mitchell',
      role: 'Lead Inspector',
      text: 'Please verify the latest avionics upgrade is reflected in this section.',
      timestamp: '2 hours ago',
      resolved: false,
    },
    {
      id: '2',
      author: 'James Chen',
      role: 'Maintenance Chief',
      text: 'Weight and balance calculations have been updated per the recent modification.',
      timestamp: '1 day ago',
      resolved: true,
    },
    {
      id: '3',
      author: 'Emily Rodriguez',
      role: 'Compliance Officer',
      text: 'Need clarification on the emergency equipment expiration dates.',
      timestamp: '3 days ago',
      resolved: false,
    },
  ];

  const unreadCount = mockComments.filter((comment) => !comment.resolved).length;

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="size-5 text-slate-600" />
        {unreadCount > 0 ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-lg"
            style={{ backgroundColor: color }}
          >
            {unreadCount}
          </motion.div>
        ) : null}
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex w-96 flex-col bg-white shadow-2xl"
            >
              <div className="border-b border-slate-200 p-4" style={{ backgroundColor: `${color}05` }}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-5" style={{ color }} />
                    <h3 className="font-bold text-slate-800">Comments & Questions</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded p-1 transition-colors hover:bg-slate-200"
                  >
                    <X className="size-5 text-slate-600" />
                  </button>
                </div>
                <div className="text-xs text-slate-600">
                  {unreadCount} unresolved {unreadCount === 1 ? 'question' : 'questions'}
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {mockComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-lg border p-4 ${
                      comment.resolved
                        ? 'border-slate-200 bg-slate-50'
                        : 'border-slate-300 bg-white shadow-sm'
                    }`}
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className="flex size-8 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <User className="size-4" style={{ color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-slate-800">{comment.author}</div>
                        <div className="text-xs text-slate-500">{comment.role}</div>
                      </div>
                      {comment.resolved ? (
                        <div className="rounded bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                          Resolved
                        </div>
                      ) : null}
                    </div>

                    <p className="mb-2 text-sm text-slate-700">{comment.text}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{comment.timestamp}</span>
                      {!comment.resolved ? (
                        <button className="text-xs font-medium hover:underline" style={{ color }}>
                          Mark as resolved
                        </button>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-slate-200 bg-slate-50 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment or question..."
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-lg px-4 py-2 font-medium text-white shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    <Send className="size-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
