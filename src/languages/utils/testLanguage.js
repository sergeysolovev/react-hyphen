export const testLanguage = (language, languageId) => {
  return () => {
    it('contains patterns and id', () => {
      expect(language).toMatchObject({
        id: languageId,
        patterns: expect.objectContaining({
          patterns: expect.any(Array),
          exceptions: expect.any(Array)
        })
      });
    });
  };
};
