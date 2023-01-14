import { createUseWindowSize } from './composition-api';
import { getSubject } from '~shared/subject';

// Composition API
export const useWindowSize = createUseWindowSize(getSubject);
