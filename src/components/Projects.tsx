import { IconButton, Stack, Text, Wrap } from '@react-native-material/core';
import { useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import * as Card from './ProjectCard';
import { Project } from '../data/projects';

export function Component(props: { projects: Array<Project> }) {
	const [detailsView, setDetailsView] = useState<
		| {
				name: string;
				status: string;
				id: number;
		  }
		| undefined
	>();

	return (
		<>
			<Wrap
				fill
				inline
				spacing={10}
				shouldWrapChildren
				center
			>
				{props.projects
					.filter((p) => p.first_photo?.small2_url)
					.map((p) => (
						<Card.Component
							key={p.id}
							project={p}
							setProjectDetails={(name, status, id) =>
								setDetailsView({ name, status, id })
							}
						/>
					))}
			</Wrap>
			<Modal
				visible={detailsView !== undefined}
				onDismiss={() => setDetailsView(undefined)}
				onRequestClose={() => setDetailsView(undefined)}
				transparent
			>
				<TouchableOpacity
					style={{
						backgroundColor: 'rgba(0,0,0,0.5)',
						flex: 1,
						justifyContent: 'center',
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
					}}
					onPress={() => setDetailsView(undefined)}
				>
					<Stack
						style={{
							width: '60%',
							height: '60%',
							backgroundColor: 'white',
							borderRadius: 5,
						}}
					>
						<IconButton />
						<Text
							style={{ textAlign: 'center' }}
							variant="subtitle1"
						>
							{detailsView?.name}
						</Text>
						<Text style={{ textAlign: 'center' }}>{detailsView?.status}</Text>
						<Text>{detailsView?.id}</Text>
					</Stack>
				</TouchableOpacity>
			</Modal>
		</>
	);
}
