import { draggedFolder, draggedLink, selectedFolders, selectedLinks } from '../../stores/stores';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';
import { moveFolders } from './moveFoldersToAnotherFolder';
import { moveLinks } from './moveLinks';

let el: HTMLElement;
let f: Partial<Folder> = {};
let l: Partial<Link> = {};
let folderID: string = '';

let foldersToMove: Partial<Folder>[] = [];

let linksToMove: Partial<Link>[] = [];

export async function ListenToDrop(e: DragEvent) {
	selectedFolders.set([]);

	selectedLinks.set([]);

	el = e.target as HTMLDivElement;

	el = el.closest('.folder') as HTMLDivElement;

	const unsubscribe = draggedFolder.subscribe((value) => {
		f = value;
	});

	const unsub = draggedLink.subscribe((value) => {
		l = value;
	});

	unsubscribe();

	unsub();

	if (el.dataset.folderid) {
		folderID = el.dataset.folderid;
	}

	if (f.folder_id && l.link_id === undefined) {
		await moveFolders([...foldersToMove, f], folderID);
	} else if (l.link_id && f.folder_id === undefined) {
		moveLinks([...linksToMove, l], folderID);
	}

	draggedFolder.set({});

	draggedLink.set({});
}
