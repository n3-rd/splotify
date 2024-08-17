<script lang="ts">
	import { Compass, Heart, Home, LibraryBig, Moon, Sun } from 'lucide-svelte';
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	import TopProfile from '$lib/components/layout/top-profile.svelte';
	import TopNav from '$lib/components/layout/top-nav.svelte';
	const navItems = [
		{ name: 'Home', icon: Home, href: '/' },
		{ name: 'Explore', icon: Compass, href: '/admin/app/users' },
		{ name: 'Library', icon: LibraryBig, href: '/admin/app/analytics' },
		{ name: 'Likes', icon: Heart, href: '/admin/app/webhooks' }
	];
	export let data;
	const profile = data.userInfo;
	const loggedIn = data.loggedIn;
</script>

<ModeWatcher />
{#if loggedIn}
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
									<!-- <icon class="h-5 w-5" /> -->
									<svelte:component this={icon} size="30" class="opacity-60" />
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
				<TopNav {profile} />
			</div>
			<main class="">
				<slot></slot>
			</main>
		</div>
	</div>
{:else}
	<p>You are logged out</p>
	<a href="/login">login</a>
{/if}
