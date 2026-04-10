import { BinderScene } from './components/BinderScene';
import { mockBinderData } from './data/mockBinderData';

export default function App() {
  return (
    <div className="relative size-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.12) 0%, transparent 46%),
                             radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.12) 0%, transparent 44%)`,
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 h-full w-full">
        <BinderScene data={mockBinderData} />
      </div>
    </div>
  );
}
