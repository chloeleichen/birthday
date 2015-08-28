'use strict';
describe('no access', function() {
  it('stranger without the correct path will be denied access', function() {
    browser.get('index.html');
    expect(element.all(by.css(':title')).getText().toEqual('Hi stranger, looks like you are not on the guest list'));
  });
});
