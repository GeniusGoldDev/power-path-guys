import '../globals.css';
import { FloatingDock } from '../../components/ui/floating-dock';
import { IconHome2, IconBarbell, IconTargetArrow, IconApple, IconMessages } from '@tabler/icons-react';
import { ModeToggle } from "../../components/modetoggle";

export const metadata = {
  title: 'Fitness App',
  description: 'Track your workouts and calories.',
};

export default function RootLayout({ children }) {
  const items = [
    { title: 'Home', icon: <IconHome2 />, href: '/main' },
    { title: 'Workout', icon: <IconBarbell />, href: '/main/workout' },
    { title: 'Diet', icon: <IconApple />, href: '/main/diet' },
    { title: 'Forum', icon: <IconMessages />, href: '/main/blog' },
    { title: 'Goal', icon: <IconTargetArrow />, href: '/main/goal' },
  ];

  return (
    <>
  <main>{children}
    <FloatingDock
      items={items}
      desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
      mobileClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2"
    />
    </main>
    </>
  );
}
