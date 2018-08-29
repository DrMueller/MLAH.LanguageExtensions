import { None } from '.';
import { Action, GenericAction } from '../../types/callbacks';

describe('None', () => {
  const sut = new None();

  describe('evaluating', () => {

    describe('with some- and none-action', () => {
      // Arrange
      let someActionWasCalled = false;
      const someAction: GenericAction<string> = (str: string) => {
        someActionWasCalled = true;
      };

      let noneActionWasCalled = false;
      const noneAction: Action = () => {
        noneActionWasCalled = true;
      };

      // Act
      sut.evaluate(someAction, noneAction);

      // Assert
      it('ignores the some-action', () => {
        expect(someActionWasCalled).toBe(false);
      });

      it('calls the none-action', () => {
        expect(noneActionWasCalled).toBe(true);
      });
    });

    describe('With none-action null', () => {
      const someAction: GenericAction<string> = null;
      const noneAction: Action = null;

      sut.evaluate(someAction, noneAction);

      it('Does not throw exception', () => {
      });
    });
  });

});
