import { Box, Text } from '@react-native-material/core';
import axios from 'axios';
import { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';

import { Project } from '../data/projects';

export function Component(props: { projects: Array<Project> }) {
	return (
		<ScrollView>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					width: '100%',
					justifyContent: 'space-evenly',
				}}
			>
				{props.projects
					.filter((p) => p.first_photo?.small2_url)
					.map(
						(p) =>
							p.first_photo?.small2_url && (
								<Image
									key={p.id}
									style={{ width: 100, height: 100 }}
									source={{ uri: p.first_photo?.small2_url }}
								/>
							),
					)}
			</View>
		</ScrollView>
	);
}
