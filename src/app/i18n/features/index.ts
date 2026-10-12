// Diccionarios de funcionalidades (tour, playground, casos de estudio…).
// Cada funcionalidad exporta { es: {...}, en: {...} } en su propio archivo y se registra aquí.
import { TOUR_I18N } from './tour';
import { PLAYGROUND_I18N } from './playground';
import { PROJECTS_EXTRA_I18N } from './projects-extra';

export type FeatureDict = { es: Record<string, string>; en: Record<string, string> };

export const FEATURE_DICTS: FeatureDict[] = [TOUR_I18N, PLAYGROUND_I18N, PROJECTS_EXTRA_I18N];
