'use strict';

describe('Safekeeps E2E Tests:', function () {
  describe('Test Safekeeps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/safekeeps');
      expect(element.all(by.repeater('safekeep in safekeeps')).count()).toEqual(0);
    });
  });
});
