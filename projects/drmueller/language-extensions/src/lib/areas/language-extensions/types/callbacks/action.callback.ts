export type Action = () => void;

export type GenericAction<T> = (arg: T) => void;
