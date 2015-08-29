'use strict';
describe("birthday test", function () {
  describe("index", function () {
    it("should display the correct title", function () {
      browser.get('/#/john');
      expect(browser.getTitle()).toBe('You are invited!');
    });

    it("should display the correct messages when a button is clicked", function(){

      var button = element(by.id('btn1')),
          message = element(by.binding('intro'));
          //button.click();

          expect(message.getText()).toBe('hello stranger');
      });
  });

})




