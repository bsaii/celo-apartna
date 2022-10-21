import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Button, SIZE } from 'baseui/button';
import { useStyletron } from 'baseui';
import { Cell, Grid } from 'baseui/layout-grid';
import { DisplayMedium, ParagraphMedium } from 'baseui/typography';
import { StyledLink } from 'baseui/link';
import { TriangleRight } from 'baseui/icon';

const Home: NextPage = () => {
  const [css] = useStyletron();
  return (
    <>
      <Head>
        <title>Apartna</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Grid>
        <Cell span={6} align='center'>
          <DisplayMedium marginBottom='scale600'>
            Curtaining the best apartments that you truly deserve
          </DisplayMedium>
          <ParagraphMedium marginBottom='scale1200'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In atque
            veritatis minus laudantium dicta minima nobis impedit itaque
            corporis! Harum. Lorem ipsum dolor sit amet.
          </ParagraphMedium>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <Button size={SIZE.large} $as='a' href='/listings'>
              Listings
            </Button>
            <span
              className={css({
                marginLeft: '2rem',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <StyledLink href='/list' animateUnderline>
                List apartment
              </StyledLink>
              <TriangleRight size={25} />
            </span>
          </div>
        </Cell>
        <Cell span={6}>
          <Image src='/img/interior1.jpg' width='550' height='650' />
        </Cell>
      </Grid>

      <Grid>
        <Cell span={12}>Your most idea solutions</Cell>
      </Grid>
    </>
  );
};

export default Home;
