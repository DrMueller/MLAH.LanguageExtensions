export type Func<T> = () => T;

export type OneArgFunc<T, TResult> = (arg: T) => TResult;

export type TwoArgFunc<T, T2, TResult> = (arg1: T, arg2: T2) => TResult;
