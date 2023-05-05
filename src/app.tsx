import { FlexBox, FlexChild, Button } from '@components';

export function App() {
	return (
		<FlexBox direction={FlexBox.Direction.column}>
			<FlexChild basis='40px'>
				<FlexBox>
					top
				</FlexBox>
			</FlexChild>
			<FlexChild grow={1}>
				<FlexBox>
					bottom
				</FlexBox>
			</FlexChild>
		</FlexBox>
	);
}
