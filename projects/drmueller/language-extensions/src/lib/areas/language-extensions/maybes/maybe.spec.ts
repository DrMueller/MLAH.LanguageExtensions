import { Maybe } from './maybe';
import { None, Some } from './implementation';

describe('maybe', () => {
  describe('creating', () => {
    describe('from value', () => {
      describe('being null', () => {
        const sut = Maybe.createFromValue(null);
        it('returns none-maybe', () => {
          expect(sut).toEqual(jasmine.any(None));
        });
      });

      describe('being not null', () => {
        const sut = Maybe.createFromValue('test');
        it('returns type some', () => {
          expect(sut).toEqual(jasmine.any(Some));
        });
      });
    });

    describe('for some', () => {
      const sut = Maybe.CreateSome('tra');
      it('returns type some', () => {
        expect(sut).toEqual(jasmine.any(Some));
      });
    });

    describe('for none', () => {
      const sut = Maybe.CreateNone();
      it('returns type none', () => {
        expect(sut).toEqual(jasmine.any(None));
      });
    });
  });
});
