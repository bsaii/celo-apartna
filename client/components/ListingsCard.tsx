import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { ArrowRight } from 'baseui/icon';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ListingsCard = ({ setIsOpen }: Props) => {
  const [css] = useStyletron();
  return (
    <>
      <FlexGrid
        flexGridColumnCount={[1, 2, 3]}
        flexGridColumnGap='scale800'
        flexGridRowGap='scale800'
      >
        <FlexGridItem>
          <Card headerImage={'https://source.unsplash.com/user/erondu/700x400'}>
            <StyledBody>
              <div
                className={css({
                  fontSize: '.75rem',
                  fontWeight: 'normal',
                })}
              >
                GREENWICH
              </div>
              <div
                className={css({
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                })}
              >
                Lavenda Apartments
              </div>
              <div
                className={css({
                  fontSize: '2rem',
                  fontWeight: 'bolder',
                  marginBottom: '1rem',
                })}
              >
                cUSD 4.00
                <span
                  className={css({
                    fontSize: '1rem',
                    fontWeight: 'normal',
                  })}
                >
                  /night
                </span>
              </div>
            </StyledBody>
            <StyledAction>
              <Button
                overrides={{
                  BaseButton: {
                    style: {
                      width: '100%',
                    },
                  },
                }}
                endEnhancer={() => <ArrowRight size={20} />}
                onClick={() => setIsOpen(true)}
              >
                See Availability
              </Button>
            </StyledAction>
          </Card>
        </FlexGridItem>
      </FlexGrid>
    </>
  );
};

export default ListingsCard;
