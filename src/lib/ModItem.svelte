<script lang="ts">
  import { convertFileSrc } from "@tauri-apps/api/tauri";
  import Button from "./Button.svelte";
  import {
    cached_mod_images,
    get_mod_thumbnail,
    type ModDescriptor,
  } from "./wrapper";
  import { open } from "@tauri-apps/api/shell";
  import { emit, listen } from "@tauri-apps/api/event";

  export let mod: ModDescriptor | null = null;

  const openFolder = () => {
    open(mod?.path!);
  };

  const openInSteamWorkshop = (event: MouseEvent, id: string) => {
	//window.open();
	let url = `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
	if (event.shiftKey) {
		url = `steam://openurl/${url}`;
	}

	open(url);
  };

  const actionButtonClick = (event: MouseEvent) => {
	if (mod?.remote_file_id) {
	  openInSteamWorkshop(event, mod.remote_file_id);
	} else if (mod?.path) {
	  openFolder();
	}
  };

  let icon: string | null = null;
  let steam_thumbnail: string | null = null;

  listen<any>("got-wokrshop-item", async (event) => {
    if (event.payload.id !== parseInt(mod!.remote_file_id!)) return;
    if (mod!.path)
      $cached_mod_images.push({ id: mod!.path!, url: event.payload.preview });

    steam_thumbnail = event.payload.preview;
    icon = steam_thumbnail;
  });

  const update_mod = async () => {
    const cached = $cached_mod_images.find((x) => x.id == mod?.path);
    if (cached) {
      icon = cached.url;
      steam_thumbnail = cached.url;
      return;
    }

    if (mod?.remote_file_id) {
      if (!steam_thumbnail) {
        emit("need-wokrshop-item", parseInt(mod.remote_file_id!));
        icon = "/images/Ого.svg";
      }
    } else if (!icon && !steam_thumbnail) {
      get_mod_thumbnail(mod!)
        .then((x) => convertFileSrc(x!))
        .then((x) =>
          x.endsWith("null")
            ? "/images/Ого.svg"
            : (icon = x) &&
              mod!.path &&
              $cached_mod_images.push({ id: mod!.path!, url: x })
        );
    }
  };

  $: {
    mod && update_mod();
  }
</script>

{#if mod}
	<div class="moditem">
		<div class="info-container">
			<img class="icon" src={icon ?? "/images/Ого.svg"} alt="" />
			<div class="info">
				<span class="mod-status">
					{#if mod.remote_file_id}
						<i class="hal-steam"></i>
						steam
					{:else}
						<!-- <i class="hal-local"></i> -->
						local
					{/if}
				</span>
				<h3>{mod.name}</h3>
				{#if mod.remote_file_id}
					<span class="id">{mod.remote_file_id}</span>
				{/if}
			</div>
		</div>
		<div class="controls-container">
			<div class="info-circle">
				<i class="hal-exclamation"></i>
			</div>
			<div class="buttons">
				<Button
					--size="26px"
					--font-size="16px"
					--btn-color="rgba(31, 31, 31, 0.44)"
					--hover-color="rgba(160, 160, 160, 0.2)"
					icon={mod.remote_file_id ? "hal-steam" : "hal-upload"}
					on:click={actionButtonClick}
					>
				</Button>
				<Button
					--size="26px"
					--font-size="16px"
					--btn-color="rgba(31, 31, 31, 0.44)"
					--hover-color="rgba(160, 160, 160, 0.2)"
					icon="hal-open"
					on:click={openFolder}
					>
				</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.mod-status {
		background-color: #1f1f1f9f;

		font-size: 12px;
		border-radius: 6px;
		
		display: flex;
		justify-content: center;
		width: max-content;

		gap: 4px;

		padding: 1px 5px;
	}

	.moditem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding: 10px;

		border-radius: 5px;

		background: #4e4e4e71;
	}

	.info-container {	
		display: flex;
		flex-direction: row;
		align-items: center;

		gap: 5px;
	}

	.info-container .icon {
		width: 70px;
		height: 70px;

		border-radius: 5px;
	}

	.info-container .info {
		display: flex;
		flex-direction: column;

		gap: 1px;

		font-size: 18px;
	}

	.controls-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.controls-container .info-circle {
		width: 16px;
		height: 16px;
		border-radius: 50%;

		display: flex;
		justify-content: center;
		align-items: center;

		background: #1F1F1F;
		color: #fff;

		font-size: 12px;

		opacity: .44;

		cursor: help;
	}

	.controls-container .buttons {
		display: flex;
		flex-direction: row;
		gap: 5px;
	}

  .id {
    font-size: 12px;
  }
</style>
