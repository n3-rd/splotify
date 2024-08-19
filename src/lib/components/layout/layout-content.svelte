<script lang="ts">
	import { Compass, Heart, LibraryBig, Moon, Sun } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	import TopNav from '$lib/components/layout/top-nav.svelte';
	import { page } from '$app/stores';
	import { IconSmartHome } from '@tabler/icons-svelte';
	import Miniplayer from '$lib/components/player/miniplayer.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { derived, writable } from 'svelte/store';

	const intervalMs = writable(1000);
	export let data;

	const playerInfo = createQuery(
		derived(intervalMs, ($intervalMs) => ({
			queryKey: ['playerInfo'],
			queryFn: async () => {
				const response = await fetch(data.playerInfoEndpoint);
				return response.json();
			},
			initialData: data.playerInfo ?? [],
			refetchInterval: $intervalMs
		}))
	);
	const profile = createQuery({
		queryKey: ['profile'],
		queryFn: () => Promise.resolve(data.userInfo ?? {}),
		initialData: data.userInfo ?? {}
	});

	const loggedIn = createQuery({
		queryKey: ['loggedIn'],
		queryFn: () => Promise.resolve(data.loggedIn ?? false),
		initialData: data.loggedIn ?? false
	});

	$: currentRoute = $page.route.id;

	const navItems = [
		{ name: 'Home', icon: IconSmartHome, href: '/' },
		{ name: 'Explore', icon: Compass, href: '/admin/app/users' },
		{ name: 'Library', icon: LibraryBig, href: '/admin/app/analytics' },
		{ name: 'Likes', icon: Heart, href: '/admin/app/webhooks' }
	];
</script>

{#if $loggedIn.data}
	<div class="relative flex h-screen min-w-full items-center">
		<div class="sidebar relative h-full w-[7%]">
			<div class="fixed left-0 flex w-[7%] items-center justify-center">
				<div class="menu top-2 flex w-full flex-col items-center justify-center gap-12 py-10">
					<img src="/icons/spotify.svg" alt="spotify logo" class="h-16 w-16" />
					{#each navItems as { name, icon, href }}
						<Tooltip.Root>
							<Tooltip.Trigger asChild let:builder>
								<a
									{href}
									class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
									use:builder.action
									{...builder}
								>
									<svelte:component
										this={icon}
										fill={currentRoute == href
											? 'var(--color-primary)'
											: 'var(--color-muted-foreground)'}
										size="30"
									/>
								</a>
							</Tooltip.Trigger>
							<Tooltip.Content side="right">{name}</Tooltip.Content>
						</Tooltip.Root>
					{/each}
					<Button on:click={toggleMode} variant="outline" size="icon">
						<Sun
							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
						/>
						<Moon
							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
						/>
						<span class="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
		</div>
		<div class="h-full w-[93%]">
			<div class="relative">
				<TopNav profile={$profile.data} />
			</div>
			<main class="pb-24">
				<slot />
			</main>
		</div>
		<Miniplayer data={$playerInfo.data} />
	</div>
{:else}
	<p>You are logged out</p>
	<a href="/login">login</a>
{/if}
