import { TaskveyPage } from './app.po';

describe('taskvey App', () => {
  let page: TaskveyPage;

  beforeEach(() => {
    page = new TaskveyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('app works!');
  });
});
