import { useStyletron } from 'baseui';
import { Cell, Grid } from 'baseui/layout-grid';
import { DisplayMedium, ParagraphMedium } from 'baseui/typography';
import Head from 'next/head';
import React, { useState } from 'react';
import ApartmentModal from '../components/ApartmentModal';
import ContentTabs from '../components/ContentTabs';

const Listings = () => {
  const [css] = useStyletron();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Listings</title>
      </Head>
      <Grid>
        <Cell
          span={12}
          overrides={{
            Cell: {
              style: {
                textAlign: 'center',
              },
            },
          }}
        >
          <DisplayMedium marginBottom='scale300'>
            Manage, rent or make an offer on apartments, listed on Apartna.
          </DisplayMedium>
          <ParagraphMedium marginBottom='scale1200'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, ad
            accusamus! Nisi dolorem cumque veritatis! Ad nulla doloribus
            placeat, maiores consequuntur perspiciatis possimus quam porro!
          </ParagraphMedium>
        </Cell>
      </Grid>

      <div className={css({ padding: '0 5rem 0 5rem' })}>
        <ContentTabs setIsOpen={setIsOpen} />
      </div>
      <ApartmentModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Listings;
