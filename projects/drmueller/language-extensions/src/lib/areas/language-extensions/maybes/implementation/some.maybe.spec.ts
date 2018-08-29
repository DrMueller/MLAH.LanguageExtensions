import { Some } from '.';
import { Action, GenericAction } from '../../types/callbacks';

describe('Some', () => {
  const testString = 'test';
  const sut = new Some<string>(testString);

  describe('evaluating', () => {
    describe('with some- and none-action', () => {
      // Arrange
      let someActionWasCalled = false;
      let actualPassedString = '';
      const someAction: GenericAction<string> = (str: string) => {
        someActionWasCalled = true;
        actualPassedString = str;
      };

      let noneActionWasCalled = false;
      const noneAction: Action = () => {
        noneActionWasCalled = true;
      };

      // Act
      sut.evaluate(someAction, noneAction);

      // Assert
      it('calls the some-action with the passed value', () => {
        expect(someActionWasCalled).toBe(true);
        expect(actualPassedString).toEqual(testString);
      });

      it('ignores the none-action', () => {
        expect(noneActionWasCalled).toBe(false);
      });
    });

    describe('With some-action null', () => {
      const someAction: GenericAction<string> = null;
      const noneAction: Action = null;

      sut.evaluate(someAction, noneAction);

      it('Does not throw exception', () => {
      });
    });
  });
});
