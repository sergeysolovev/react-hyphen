import { rm } from './rm';
import { testLanguage } from './utils/testLanguage';

describe('languages/rm', testLanguage(rm, 'rm'));
