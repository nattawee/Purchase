'use strict';

describe('Acquisitions E2E Tests:', function () {
  describe('Test Acquisitions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/acquisitions');
      expect(element.all(by.repeater('acquisition in acquisitions')).count()).toEqual(0);
    });
  });
});
