import { Link } from '@inertiajs/react';
import { Anchor, AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithChildren } from 'react';
import { BaseLayout } from '~/layouts/_base_layout';
import classes from './layout.module.css';

const DefaultLayout = ({ children }: PropsWithChildren) => (
	<BaseLayout>
		<LayoutContent>{children}</LayoutContent>
	</BaseLayout>
);

export default DefaultLayout;

function LayoutContent({ children }: PropsWithChildren) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<div className={classes.app_wrapper}>
			<AppShell
				header={{ height: 60 }}
				classNames={{
					header: classes.navbar,
				}}
				padding="md"
				className={classes.app_shell}
			>
				<AppShell.Header withBorder={false}>
					<Group h="100%" px="md" align="center">
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
						/>
						<Anchor component={Link} href="/" underline="hover">
							Home
						</Anchor>
					</Group>
				</AppShell.Header>
				<AppShell.Main pt="sm">{children}</AppShell.Main>
			</AppShell>
		</div>
	);
}
