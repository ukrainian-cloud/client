import { ColorScheme, createUtility, getUtility } from '../shared';
import LocalDBUtility from './local-db';

class ClolorSchemeWebImpl extends ColorScheme {
	async getDefault() {
		const localDB = await getUtility(LocalDBUtility.implements);
		const { Theme } = localDB.enums;
		return matchMedia('prefers-color-scheme: light').matches ? Theme.light : Theme.dark;
	}
}

export default createUtility(ColorScheme, ClolorSchemeWebImpl);
