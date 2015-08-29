'use strict';
describe("birthday test", function () {
  var flow = protractor.promise.controlFlow();
  function waitOne() {
    return protractor.promise.delayed(5000);
  }

  function sleep() {
    flow.execute(waitOne);
  }

  describe("index", function () {
    var btn1 = element(by.id('btn1')),
        btn2 = element(by.id('btn2')),
        btn3 = element(by.id('btn3')),
        intro = element(by.binding('intro')),
        close = element(by.id('close')),
        prompt = element(by.binding('prompt'));

    it("should display the correct title", function title() {
      browser.get('http://localhost:8080');
      expect(browser.getTitle()).toBe('You are invited!');
    });

    it("should display the correct messages when button is clicked", function rsvp(){
      browser.get('http://localhost:8080/#/john');
      sleep();
      btn1.click();
    })

    it("should display prompt when button is clicked", function btn1test(){
      browser.get('http://localhost:8080/#/john');
      sleep();
      expect(intro.getText()).toBe("Hi John, You have RSVPed to Jeremy's 40th Party!");
      btn2.click();
      sleep();
      expect(prompt.getText()).toBe("Sorry to hear that, you'll be missed");
      close.click();
      expect(intro.getText()).toBe("Hi John, You won't be coming to Jeremy's 40th Party!");
      btn3.click();
      sleep();
      expect(prompt.getText()).toBe("Sure, you can tell us later");
      close.click();
      expect(intro.getText()).toBe("Hi John, You have a pending invitation to Jeremy's 40th Party!");
    });

    it("should display the correct messages page is loaded", function btn2test(){
      browser.get('http://localhost:8080/#/john');
      sleep();
      expect(intro.getText()).toBe("Hi John, You have a pending invitation to Jeremy's 40th Party!");
    });
  });
});




