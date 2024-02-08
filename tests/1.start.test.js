/**
 * @jest-environment jsdom
*/
/* eslint-env browser */

const fs = require(`fs`);
const path = require(`path`);

const html = fs.readFileSync(path.resolve(__dirname, `../index.html`), `utf8`);

jest.dontMock(`fs`);

describe(`html content`, function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  test(`page title is IT3049 Chat`, function () {
    const documentTitle = document.title;

    expect(documentTitle).toContain(`IT3049 Chat`);
  });

  it(`contains all the starting links and styles in head`, function () {
    const styleElements = document.querySelectorAll(`head > link`);
    const styleSources = Array.from(styleElements)
      .filter((ele) => ele.rel === `stylesheet`)
      .map((ele) => ele.href.slice(17));
    const expectedStyles = [
      `resources/vendor/bootstrap.min.css`,
      `resources/vendor/fontawesome-free/css/all.min.css`,
      `resources/css/styles.css`
    ];
    expect(styleSources).toEqual(expect.arrayContaining(expectedStyles));
  });

  it(`contains all the starting scripts in head`, function () {
    const scriptElements = document.querySelectorAll(`head > script`);
    const scriptSources = Array.from(scriptElements)
      .map((ele) => ele.src.slice(17));
    const expected = [
      `resources/vendor/bootstrap.min.js`,
      `resources/vendor/popper.min.js`,
      `resources/vendor/jquery-3.5.1.slim.min.js`
    ];
    expect(scriptSources).toEqual(expect.arrayContaining(expected));
  });

  it(`contains all the custom scripts in body`, function () {
    const scriptElements = document.querySelectorAll(`body > script`);
    const scriptSources = Array.from(scriptElements)
      .map((ele) => ele.src.slice(17));
    const expected = [
      `resources/js/index.js`,
    ];
    expect(scriptSources).toEqual(expect.arrayContaining(expected));
  });

});
