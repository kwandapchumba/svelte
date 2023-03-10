<script lang="ts">
	import { selectedFolders } from './../../stores/stores';
	import { containsSpecialChars } from '$lib/utils/checkForSpecialChars';
	import { hideRenameFolderForm } from '$lib/utils/hideRenameFolderForm';
	import { stop_propagation } from 'svelte/internal';
	import { renameFolder } from '$lib/utils/renameFolder';

	$: folder = $selectedFolders[0];

	async function submitForm() {
		await renameFolder(folder.folder_name, folder.folder_id);
	}
</script>

<div class="rename_folder" on:click|preventDefault|stopPropagation={hideRenameFolderForm} on:keyup>
	<form
		on:click|preventDefault|stopPropagation={stop_propagation}
		on:keyup
		class:form_validation_error={folder.folder_name === '' ||
			containsSpecialChars(folder.folder_name)}
	>
		<div class="top">
			<span>Rename collection</span>
			<i class="las la-times" />
		</div>
		<div class="middle">
			<div class="input">
				<div class="icon">
					<svg
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#000000"
						><path
							d="M2 11V4.6a.6.6 0 01.6-.6h6.178a.6.6 0 01.39.144l3.164 2.712a.6.6 0 00.39.144H21.4a.6.6 0 01.6.6V11M2 11v8.4a.6.6 0 00.6.6h18.8a.6.6 0 00.6-.6V11M2 11h20"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</div>
				<input
					type="text"
					id="rename_folder_input"
					placeholder="Enter folder name"
					bind:value={folder.folder_name}
					spellcheck="false"
					autocomplete="off"
					autocorrect="off"
				/>
			</div>
		</div>
		<div class="errors">
			{#if folder.folder_name === ''}
				<span>Folder name is required</span>
			{/if}
			{#if containsSpecialChars(folder.folder_name)}
				<span>Folder name must not contain special characters</span>
			{/if}
		</div>
		<div class="bottom">
			<button type="submit" on:click|preventDefault|stopPropagation={submitForm}>
				<span>Rename</span>
			</button>
			<button on:click|preventDefault|stopPropagation={hideRenameFolderForm} on:keyup>
				<span>Cancel</span>
			</button>
		</div>
	</form>
</div>

<style lang="scss">
	.rename_folder {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		form {
			min-height: 20rem;
			width: 40rem;
			max-width: 40rem;
			background-color: white;
			display: flex;
			flex-direction: column;
			box-shadow: $modal_box_shadow;
			padding: 2em;
			//transform: scale(1);
			animation: zoomin 0.5s ease-in-out;
			border-radius: 0.6rem;
			gap: 1em;

			.top {
				height: 10%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				span {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.5rem;
					color: $text-color-regular;
				}

				i {
					font-size: 1.8rem;
					color: $text-color-regular;
					cursor: pointer;
					background-color: transparent;
					border-radius: 100vh;
					padding: 0.1em;
					transition: background-color 150ms ease-in-out;

					&:hover {
						background-color: $gray;
					}
				}
			}

			.middle {
				flex: 1;
				width: 100%;
				display: flex;
				align-items: center;

				.input {
					display: flex;
					align-items: center;
					width: 100%;
					border: 0.2rem solid $border-color-regular;
					height: 3.5rem;
					border: none;
					outline: 0.1rem solid $border-color-regular;
					border-radius: 0.3rem;

					.icon {
						width: 10%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;

						svg {
							path {
								stroke: transparent;
								fill: rgba(0, 0, 0, 0.5);
							}
						}
					}

					input[type='text'] {
						width: 90%;
						border: none;
						outline: none;
						height: 100%;
						padding: 0 0.5em;
						font-family: 'Arial CE', sans-serif;

						&::placeholder {
							font-family: 'Arial CE', sans-serif;
						}
					}

					&:hover {
						outline-color: $secondary-blue;
					}

					&:focus-within {
						outline-color: $secondary-blue;

						.icon svg path {
							fill: $text-color-regular;
						}
					}
				}
			}

			.errors {
				display: flex;
				flex-direction: column;

				span {
					font-family: 'Arial CE', sans-serif;
					font-size: 1.1rem;
					color: rgb(164, 38, 44);
				}
			}

			.bottom {
				flex: 1;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 0.5em;

				button {
					height: 3.5rem;
					min-width: 7rem;
					border: none;
					background-color: $gray;
					cursor: pointer;
					display: flex;
					align-items: center;
					justify-content: center;
					background-image: linear-gradient(to top, #e1e8eb 50%, $gray 50%);
					background-size: 100% 200%;
					background-position: top;
					transition: background-position 100ms ease-in-out;
					border-radius: 0.3rem;

					span {
						font-family: 'Arial CE', sans-serif;
						font-size: 1.3rem;
						color: $text-color-regular;
					}

					&:hover {
						background-position: bottom;

						span {
							color: $text-color-regular;
						}
					}
				}

				button[type='submit'] {
					background-image: linear-gradient(to top, #0081c9 50%, $blue 50%);

					span {
						color: white;
					}

					&:hover {
						background-position: bottom;
					}
				}
			}

			@keyframes zoomin {
				0% {
					transform: translateY(-50px);
					opacity: 0;
				}

				100% {
					transform: translateY(0);
					opacity: 1;
				}
			}

			@media screen and (max-width: 768px) {
				width: 95%;
			}
		}

		.form_validation_error {
			.top {
				.input {
					outline-color: $form_error_red;

					.icon {
						svg {
							path {
								stroke: transparent !important;
								fill: $form_error_red !important;
							}
						}
					}

					&:hover {
						outline-color: $form_error_red;
					}

					&:focus-within {
						outline-color: $form_error_red;
					}
				}
			}

			.bottom {
				button[type='submit'] {
					opacity: 0.5;
					pointer-events: none;
				}
			}
		}
	}
</style>
