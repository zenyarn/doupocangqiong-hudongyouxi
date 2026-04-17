import type { Metadata } from 'next';
import { GameScreen } from '@/components/game/game-screen';

export const metadata: Metadata = {
  title: '斗破苍穹：炎帝之路',
  description: '体验从废材到斗帝的传奇之路，你的每一个选择都将决定命运！',
};

export default function Home() {
  return <GameScreen />;
}
