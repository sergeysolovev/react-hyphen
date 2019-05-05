import { pi } from './pi';
import { testLanguage } from './utils/testLanguage';

describe('languages/pi', testLanguage(pi, 'pi'));
