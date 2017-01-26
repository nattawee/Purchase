'use strict';

describe('Constructions E2E Tests:', function () {
  describe('Test Constructions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/constructions');
      expect(element.all(by.repeater('construction in constructions')).count()).toEqual(0);
    });
  });
});
