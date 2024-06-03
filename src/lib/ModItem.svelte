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

<div class="moditem">
  {#if mod}
    <img class="icon" src={icon ?? "/images/Ого.svg"} alt="" />
    <span class="label">{mod.name}</span>
    <Button on:click={openFolder} content="Open folder" />
  {/if}
</div>

<style>
  .moditem {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .label {
    font-weight: 400;
    font-size: 20px;
  }

  .icon {
    width: 64px;
    height: 64px;
  }
</style>
