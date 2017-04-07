import { StibbleApiClientAngularPage } from './app.po';

describe('stibble-api-client-angular App', () => {
  let page: StibbleApiClientAngularPage;

  beforeEach(() => {
    page = new StibbleApiClientAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
