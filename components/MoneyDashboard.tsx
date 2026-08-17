'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_COSTS,
  JOB_STATUSES,
  LEAD_SOURCES,
  adAttributedJobs,
  cashPosition,
  jobsToCsv,
  money,
  monthKey,
  monthlyFromWeekly,
  monthlyRecurring,
  percent,
  summariseJobs,
  unitEconomics,
  type Contract,
  type Costs,
  type Job,
  type JobStatus,
  type LeadSource,
} from '@/lib/money'
import { SERVICES, SQFT_OPTIONS, getPrice } from '@/lib/pricing'

const STORAGE_KEY = 'raprocleaning.money.v1'

type Stored = {
  jobs: Job[]
  contracts: Contract[]
  costs: Costs
  cashOnHand: number
}

const EMPTY: Stored = {
  jobs: [],
  contracts: [],
  costs: DEFAULT_COSTS,
  cashOnHand: 0,
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Browser storage is the only store available — the site has no database and
 * adding one would mean a bill this business cannot currently absorb. The
 * trade-off is real and stated plainly in the UI: data lives on this device,
 * so the CSV export is the backup.
 */
function load(): Stored {
  if (typeof window === 'undefined') return EMPTY
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Stored>
    return {
      jobs: parsed.jobs ?? [],
      contracts: parsed.contracts ?? [],
      costs: { ...DEFAULT_COSTS, ...(parsed.costs ?? {}) },
      cashOnHand: parsed.cashOnHand ?? 0,
    }
  } catch {
    return EMPTY
  }
}

// ─── SMALL PRESENTATIONAL PIECES ─────────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-5">{title}</h2>
      {children}
    </section>
  )
}

function Stat({
  label,
  value,
  tone = 'neutral',
  hint,
}: {
  label: string
  value: string
  tone?: 'neutral' | 'good' | 'bad'
  hint?: string
}) {
  const toneClass =
    tone === 'good' ? 'text-[#00A896]' : tone === 'bad' ? 'text-red-600' : 'text-[#0F2240]'
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-black tabular-nums ${toneClass}`}>{value}</p>
      {hint && <p className="text-xs text-slate-500 mt-1 leading-snug">{hint}</p>}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  step = '1',
  prefix,
  suffix,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  step?: string
  prefix?: string
  suffix?: string
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
        {label}
      </span>
      <span className="flex items-center border border-slate-300 rounded focus-within:border-[#00A896] transition-colors">
        {prefix && <span className="pl-3 text-slate-400 text-sm">{prefix}</span>}
        <input
          type="number"
          step={step}
          min="0"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 text-sm tabular-nums outline-none rounded"
        />
        {suffix && <span className="pr-3 text-slate-400 text-sm whitespace-nowrap">{suffix}</span>}
      </span>
    </label>
  )
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

export default function MoneyDashboard() {
  const [state, setState] = useState<Stored>(EMPTY)
  const [ready, setReady] = useState(false)

  // Storage is read after mount so server and first client render agree.
  useEffect(() => {
    setState(load())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, ready])

  const { jobs, contracts, costs, cashOnHand } = state

  const setCosts = (patch: Partial<Costs>) =>
    setState((s) => ({ ...s, costs: { ...s.costs, ...patch } }))

  // ── Derived numbers ────────────────────────────────────────────────────────
  const thisMonth = monthKey(today())
  const monthJobs = useMemo(() => jobs.filter((j) => monthKey(j.date) === thisMonth), [jobs, thisMonth])

  const allTime = useMemo(() => summariseJobs(jobs), [jobs])
  const month = useMemo(() => summariseJobs(monthJobs), [monthJobs])
  const adOnly = useMemo(() => summariseJobs(adAttributedJobs(jobs)), [jobs])

  const recurring = useMemo(() => monthlyRecurring(contracts), [contracts])

  // The close rate and job value the ledger actually observed beat any guess,
  // but before there is data we fall back to the site's own pricing so the
  // model still says something useful on day one.
  const observedCloseRate = allTime.closeRate
  const observedJobValue = allTime.avgWonValue || 350

  const econ = useMemo(
    () =>
      unitEconomics({
        weeklyAdBudget: costs.weeklyAdBudget,
        leadsPerWeek: costs.leadsPerWeek,
        closeRate: observedCloseRate,
        avgJobValue: observedJobValue,
        jobMargin: costs.jobMargin,
        otherMonthlyCosts: costs.otherMonthlyCosts,
      }),
    [costs, observedCloseRate, observedJobValue],
  )

  const cash = useMemo(
    () =>
      cashPosition({
        cashOnHand,
        paidRevenue: month.paid,
        recurringRevenue: recurring,
        monthlyAdSpend: monthlyFromWeekly(costs.weeklyAdBudget),
        otherMonthlyCosts: costs.otherMonthlyCosts,
        taxRate: costs.taxRate,
      }),
    [cashOnHand, month.paid, recurring, costs],
  )

  const adsPaying = econ.roas >= 1 && observedCloseRate > 0
  const beatingBreakEven = observedCloseRate >= econ.breakEvenCloseRate

  // ── Job entry form ─────────────────────────────────────────────────────────
  const [draft, setDraft] = useState({
    date: today(),
    client: '',
    service: SERVICES[0] as string,
    sqft: SQFT_OPTIONS[0].value,
    source: LEAD_SOURCES[0] as LeadSource,
    status: 'quoted' as JobStatus,
    amount: 0,
  })

  // Auto-fill the price from the site's own tables, so the ledger and the
  // quote a customer was given can never drift apart.
  const suggested = getPrice(draft.service, draft.sqft)
  useEffect(() => {
    const price = getPrice(draft.service, draft.sqft)
    if (price !== null) setDraft((d) => ({ ...d, amount: price }))
  }, [draft.service, draft.sqft])

  function addJob() {
    if (!draft.client.trim()) return
    setState((s) => ({ ...s, jobs: [{ id: newId(), ...draft, notes: '' }, ...s.jobs] }))
    setDraft((d) => ({ ...d, client: '' }))
  }

  function setJobStatus(id: string, status: JobStatus) {
    setState((s) => ({ ...s, jobs: s.jobs.map((j) => (j.id === id ? { ...j, status } : j)) }))
  }

  function removeJob(id: string) {
    setState((s) => ({ ...s, jobs: s.jobs.filter((j) => j.id !== id) }))
  }

  // ── Contract entry ─────────────────────────────────────────────────────────
  const [contractDraft, setContractDraft] = useState({ client: '', monthlyAmount: 0 })

  function addContract() {
    if (!contractDraft.client.trim()) return
    setState((s) => ({
      ...s,
      contracts: [
        { id: newId(), ...contractDraft, startedOn: today(), active: true },
        ...s.contracts,
      ],
    }))
    setContractDraft({ client: '', monthlyAmount: 0 })
  }

  function toggleContract(id: string) {
    setState((s) => ({
      ...s,
      contracts: s.contracts.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    }))
  }

  function exportCsv() {
    const blob = new Blob([jobsToCsv(jobs)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ra-pro-jobs-${today()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!ready) {
    return <p className="text-slate-400 text-sm">Loading your numbers…</p>
  }

  return (
    <div className="space-y-6">
      {/* ── Verdict ──────────────────────────────────────────────────────── */}
      <div
        className={`rounded-lg p-6 border-l-4 ${
          observedCloseRate === 0
            ? 'bg-slate-50 border-slate-300'
            : beatingBreakEven
              ? 'bg-teal-50 border-[#00A896]'
              : 'bg-red-50 border-red-500'
        }`}
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-2">
          Are the ads paying for themselves?
        </p>
        {observedCloseRate === 0 ? (
          <p className="text-slate-600 leading-relaxed">
            Not enough data yet. Log the jobs you quote and mark them won, paid or lost — once a few
            have closed, this box will tell you whether Local Services Ads earns back what it costs.
          </p>
        ) : (
          <>
            <p className="text-3xl font-black text-[#0F2240] mb-2">
              {beatingBreakEven ? 'Yes — for now' : 'No — the ads are losing money'}
            </p>
            <p className="text-slate-600 leading-relaxed">
              You close <strong>{percent(observedCloseRate)}</strong> of decided jobs. You need{' '}
              <strong>{percent(econ.breakEvenCloseRate)}</strong> just to break even at{' '}
              {money(costs.weeklyAdBudget)}/week with a {money(observedJobValue)} average job and a{' '}
              {percent(costs.jobMargin)} margin.
              {!beatingBreakEven &&
                ' Cut the budget, raise the close rate, or both — every lead is currently costing more than it returns.'}
            </p>
          </>
        )}
      </div>

      {/* ── Headline numbers ─────────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="This month">
          <Stat label="Collected" value={money(month.paid)} tone="good" />
        </Card>
        <Card title="Owed to you">
          <Stat
            label="Won, not yet paid"
            value={money(month.outstanding)}
            tone={month.outstanding > 0 ? 'neutral' : 'neutral'}
            hint={month.outstanding > 0 ? 'Chase these before spending another dollar on ads.' : undefined}
          />
        </Card>
        <Card title="Ad spend">
          <Stat
            label="Per month"
            value={money(econ.monthlyAdSpend)}
            tone="bad"
            hint={`${money(econ.costPerLead)} per lead`}
          />
        </Card>
        <Card title="Net">
          <Stat
            label="Income − outgoings"
            value={money(cash.monthlyNet)}
            tone={cash.monthlyNet >= 0 ? 'good' : 'bad'}
            hint={
              cash.monthlyNet < 0 && isFinite(cash.runwayMonths)
                ? `${cash.runwayMonths.toFixed(1)} months of cash left at this burn`
                : cash.taxReserve > 0
                  ? `Set aside ${money(cash.taxReserve)} for tax`
                  : undefined
            }
          />
        </Card>
      </div>

      {/* ── Inputs ───────────────────────────────────────────────────────── */}
      <Card title="Your numbers">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Field
            label="Cash in the bank"
            prefix="$"
            value={cashOnHand}
            onChange={(n) => setState((s) => ({ ...s, cashOnHand: n }))}
          />
          <Field
            label="Ad budget per week"
            prefix="$"
            value={costs.weeklyAdBudget}
            onChange={(n) => setCosts({ weeklyAdBudget: n })}
          />
          <Field
            label="Leads per week"
            value={costs.leadsPerWeek}
            onChange={(n) => setCosts({ leadsPerWeek: n })}
          />
          <Field
            label="Other costs per month"
            prefix="$"
            value={costs.otherMonthlyCosts}
            onChange={(n) => setCosts({ otherMonthlyCosts: n })}
          />
          <Field
            label="Margin left after labour"
            suffix="%"
            step="1"
            value={Math.round(costs.jobMargin * 100)}
            onChange={(n) => setCosts({ jobMargin: n / 100 })}
          />
          <Field
            label="Tax set-aside"
            suffix="%"
            step="1"
            value={Math.round(costs.taxRate * 100)}
            onChange={(n) => setCosts({ taxRate: n / 100 })}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-6 border-t border-slate-200">
          <Stat label="Cost per lead" value={money(econ.costPerLead)} />
          <Stat
            label="Cost per won job"
            value={observedCloseRate > 0 ? money(econ.costPerJob) : '—'}
            tone={econ.costPerJob > observedJobValue * costs.jobMargin ? 'bad' : 'good'}
          />
          <Stat label="Break-even close rate" value={percent(econ.breakEvenCloseRate)} />
          <Stat
            label="Return on ad spend"
            value={observedCloseRate > 0 ? `${econ.roas.toFixed(2)}×` : '—'}
            tone={adsPaying ? 'good' : 'bad'}
          />
        </div>
      </Card>

      {/* ── Job ledger ───────────────────────────────────────────────────── */}
      <Card title="Job ledger">
        <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end mb-6">
          <label className="block lg:col-span-1">
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
              Date
            </span>
            <input
              type="date"
              value={draft.date}
              onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded outline-none focus:border-[#00A896]"
            />
          </label>
          <label className="block lg:col-span-1">
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
              Client
            </span>
            <input
              type="text"
              value={draft.client}
              placeholder="Name"
              onChange={(e) => setDraft((d) => ({ ...d, client: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded outline-none focus:border-[#00A896]"
            />
          </label>
          <label className="block lg:col-span-1">
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
              Service
            </span>
            <select
              value={draft.service}
              onChange={(e) => setDraft((d) => ({ ...d, service: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded outline-none focus:border-[#00A896] bg-white"
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="block lg:col-span-1">
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
              Size
            </span>
            <select
              value={draft.sqft}
              onChange={(e) => setDraft((d) => ({ ...d, sqft: parseInt(e.target.value, 10) }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded outline-none focus:border-[#00A896] bg-white"
            >
              {SQFT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block lg:col-span-1">
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
              Source
            </span>
            <select
              value={draft.source}
              onChange={(e) => setDraft((d) => ({ ...d, source: e.target.value as LeadSource }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded outline-none focus:border-[#00A896] bg-white"
            >
              {LEAD_SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Price"
            prefix="$"
            value={draft.amount}
            onChange={(n) => setDraft((d) => ({ ...d, amount: n }))}
          />
          <button
            onClick={addJob}
            className="bg-[#0F2240] text-white text-sm font-bold px-4 py-2.5 rounded hover:bg-[#00A896] transition-colors"
          >
            Add job
          </button>
        </div>

        {suggested !== null && (
          <p className="text-xs text-slate-500 -mt-3 mb-5">
            Site price for this service and size: <strong>{money(suggested)}</strong>. Override it
            above if you quoted something different.
          </p>
        )}

        {jobs.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">
            No jobs logged yet. Add every lead you quote — including the ones that say no. The lost
            ones are what reveal your true close rate.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <th className="py-2 pr-4 font-semibold">Date</th>
                  <th className="py-2 pr-4 font-semibold">Client</th>
                  <th className="py-2 pr-4 font-semibold">Service</th>
                  <th className="py-2 pr-4 font-semibold">Source</th>
                  <th className="py-2 pr-4 font-semibold text-right">Amount</th>
                  <th className="py-2 pr-4 font-semibold">Status</th>
                  <th className="py-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-slate-100">
                    <td className="py-2.5 pr-4 tabular-nums text-slate-500">{job.date}</td>
                    <td className="py-2.5 pr-4 font-medium text-[#0F2240]">{job.client}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{job.service}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{job.source}</td>
                    <td className="py-2.5 pr-4 text-right tabular-nums font-semibold">
                      {money(job.amount)}
                    </td>
                    <td className="py-2.5 pr-4">
                      <select
                        value={job.status}
                        onChange={(e) => setJobStatus(job.id, e.target.value as JobStatus)}
                        className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
                      >
                        {JOB_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => removeJob(job.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors px-1"
                        aria-label={`Delete job for ${job.client}`}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {jobs.length > 0 && (
          <div className="flex flex-wrap gap-6 items-center justify-between mt-6 pt-5 border-t border-slate-200">
            <div className="flex flex-wrap gap-8">
              <Stat label="All-time close rate" value={percent(allTime.closeRate)} />
              <Stat label="Average won job" value={money(allTime.avgWonValue)} />
              <Stat
                label="From ads"
                value={`${adOnly.wonCount} won`}
                hint={`${money(adOnly.paid)} collected`}
              />
            </div>
            <button
              onClick={exportCsv}
              className="text-sm font-semibold text-[#00A896] hover:underline"
            >
              Export CSV ↓
            </button>
          </div>
        )}
      </Card>

      {/* ── Recurring contracts ──────────────────────────────────────────── */}
      <Card title="Recurring contracts">
        <p className="text-sm text-slate-500 mb-5 leading-relaxed">
          Monthly retainers cost nothing to re-acquire, which makes them the most valuable revenue
          you have. The Collective Moxie payment belongs here.
        </p>

        <div className="flex flex-wrap gap-3 items-end mb-6">
          <label className="block flex-1 min-w-[180px]">
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
              Client
            </span>
            <input
              type="text"
              value={contractDraft.client}
              placeholder="Collective Moxie Enterprises"
              onChange={(e) => setContractDraft((c) => ({ ...c, client: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded outline-none focus:border-[#00A896]"
            />
          </label>
          <div className="w-40">
            <Field
              label="Per month"
              prefix="$"
              value={contractDraft.monthlyAmount}
              onChange={(n) => setContractDraft((c) => ({ ...c, monthlyAmount: n }))}
            />
          </div>
          <button
            onClick={addContract}
            className="bg-[#0F2240] text-white text-sm font-bold px-4 py-2.5 rounded hover:bg-[#00A896] transition-colors"
          >
            Add contract
          </button>
        </div>

        {contracts.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {contracts.map((c) => (
              <li key={c.id} className="flex items-center justify-between py-2.5">
                <span className={c.active ? 'font-medium text-[#0F2240]' : 'text-slate-400 line-through'}>
                  {c.client}
                </span>
                <span className="flex items-center gap-4">
                  <span className="tabular-nums font-semibold">{money(c.monthlyAmount)}/mo</span>
                  <button
                    onClick={() => toggleContract(c.id)}
                    className="text-xs text-slate-400 hover:text-[#00A896]"
                  >
                    {c.active ? 'Pause' : 'Resume'}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 pt-5 border-t border-slate-200">
          <Stat
            label="Recurring income"
            value={`${money(recurring)}/mo`}
            tone={recurring > 0 ? 'good' : 'neutral'}
            hint={
              recurring < econ.monthlyAdSpend
                ? `Ads cost ${money(econ.monthlyAdSpend - recurring)}/mo more than your retainers bring in.`
                : 'Retainers alone now cover the ad budget.'
            }
          />
        </div>
      </Card>

      <p className="text-xs text-slate-400 leading-relaxed">
        Saved in this browser only — not on a server, not synced between devices, and cleared if you
        wipe site data. Export the CSV regularly and keep it with your bookkeeping.
      </p>
    </div>
  )
}
