import { ActionEvent } from '.';
import { GenericAction } from '../types/callbacks';

describe('ActionEvent', () => {
  let sut: ActionEvent<any>;

  beforeEach(() => {
    sut = new ActionEvent<any>();
  });

  describe('Subscribing', () => {
    let actionWasCalled = false;
    const mockAction: GenericAction<any> = ((args) => {
      actionWasCalled = true;
    });

    beforeEach(() => {
      sut.subscribe(mockAction);
    });

    describe('And firing the Event', () => {
      it('Fires the callback', () => {
        sut.onEvent(null);
        expect(actionWasCalled).toBe(true);
      });
    });
  });

  describe('Unsubscribing and firing the event does not fire the callback', () => {
    let actionWasCalled = false;
    const mockAction: GenericAction<any> = ((args) => {
      actionWasCalled = true;
    });

    it('Does not fire the callback', () => {
      sut.subscribe(mockAction);
      sut.unsubscribe(mockAction);
      sut.onEvent(null);
      expect(actionWasCalled).toBe(false);
    });
  });
});
