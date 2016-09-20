import { PocCoreBankingPage } from './app.po';

describe('poc-core-banking App', function() {
  let page: PocCoreBankingPage;

  beforeEach(() => {
    page = new PocCoreBankingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
