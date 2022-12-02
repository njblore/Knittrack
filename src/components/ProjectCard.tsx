import { Stack } from '@react-native-material/core';
import { Image, Pressable } from 'react-native';

import { Project } from '../data/projects';

export function Component(props: {
	project: Project;
	setProjectDetails: (name: string, status: string, id: number) => void;
}) {
	return (
		<Stack
			spacing={10}
			style={{
				width: 150,
				height: 150,
				backgroundColor: 'lightyellow',
			}}
		>
			{props.project.first_photo?.small2_url && (
				<Pressable
					onPress={() =>
						props.setProjectDetails(
							props.project.name,
							props.project.completed ? 'finished' : 'in progress',
							props.project.id,
						)
					}
				>
					<Image
						style={{ width: 150, height: 150 }}
						source={{ uri: props.project.first_photo?.small2_url }}
					/>
				</Pressable>
			)}
		</Stack>
	);
}
