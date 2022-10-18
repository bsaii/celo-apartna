import React, { FunctionComponent, ReactNode } from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { StyledLink as Link } from 'baseui/link';
import { Button } from 'baseui/button';
import { useStyletron } from 'baseui';

interface Props {
  children: ReactNode;
}

const MainLayout: FunctionComponent<Props> = ({ children }) => {
  const [css] = useStyletron();
  return (
    <>
      <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
          <NavigationItem>
            <span className={css({ fontWeight: 'bold', fontSize: '1.8rem' })}>
              Celo Aparna
            </span>
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center} />
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <Link href='/'>Home</Link>
          </NavigationItem>
          <NavigationItem>
            <Link href='/'>Listings</Link>
          </NavigationItem>
          <NavigationItem>
            <Link href='/'>Sell</Link>
          </NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.right}>
          <NavigationItem>
            <Button>Connect</Button>
          </NavigationItem>
        </NavigationList>
      </HeaderNavigation>
      <div className={css({ padding: '.5rem' })}>{children}</div>
    </>
  );
};

export default MainLayout;
