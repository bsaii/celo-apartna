import React from 'react';
import { useStyletron } from 'baseui';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { DisplayXSmall, ParagraphSmall } from 'baseui/typography';

const RentedApartments = () => {
  const [css] = useStyletron();
  return (
    <>
      <DisplayXSmall>Apartments rented</DisplayXSmall>
      <ParagraphSmall marginBottom='scale300'>
        View all the apartments you've rented on Apartna and the nights spent.
        You can terminate a rent agreement and the balance will be sent to your
        wallet.
      </ParagraphSmall>
      <FlexGrid
        flexGridColumnCount={[1, 2, 3]}
        flexGridColumnGap='scale800'
        flexGridRowGap='scale800'
      >
        <FlexGridItem>
          <ul
            className={css({
              width: '500px',
              paddingLeft: 0,
              paddingRight: 0,
            })}
          >
            <ListItem
              endEnhancer={() => (
                <Button size='compact' kind='secondary' shape='pill'>
                  Terminate
                </Button>
              )}
            >
              <ListItemLabel description='4 Nights Left'>Label</ListItemLabel>
            </ListItem>
          </ul>
        </FlexGridItem>
      </FlexGrid>
    </>
  );
};

export default RentedApartments;
