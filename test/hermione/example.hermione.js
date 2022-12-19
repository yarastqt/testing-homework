const { assert } = require("chai");

// describe("microsoft", async function () {
//   it("Тест, который пройдет", async function () {
//     await this.browser.url("https://www.microsoft.com/ru-ru/");
//     await this.browser.assertView("plain", "#uhfLogo");

//     const title = await this.browser.$("#uhfLogo").getText();
//     assert.equal(title, "Microsoft");
//   });
// });

// async function assertAdaptive(url) {
//   await this.browser.url(url);
//   await this.browser.setWindowSize(1280, 720);
//   await this.browser.assertView("desktop-screen", "body");

//   await this.browser.setWindowSize(768, 1024);
//   await this.browser.assertView("tablet-screen", "body");

//   await this.browser.setWindowSize(375, 667);
//   await this.browser.assertView("touch-screen", "body");
// }

describe("вёрстка должна адаптироваться под ширину экрана", () => {
  it("главная2", async function () {
    // await assertAdaptive.call(this, "http://localhost:3000/hw/store");
    await this.browser.url("http://localhost:3000/hw/store");
    await this.browser.setWindowSize(1280, 720);
    await this.browser.assertView("desktop-screen", "body");

    await this.browser.setWindowSize(768, 1024);
    await this.browser.assertView("tablet-screen", "body");

    await this.browser.setWindowSize(375, 667);
    await this.browser.assertView("touch-screen", "body");
  });

  //   it("каталог", async function () {
  //     await assertAdaptive.call(this, "http://localhost:3000/hw/store/catalog");
  //   });

  //   it("доставка", async function () {
  //     await assertAdaptive.call(this, "http://localhost:3000/hw/store/delivery");
  //   });

  //   it("контакты", async function () {
  //     await assertAdaptive.call(this, "http://localhost:3000/hw/store/contacts");
  //   });

  //   it("корзина (пустая)", async function () {
  //     await assertAdaptive.call(this, "http://localhost:3000/hw/store/cart");
  //   });
});
