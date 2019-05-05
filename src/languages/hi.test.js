import { hi } from './hi';
import { testLanguage } from './utils/testLanguage';

describe('languages/hi', testLanguage(hi, 'hi'));
