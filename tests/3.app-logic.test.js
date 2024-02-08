/**
 * @jest-environment jsdom
*/
/* eslint-env browser */

const fs = require(`fs`);
const path = require(`path`);

const html = fs.readFileSync(path.resolve(__dirname, `../index.html`), `utf8`);
jest.dontMock(`fs`);

// const rewire = require(`rewire`);
// const updateMessagesMock = rewire(`../resources/js/index`).__get__(`updateMessages`);
// const fetchMessagesMock = rewire(`../resources/js/index`).__get__(`fetchMessages`);
// const formatMessageMock = rewire(`../resources/js/index`).__get__(`formatMessage`);


describe(`Chatting Logic`, function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });
  
  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  it.skip(`works`, function() { // TODO: Fix those tests
    // updateMessagesMock();
    // expect(fetchMessagesMock).toBeCalled();
    // expect(formatMessageMock).toBeCalled();
  });
});