import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, Wrap } from '@react-native-material/core';
import { LibraryVolume } from '../data/library';
import * as LibraryCard from './LibraryCard';
import * as CardModal from './CardModal';
import { useEffect, useState } from 'react';

export function Component(props: {
	volumes: Array<LibraryVolume>;
	downloadLinks: Record<number, string>;
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [activeVolume, setActiveVolume] = useState<number>();
	const [pdfInStorage, setPdfInStorage] = useState<boolean | undefined>();

	useEffect(() => {
		if (activeVolume) {
			AsyncStorage.getItem(activeVolume.toString()).then((pdf) => {
				console.log('pdf', pdf);
				setPdfInStorage(pdf !== null);
			});
		} else {
			setPdfInStorage(undefined);
		}
	}, [activeVolume]);

	return (
		<>
			<Wrap
				fill
				inline
				spacing={10}
				shouldWrapChildren
				center
			>
				{props.volumes
					.filter((p) => p.small_image_url)
					.map((p) => (
						<LibraryCard.Component
							key={p.id}
							volume={p}
							setVolumeDetails={(id) => {
								setModalOpen(true);
								setActiveVolume(id);
							}}
						/>
					))}
			</Wrap>
			<CardModal.Component
				visible={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<>
					<Text
						style={{ textAlign: 'center' }}
						variant="subtitle1"
					>
						vvv
					</Text>
					<Text style={{ textAlign: 'center' }}>{activeVolume}</Text>
					{pdfInStorage === undefined && <Text>Loading...</Text>}
					{pdfInStorage === false && activeVolume && (
						<Button
							title="Download PDF"
							onPress={() => props.downloadLinks[activeVolume]}
						/>
					)}
				</>
			</CardModal.Component>
		</>
	);
}
