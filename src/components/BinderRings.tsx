interface BinderRingsProps {
  isOpen: boolean;
}

export function BinderRings({ isOpen }: BinderRingsProps) {
  const ringPositions = [180, 400, 620];

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[120px]">
      <div
        className="absolute inset-y-[72px] left-[80px] w-[18px] rounded-full"
        style={{
          background: 'linear-gradient(180deg, #8fa0b4 0%, #c9d4df 18%, #708297 42%, #324255 68%, #162233 100%)',
          boxShadow:
            '0 0 0 1px rgba(15,23,42,0.25), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 3px rgba(15,23,42,0.35)',
        }}
      />

      {ringPositions.map((position) => (
        <div
          key={position}
          className="absolute left-[54px]"
          style={{
            top: `${position}px`,
            opacity: isOpen ? 0.96 : 1,
          }}
        >
          <div className="relative h-[72px] w-[52px]">
            <div
              className="absolute left-[0px] top-[22px] h-[18px] w-[18px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 35% 35%, #f8fafc 0%, #c8d3de 30%, #617488 62%, #162233 100%)',
                boxShadow:
                  '0 6px 12px rgba(15,23,42,0.28), inset 0 1px 1px rgba(255,255,255,0.75), inset 0 -1px 2px rgba(15,23,42,0.4)',
              }}
            />

            <div
              className="absolute left-[6px] top-[28px] h-[6px] w-[6px] rounded-full"
              style={{
                background: 'linear-gradient(180deg, #0f172a 0%, #334155 100%)',
              }}
            />

            <div
              className="absolute left-[14px] top-[10px] h-[42px] w-[28px] rounded-r-[20px] border-[4px]"
              style={{
                borderColor: '#dfe7ef',
                borderLeftColor: 'transparent',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(226,232,240,0.1) 50%, rgba(71,85,105,0.06) 100%)',
                boxShadow:
                  '0 5px 10px rgba(15,23,42,0.14), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(71,85,105,0.35)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
