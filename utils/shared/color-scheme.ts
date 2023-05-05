import { Initializable } from './@initializable';
import { getUtility } from './@utility';
import { LocalDB } from './local-db';

type Theme = LocalDB['enums']['Theme'][keyof LocalDB['enums']['Theme']];

export abstract class ColorScheme extends Initializable {
	// @ts-expect-error should be initialized in init() method
	public current: Theme;

	abstract getDefault(): Promise<Theme>;

	private onChange = (next: Theme) => {
		this.current = next;
	};

	async init() {
		const db = await getUtility(LocalDB);
		this.current = await db.get('theme');
		db.onChange('theme', this.onChange);
	}
}
