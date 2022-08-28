// https://github.com/borm/nest-deep

const typeOf = (operand: any) => Object.prototype.toString.call(operand).slice(8, -1).toLowerCase();

const isArray = (array: any) => typeOf(array) === 'array';

const isObject = (object: any) => typeOf(object) === 'object';

const { keys } = Object;

export type Flatten<T extends object> = object extends T
	? object
	: {
			[K in keyof T]-?: (
				x: NonNullable<T[K]> extends infer V
					? V extends object
						? V extends readonly any[]
							? Pick<T, K>
							: Flatten<V> extends infer FV
							? {
									[P in keyof FV as `${Extract<K, string | number>}.${Extract<
										P,
										string | number
									>}`]: FV[P];
							  }
							: never
						: Pick<T, K>
					: never
			) => void;
	  } extends Record<keyof T, (y: infer O) => void>
	? O extends infer _
		? { [K in keyof O]: O[K] }
		: never
	: never;

export const flatten = <T extends { [key: string]: any }>(obj: T): Flatten<T> => {
	if (!isObject(obj)) throw new Error();

	const recur = (accumulator: { [key: string]: any }, key: string, value: any) => {
		if (isObject(value)) {
			const objKeys = keys(value);
			if (objKeys.length) {
				objKeys.forEach((v) => {
					recur(accumulator, `${key}.${v}`, value[v]);
				});
				return accumulator;
			}
		}

		if (isArray(value)) {
			if (value.length) {
				value.forEach((v: any, i: number) => {
					recur(accumulator, `${key}[${i}]`, v);
				});
				return accumulator;
			}
		}

		accumulator[key] = value;
		return accumulator;
	};

	return keys(obj).reduce(
		(accumulator, key) => ({
			...accumulator,
			...recur(accumulator, key, obj[key])
		}),
		{}
	) as Flatten<T>;
};
