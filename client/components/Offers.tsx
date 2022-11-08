import React from 'react';
import { useStyletron } from 'baseui';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import { Check, Delete } from 'baseui/icon';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { StatefulTooltip } from 'baseui/tooltip';
import { DisplayXSmall, ParagraphSmall } from 'baseui/typography';

const Offers = () => {
  const [css] = useStyletron();
  return (
    <>
      <DisplayXSmall>Offers made on your listed apartments.</DisplayXSmall>
      <ParagraphSmall marginBottom='scale300'>
        Approve or decline the offers made on your listed apartments for
        purchase on Apartna. When you approve an offer the amount will be sent
        to your wallet.
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
                <React.Fragment>
                  <StatefulTooltip
                    accessibilityType={'tooltip'}
                    content='Approve offer.'
                  >
                    <Button shape='round' size='compact' kind='secondary'>
                      <Check color='positive' title='' />
                    </Button>
                  </StatefulTooltip>
                  <div style={{ width: '18px' }} />
                  <StatefulTooltip
                    accessibilityType={'tooltip'}
                    content='Decline offer.'
                  >
                    <Button shape='round' size='compact' kind='secondary'>
                      <Delete color='negative' title='' />
                    </Button>
                  </StatefulTooltip>
                </React.Fragment>
              )}
            >
              <ListItemLabel description='message...'>Label-Amt</ListItemLabel>
            </ListItem>
          </ul>
        </FlexGridItem>
      </FlexGrid>
    </>
  );
};

export default Offers;
