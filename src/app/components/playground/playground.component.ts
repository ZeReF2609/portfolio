import { Component, computed, inject, signal } from '@angular/core';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { I18nService } from '../../services/i18n.service';
import titanicData from '../../data/titanic.json';

/** Fila compacta del dataset Titanic (Kaggle train.csv). */
interface Passenger {
  /** 1 = sobrevivió, 0 = falleció */
  s: number;
  /** Clase del pasaje: 1, 2 o 3 */
  c: number;
  /** Sexo: 'f' | 'm' */
  x: string;
  /** Edad (null si no está registrada) */
  a: number | null;
  /** Tarifa pagada */
  f: number;
}

type ClassFilter = 'all' | 1 | 2 | 3;
type SexFilter = 'all' | 'f' | 'm';
type AgeFilter = 'all' | 'child' | 'teen' | 'young' | 'adult' | 'senior';

interface Option<T> { value: T; label: string; }

interface Stats { total: number; survived: number; rate: number; }

interface ClassBar extends Stats { cls: 1 | 2 | 3; active: boolean; }

interface SexBar extends Stats { sex: 'f' | 'm'; died: number; active: boolean; }

const PASSENGERS: readonly Passenger[] = titanicData as Passenger[];

const AGE_RANGES: Record<Exclude<AgeFilter, 'all'>, [number, number]> = {
  child: [0, 13],
  teen: [13, 18],
  young: [18, 35],
  adult: [35, 60],
  senior: [60, Infinity]
};

function stats(rows: readonly Passenger[]): Stats {
  const survived = rows.reduce((acc, p) => acc + p.s, 0);
  return { total: rows.length, survived, rate: rows.length ? (survived / rows.length) * 100 : 0 };
}

const OVERALL = stats(PASSENGERS);

@Component({
  selector: 'app-playground',
  imports: [ScrollAnimationDirective, TranslatePipe],
  templateUrl: './playground.component.html',
  styles: [`
    .pg-vbar { transform-box: fill-box; transform-origin: 50% 100%; }
    .pg-hbar { transform-box: fill-box; transform-origin: 0 50%; }
    @media (prefers-reduced-motion: reduce) {
      .pg-vbar, .pg-hbar { transition: none; }
    }
  `]
})
export class PlaygroundComponent {
  private readonly i18n = inject(I18nService);

  readonly repoUrl = 'https://github.com/ZeReF2609/titanic-powerbi-dashboard';
  readonly overallRate = OVERALL.rate;

  readonly classFilter = signal<ClassFilter>('all');
  readonly sexFilter = signal<SexFilter>('all');
  readonly ageFilter = signal<AgeFilter>('all');

  readonly classOptions: Option<ClassFilter>[] = [
    { value: 'all', label: 'pg.all' },
    { value: 1, label: 'pg.class.1' },
    { value: 2, label: 'pg.class.2' },
    { value: 3, label: 'pg.class.3' }
  ];
  readonly sexOptions: Option<SexFilter>[] = [
    { value: 'all', label: 'pg.all' },
    { value: 'f', label: 'pg.sex.f' },
    { value: 'm', label: 'pg.sex.m' }
  ];
  readonly ageOptions: Option<AgeFilter>[] = [
    { value: 'all', label: 'pg.all' },
    { value: 'child', label: 'pg.age.child' },
    { value: 'teen', label: 'pg.age.teen' },
    { value: 'young', label: 'pg.age.young' },
    { value: 'adult', label: 'pg.age.adult' },
    { value: 'senior', label: 'pg.age.senior' }
  ];

  readonly hasFilters = computed(
    () => this.classFilter() !== 'all' || this.sexFilter() !== 'all' || this.ageFilter() !== 'all'
  );

  /** Filas que cumplen los filtros de sexo y edad (base del gráfico por clase). */
  private readonly bySexAge = computed(() => {
    const sex = this.sexFilter();
    const age = this.ageFilter();
    return PASSENGERS.filter(p => (sex === 'all' || p.x === sex) && this.matchesAge(p, age));
  });

  /** Filas que cumplen los filtros de clase y edad (base del gráfico por sexo). */
  private readonly byClassAge = computed(() => {
    const cls = this.classFilter();
    const age = this.ageFilter();
    return PASSENGERS.filter(p => (cls === 'all' || p.c === cls) && this.matchesAge(p, age));
  });

  /** Selección completa (todos los filtros). */
  readonly filtered = computed(() => {
    const cls = this.classFilter();
    return this.bySexAge().filter(p => cls === 'all' || p.c === cls);
  });

  readonly kpis = computed(() => {
    const rows = this.filtered();
    const s = stats(rows);
    const ages = rows.filter(p => p.a !== null).map(p => p.a as number);
    const avgAge = ages.length ? ages.reduce((a, b) => a + b, 0) / ages.length : null;
    return { ...s, avgAge };
  });

  readonly classBars = computed<ClassBar[]>(() => {
    const rows = this.bySexAge();
    const selected = this.classFilter();
    return ([1, 2, 3] as const).map(cls => ({
      cls,
      ...stats(rows.filter(p => p.c === cls)),
      active: selected === 'all' || selected === cls
    }));
  });

  readonly sexBars = computed<SexBar[]>(() => {
    const rows = this.byClassAge();
    const selected = this.sexFilter();
    return (['f', 'm'] as const).map(sex => {
      const s = stats(rows.filter(p => p.x === sex));
      return { sex, ...s, died: s.total - s.survived, active: selected === 'all' || selected === sex };
    });
  });

  readonly insight = computed(() => {
    this.i18n.lang(); // dependencia reactiva del idioma
    const k = this.kpis();
    if (k.total === 0) return this.i18n.t('pg.insight.empty');

    if (this.sexFilter() === 'all') {
      const [women, men] = this.sexBars();
      if (women.total > 0 && men.total > 0 && men.rate > 0 && women.rate > 0) {
        return this.i18n.t('pg.insight.ratio').replace('{x}', this.fmt(women.rate / men.rate, 1));
      }
    }

    const diff = k.rate - OVERALL.rate;
    const key = Math.abs(diff) < 0.5 ? 'pg.insight.same' : diff > 0 ? 'pg.insight.above' : 'pg.insight.below';
    return this.i18n
      .t(key)
      .replace('{x}', this.fmt(Math.abs(diff), 1))
      .replace('{y}', this.fmt(OVERALL.rate, 1));
  });

  setClass(v: ClassFilter): void { this.classFilter.set(v); }
  setSex(v: SexFilter): void { this.sexFilter.set(v); }
  setAge(v: AgeFilter): void { this.ageFilter.set(v); }

  reset(): void {
    this.classFilter.set('all');
    this.sexFilter.set('all');
    this.ageFilter.set('all');
  }

  /** Formatea números según el idioma activo. */
  fmt(n: number, digits = 0): string {
    const locale = this.i18n.lang() === 'en' ? 'en-US' : 'es-PE';
    return n.toLocaleString(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  classLabel(cls: 1 | 2 | 3): string {
    return this.i18n.t('pg.classLabel').replace('{x}', this.i18n.t('pg.class.' + cls));
  }

  classBarLabel(b: ClassBar): string {
    return this.i18n.t('pg.barLabel').replace('{x}', this.classLabel(b.cls)).replace('{y}', this.fmt(b.rate, 1));
  }

  sexBarLabel(b: SexBar): string {
    return this.i18n
      .t('pg.sexBarLabel')
      .replace('{x}', this.i18n.t('pg.sex.' + b.sex))
      .replace('{y}', this.fmt(b.survived))
      .replace('{z}', this.fmt(b.died));
  }

  private matchesAge(p: Passenger, age: AgeFilter): boolean {
    if (age === 'all') return true;
    if (p.a === null) return false;
    const [min, max] = AGE_RANGES[age];
    return p.a >= min && p.a < max;
  }
}
