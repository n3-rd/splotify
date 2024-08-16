<script lang="ts">
	import { BadgeCheck, Bell, Flag, Settings } from 'lucide-svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	export let profile;
	console.log('top-profile', profile);
</script>

<div class="bg-black-400 flex items-center gap-7 rounded-[50px] p-2">
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="/"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<!-- <icon class="h-5 w-5" /> -->
				<BadgeCheck size="20" class="text-black dark:text-white" />
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Premium</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="/"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<!-- <icon class="h-5 w-5" /> -->
				<Flag size="20" class="text-black dark:text-white" />
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">premium</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="/"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<!-- <icon class="h-5 w-5" /> -->
				<Settings size="20" class="text-black dark:text-white" />
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">premium</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="/"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<!-- <icon class="h-5 w-5" /> -->
				<Bell size="20" class="text-black dark:text-white" />
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">premium</Tooltip.Content>
	</Tooltip.Root>

	<div
		class="h-10 w-10 rounded-full bg-cover bg-center"
		style={`background-image: url('${profile.images[0].url}')`}
	></div>
</div>
