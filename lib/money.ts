/**
 * Money flow: what comes in, what goes out, and whether the ads pay for
 * themselves.
 *
 * The website quotes jobs but never records what happened next, so there has
 * never been a number connecting ad spend to revenue. Everything here is pure
 * arithmetic over plain values — the dashboard owns storage, this file owns
 * the maths so it can be reasoned about (and corrected) in one place.
 *
 * Dollar amounts are plain numbers, never cents, matching lib/pricing.ts.
 */

// ─── LEDGER TYPES ────────────────────────────────────────────────────────────

/**
 * Where a job came from. Tracking this is the whole point — a job's value
 * means nothing until you know what was paid to acquire it.
 */
export const LEAD_SOURCES = [
  'Local Services Ads',
  'Website',
  'Referral',
  'Repeat Client',
  'Other',
] as const

export type LeadSource = (typeof LEAD_SOURCES)[number]

/**
 * `quoted` is money hoped for, `won` is money promised, `paid` is money that
 * actually landed in the bank. Only `paid` counts as revenue — a won job that
 * never pays is a bad debt, not income.
 */
export const JOB_STATUSES = ['quoted', 'won', 'paid', 'lost'] as const

export type JobStatus = (typeof JOB_STATUSES)[number]

export type Job = {
  id: string
  /** ISO date, yyyy-mm-dd. */
  date: string
  client: string
  service: string
  /** Null for jobs quoted by walkthrough rather than square footage. */
  sqft: number | null
  source: LeadSource
  status: JobStatus
  amount: number
  /**
   * ISO date the money actually arrived, when that differs from the job date.
   * A job quoted in August and paid in September is September's cash — bucket
   * it by the job date and both months read wrong.
   */
  paidOn?: string
  notes?: string
}

/**
 * Recurring monthly income, like the Collective Moxie retainer. Kept separate
 * from jobs because it costs nothing to acquire each month — counting it as an
 * ad-driven job would flatter the ad numbers.
 */
export type Contract = {
  id: string
  client: string
  /** Dollars per month. */
  monthlyAmount: number
  startedOn: string
  active: boolean
}

/** The levers that decide whether the ads are worth running. */
export type Costs = {
  weeklyAdBudget: number
  leadsPerWeek: number
  /** Software, supplies, insurance, fuel — everything that is not ad spend. */
  otherMonthlyCosts: number
  /** Share of a job's price left after labour and supplies, 0–1. */
  jobMargin: number
  /** Share of net profit to set aside for tax, 0–1. */
  taxRate: number
}

export const DEFAULT_COSTS: Costs = {
  weeklyAdBudget: 400,
  leadsPerWeek: 15,
  otherMonthlyCosts: 0,
  jobMargin: 0.5,
  taxRate: 0.3,
}

// ─── PERIOD CONVERSION ───────────────────────────────────────────────────────

/**
 * Weeks per month, averaged over a year. Using 4 here would understate monthly
 * ad spend by roughly 8% — about $140/month at a $400 weekly budget, which is
 * exactly the kind of gap that makes a budget look survivable when it isn't.
 */
export const WEEKS_PER_MONTH = 52 / 12

export function monthlyFromWeekly(weekly: number): number {
  return weekly * WEEKS_PER_MONTH
}

// ─── UNIT ECONOMICS ──────────────────────────────────────────────────────────

export type UnitEconomics = {
  costPerLead: number
  /** Acquisition cost per *won* job, i.e. cost per lead ÷ close rate. */
  costPerJob: number
  /** What a won job contributes after labour and supplies. */
  marginPerJob: number
  /** Profit left from one lead once acquisition cost is paid. */
  profitPerLead: number
  /**
   * The close rate at which ads exactly break even. Below this, every lead
   * loses money no matter how many arrive.
   */
  breakEvenCloseRate: number
  monthlyLeads: number
  monthlyJobs: number
  monthlyAdSpend: number
  monthlyRevenue: number
  /** Revenue ÷ ad spend. Above 1 means the ads return more than they cost. */
  roas: number
  /** After ad spend, other costs and the cost of delivering the work. */
  monthlyProfit: number
}

/**
 * Model the ad channel at a given close rate.
 *
 * `closeRate` and `jobMargin` are fractions (0.2 = 20%). Guards return zeroed
 * fields rather than Infinity/NaN so the dashboard can render a blank state
 * before any numbers are entered.
 */
export function unitEconomics(opts: {
  weeklyAdBudget: number
  leadsPerWeek: number
  closeRate: number
  avgJobValue: number
  jobMargin: number
  otherMonthlyCosts: number
}): UnitEconomics {
  const monthlyAdSpend = monthlyFromWeekly(opts.weeklyAdBudget)
  const monthlyLeads = monthlyFromWeekly(opts.leadsPerWeek)
  const monthlyJobs = monthlyLeads * opts.closeRate
  const monthlyRevenue = monthlyJobs * opts.avgJobValue

  const costPerLead = opts.leadsPerWeek > 0 ? opts.weeklyAdBudget / opts.leadsPerWeek : 0
  const costPerJob = opts.closeRate > 0 ? costPerLead / opts.closeRate : 0
  const marginPerJob = opts.avgJobValue * opts.jobMargin
  const profitPerLead = marginPerJob * opts.closeRate - costPerLead

  const breakEvenCloseRate = marginPerJob > 0 ? costPerLead / marginPerJob : 0

  return {
    costPerLead,
    costPerJob,
    marginPerJob,
    profitPerLead,
    breakEvenCloseRate,
    monthlyLeads,
    monthlyJobs,
    monthlyAdSpend,
    monthlyRevenue,
    roas: monthlyAdSpend > 0 ? monthlyRevenue / monthlyAdSpend : 0,
    monthlyProfit: monthlyJobs * marginPerJob - monthlyAdSpend - opts.otherMonthlyCosts,
  }
}

// ─── LEDGER SUMMARIES ────────────────────────────────────────────────────────

/** Month bucket for a ledger date, e.g. "2026-08". */
export function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7)
}

/**
 * The date a job's money moves: when it was collected if that is recorded,
 * otherwise the job date. Only `paid` jobs have a collection date to speak of.
 */
export function cashDate(job: Job): string {
  return job.paidOn ?? job.date
}

/** Cash actually collected in a month, counted on the day it arrived. */
export function collectedInMonth(jobs: Job[], month: string): number {
  return jobs
    .filter((j) => j.status === 'paid' && monthKey(cashDate(j)) === month)
    .reduce((sum, j) => sum + j.amount, 0)
}

export type LedgerTotals = {
  /** Jobs marked `paid` — money actually received. */
  paid: number
  /** Jobs marked `won` but not yet paid — money owed to you. */
  outstanding: number
  /** Jobs still `quoted` — the live pipeline. */
  pipeline: number
  lostValue: number
  jobCount: number
  wonCount: number
  lostCount: number
  /** Won or paid, over every job that reached a decision. */
  closeRate: number
  /** Average value of a job that closed. */
  avgWonValue: number
}

export function summariseJobs(jobs: Job[]): LedgerTotals {
  const totals = jobs.reduce(
    (acc, job) => {
      if (job.status === 'paid') acc.paid += job.amount
      if (job.status === 'won') acc.outstanding += job.amount
      if (job.status === 'quoted') acc.pipeline += job.amount
      if (job.status === 'lost') {
        acc.lostValue += job.amount
        acc.lostCount += 1
      }
      if (job.status === 'won' || job.status === 'paid') {
        acc.wonCount += 1
        acc.wonValue += job.amount
      }
      return acc
    },
    { paid: 0, outstanding: 0, pipeline: 0, lostValue: 0, wonCount: 0, lostCount: 0, wonValue: 0 },
  )

  // Quoted jobs are still undecided, so they belong in neither half of the
  // close rate — counting them as losses would punish a healthy pipeline.
  const decided = totals.wonCount + totals.lostCount

  return {
    paid: totals.paid,
    outstanding: totals.outstanding,
    pipeline: totals.pipeline,
    lostValue: totals.lostValue,
    jobCount: jobs.length,
    wonCount: totals.wonCount,
    lostCount: totals.lostCount,
    closeRate: decided > 0 ? totals.wonCount / decided : 0,
    avgWonValue: totals.wonCount > 0 ? totals.wonValue / totals.wonCount : 0,
  }
}

/** Total monthly income from active recurring contracts. */
export function monthlyRecurring(contracts: Contract[]): number {
  return contracts.filter((c) => c.active).reduce((sum, c) => sum + c.monthlyAmount, 0)
}

/** Jobs attributed to paid advertising, used to judge the ad channel alone. */
export function adAttributedJobs(jobs: Job[]): Job[] {
  return jobs.filter((j) => j.source === 'Local Services Ads')
}

// ─── CASH POSITION ───────────────────────────────────────────────────────────

export type CashPosition = {
  monthlyIncome: number
  /** What the labour and supplies behind that income cost to deliver. */
  deliveryCost: number
  monthlyOutgoings: number
  /** Positive means building cash, negative means burning it. */
  monthlyNet: number
  /** Money to hold back for tax on a profitable month. */
  taxReserve: number
  /** Months of cover at the current burn — Infinity when not burning. */
  runwayMonths: number
}

export function cashPosition(opts: {
  cashOnHand: number
  paidRevenue: number
  recurringRevenue: number
  monthlyAdSpend: number
  otherMonthlyCosts: number
  /** Share of a job's price left after labour and supplies, 0–1. */
  jobMargin: number
  taxRate: number
}): CashPosition {
  const monthlyIncome = opts.paidRevenue + opts.recurringRevenue

  // Cleaning a house costs labour and supplies whoever swings the mop, and a
  // retainer is no different from a one-off in that respect. Counting the full
  // ticket as cash while `otherMonthlyCosts` holds only software and fuel
  // overstates every figure downstream — the net, the runway and the tax to
  // set aside. `jobMargin` already carries that share; apply it here too so
  // both halves of the dashboard mean the same thing by a dollar.
  const deliveryCost = monthlyIncome * (1 - opts.jobMargin)
  const monthlyOutgoings = opts.monthlyAdSpend + opts.otherMonthlyCosts + deliveryCost
  const monthlyNet = monthlyIncome - monthlyOutgoings

  return {
    monthlyIncome,
    deliveryCost,
    monthlyOutgoings,
    monthlyNet,
    taxReserve: monthlyNet > 0 ? monthlyNet * opts.taxRate : 0,
    runwayMonths: monthlyNet < 0 ? opts.cashOnHand / -monthlyNet : Infinity,
  }
}

// ─── FORMATTING ──────────────────────────────────────────────────────────────

export function money(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

export function percent(fraction: number): string {
  if (!isFinite(fraction)) return '—'
  return `${(fraction * 100).toFixed(1)}%`
}

// ─── EXPORT ──────────────────────────────────────────────────────────────────

const CSV_COLUMNS = ['date', 'paidOn', 'client', 'service', 'sqft', 'source', 'status', 'amount', 'notes'] as const

/** Escape a value for CSV — quotes doubled, whole field quoted. */
function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? '' : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

/**
 * The ledger as CSV, for a bookkeeper or a spreadsheet at tax time. Browser
 * storage is not a filing system — this is how the data gets out.
 */
export function jobsToCsv(jobs: Job[]): string {
  const header = CSV_COLUMNS.join(',')
  const rows = jobs.map((job) => CSV_COLUMNS.map((col) => csvCell(job[col])).join(','))
  return [header, ...rows].join('\n')
}
