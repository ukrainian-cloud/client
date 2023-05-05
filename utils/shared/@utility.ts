import { Initializable } from './@initializable';

const utility = Symbol();

const utilityStore = new WeakMap<any, any>();

interface Utility<T extends Initializable, U extends Initializable> {
	implements: abstract new (...args: any[]) => T;
	implementation: new (...args: any[]) => U;
}

export function isUtility(obj: any): obj is Utility<any, any> {
	return Boolean(obj?.[utility]);
}

export function createUtility<T extends Initializable, U extends Initializable>(
	implementsClass: abstract new (...args: any[]) => T,
	implementationClass: new (...args: any[]) => U,
) {
	return {
		[utility]: true,
		implements: implementsClass,
		implementation: implementationClass,
	} as Utility<T, U>;
}

export function loadUtilities(...utilities: Utility<any, any>[]) {
	for (const utility of utilities) {
		const util = new utility.implementation();
		utilityStore.set(utility.implements, util.init().then(() => {
			utilityStore.set(utility.implements, util);
			return util;
		}));
	}
}

export async function getUtility<T>(target: abstract new (...args: any[]) => T) {
	return await Promise.resolve(utilityStore.get(target));
}
