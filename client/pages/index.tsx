import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';

export const sum = (a: number, b: number) => a + b;

const Home: NextPage = () => {
  const [css, theme] = useStyletron();
  return (
    <div>
      <Button onClick={() => console.log('hey')}>Hello</Button>
      <p className={css({ color: theme.colors.accent600 })}>Styled by hook</p>
    </div>
  );
};

export default Home;
