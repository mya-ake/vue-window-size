import { createUseWindowSize } from './composition-api';
import { getSubject } from './subject';

// Composition API
export const useWindowSize = createUseWindowSize(getSubject);
