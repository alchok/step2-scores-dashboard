┘
import React, { useMemo, useState, useEffect } from "react";
import type { ScoreDef } from "./score.types";
import { SCORES, TAGS } from "./scores";

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-slate-100/70 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">{children}</span>
);

function LearnView({ def }: { def: ScoreDef }) {
  const L = def.learn;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-1 text-xs uppercase tracking-wide text-slate-500">Purpose</div>
      <div className="mb-3 text-slate-800">{L.purpose}</div>
      {L.formula && <div className="mb-3 rounded-lg bg-slate-50 p-3 font-mono text-sm">{L.formula}</div>}
      <div className="mb-2 text-xs uppercase tracking-wide text-slate-500">Criteria</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500"><th className="py-1 pr-3">Item</th><th className="py-1">Pts</th></tr>
          </thead>
          <tbody>
            {L.criteria.map((c, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="py-1 pr-3 text-slate-800">{c.key}{c.note? <span className="ml-2 text-slate-500">({c.note})</span>: null}</td>
                <td className="py-1 text-slate-800">{c.points ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {L.tiers && (
        <div className="mt-3">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Tiers</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {L.tiers.map((t, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <div className="font-medium text-slate-800">{t.label}</div>
                <div className="text-slate-600 text-sm">{t.range}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {L.actions && (
        <div className="mt-3">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Action cues</div>
          <ul className="list-disc pl-5 text-sm text-slate-800">{L.actions.map((a,i)=><li key={i}>{a}</li>)}</ul>
        </div>
      )}
      {L.caveats && (
        <div className="mt-3">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Exam caveats</div>
          <ul className="list-disc pl-5 text-sm text-slate-700">{L.caveats.map((a,i)=><li key={i}>{a}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

function DrillView({ def }: { def: ScoreDef }) {
  const [c, setC] = useState(def.drill());
  const [show, setShow] = useState(false);
  useEffect(()=>{ setC(def.drill()); setShow(false); }, [def]);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-slate-700 mb-2">Determine the score/decision from this case:</div>
      <ul className="list-disc pl-5 text-sm text-slate-800">{c.stem.map((s,i)=><li key={i}>{s}</li>)}</ul>
      <div className="mt-3 flex gap-2">
        {!show ? (
          <button onClick={()=>setShow(true)} className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Reveal</button>
        ) : (
          <button onClick={()=>{ setC(def.drill()); setShow(false); }} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Next</button>
        )}
        <button onClick={()=>{ setC(def.drill()); setShow(false); }} className="rounded-lg bg-slate-100 px-3 py-2 hover:bg-slate-200">New Case</button>
      </div>
      {show && (
        <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-3">
          <div className="font-medium text-slate-900">{c.truth.text}</div>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">{c.explain.map((e,i)=><li key={i}>{e}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default function Dashboard(){
  const [filter, setFilter] = useState<(typeof TAGS)[number] | 'All'>('All');
  const bank = useMemo(()=> filter==='All' ? SCORES : SCORES.filter(s => s.tags.includes(filter)), [filter]);
  const [active, setActive] = useState<ScoreDef>(bank[0] ?? SCORES[0]);
  const [tab, setTab] = useState<'learn'|'drill'>('learn');
  useEffect(()=>{ if(!bank.includes(active)) setActive(bank[0] ?? SCORES[0]); }, [filter]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-900 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Step 2 CK — Scores Dashboard</h1>
            <p className="text-slate-600">Config‑driven. Add files → register → done.</p>
          </div>
          <div className="hidden md:flex gap-2"><Pill>Learn</Pill><Pill>Drill</Pill></div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {(['All', ...TAGS] as const).map(t => (
            <button key={t as string} onClick={()=>setFilter(t as any)} className={`text-xs px-3 py-1 rounded-full border ${filter===t? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>{t}</button>
          ))}
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto">
          {bank.map(s => (
            <button key={s.id} onClick={()=>setActive(s)} className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm border ${active.id===s.id? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>{s.name}</button>
          ))}
        </div>

        <div className="mb-4 flex gap-2">
          <button onClick={()=>setTab('learn')} className={`rounded-xl px-4 py-2 text-sm border ${tab==='learn'?'bg-indigo-600 text-white border-indigo-600':'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>Learn</button>
          <button onClick={()=>setTab('drill')} className={`rounded-xl px-4 py-2 text-sm border ${tab==='drill'?'bg-indigo-600 text-white border-indigo-600':'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>Drill</button>
        </div>

        {tab==='learn' ? <LearnView def={active}/> : <DrillView def={active}/>}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-600">How to add a new score</div>
          <ol className="mt-1 list-decimal pl-5 text-sm text-slate-800">
            <li>Create <code>src/scores/my_score.ts</code> using <code>_template.ts</code>.</li>
            <li>Export <code>default</code> as a <code>ScoreDef</code> with <b>learn</b> & <b>drill</b>.</li>
            <li>Register it in <code>src/scores/index.ts</code> by importing and adding to <code>SCORES</code>.</li>
          </ol>
          <div className="mt-2 text-sm text-slate-600">Optional: switch to auto‑discovery with <code>import.meta.glob</code> (Vite).</div>
        </div>
      </div>
    </div>
  );
}