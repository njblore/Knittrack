import { IconButton, Stack, Text, Wrap } from '@react-native-material/core';
import { useState } from 'react';
import * as Card from './ProjectCard';
import { Project } from '../data/projects';
import * as CardModal from './CardModal';

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
			<CardModal.Component
				visible={detailsView !== undefined}
				onClose={() => setDetailsView(undefined)}
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
			</CardModal.Component>
		</>
	);
}
