import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  FocusOnce,
} from 'baseui/modal';
import { useStyletron } from 'baseui';
import Image from 'next/image';
import { Button } from 'baseui/button';
import { ButtonGroup, SIZE } from 'baseui/button-group';
import { TriangleDown } from 'baseui/icon';
import { Popover } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ApartmentModal = ({ isOpen, setIsOpen }: Props) => {
  const [css] = useStyletron();

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        onClose={close}
        closeable
        isOpen={isOpen}
        overrides={{
          Dialog: {
            style: {
              width: '80vw',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <FocusOnce>
          <ModalHeader>
            Lavenda Apartments
            <div
              className={css({
                fontSize: '1rem',
                fontWeight: 'normal',
              })}
            >
              Available for rent and purchase
            </div>
          </ModalHeader>
        </FocusOnce>

        <ModalBody style={{ flex: '1 1 0' }}>
          <div
            className={css({
              position: 'relative',
              height: '30vh',
              objectFit: 'cover',
              marginBottom: '2rem',
            })}
          >
            <Image src='/img/interior2.jpg' layout='fill' />
          </div>
          <div
            className={css({
              display: 'flex',
            })}
          >
            {/* INFO */}
            <div className={css({ padding: '0 1rem 0 1rem' })}>
              <div className={css({ marginBottom: '.5rem' })}>
                <span className={css({ fontWeight: 'bold' })}>
                  Description:{' '}
                </span>
                Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
                ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris
                ut tempus. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Voluptatem mollitia placeat voluptates dolorem non alias
                quam adipisci nostrum, architecto sequi doloremque ratione nulla
                fugit praesentium, laudantium, deleniti quasi sit pariatur
                inventore dolorum! Aspernatur earum, dolorum fuga, optio
                doloribus veniam non dicta doloremque recusandae quas sit ab
                dolor numquam aliquam ipsa.
              </div>
              <div className={css({ marginBottom: '.5rem' })}>
                <span className={css({ fontWeight: 'bold' })}>Location: </span>
                Greenwinch
              </div>
              <div className={css({ marginBottom: '.5rem' })}>
                <span className={css({ fontWeight: 'bold' })}>
                  Apartment Details:{' '}
                </span>
                Large Bed, Packing Space, General Paid Gym, High Speed WiFi, Dry
                Cleaning
              </div>
              <div className={css({ marginBottom: '.5rem' })}>
                <span className={css({ fontWeight: 'bold' })}>
                  Apartment Facilities:{' '}
                </span>
                Large Bed, Packing Space, General Paid Gym, High Speed WiFi, Dry
                Cleaning
              </div>
              <div className={css({ marginBottom: '.5rem' })}>
                <span className={css({ fontWeight: 'bold' })}>Owned by: </span>
                0x0000000000000000000000000000000
              </div>
              <div>
                <span className={css({ fontWeight: 'bold' })}>
                  Offers made on apartment:{' '}
                </span>
                0
              </div>
            </div>

            {/* ACTION & MORE */}
            <div
              className={css({
                width: '60%',
                border: '1px solid',
                borderRadius: '5%',
                padding: '.5rem',
              })}
            >
              <div
                className={css({
                  fontSize: '1.5rem',
                  fontWeight: 'bolder',
                  marginBottom: '.5rem',
                })}
              >
                cUSD 4.00
                <span
                  className={css({
                    fontSize: '.75rem',
                    fontWeight: 'normal',
                  })}
                >
                  /night
                </span>
              </div>
              <div
                className={css({ fontSize: '.75rem', marginBottom: '.25rem' })}
              >
                Only the owner of the listed apartment can perform these
                available actions
              </div>

              <ButtonGroup
                overrides={{
                  Root: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '50%',
                    },
                  },
                }}
                size={SIZE.mini}
              >
                <DiscountDropdown>Discount</DiscountDropdown>
                <UpdateDropdown>Update</UpdateDropdown>
                <Button>Delete</Button>
              </ButtonGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind='tertiary' onClick={close}>
            Cancel
          </ModalButton>
          <ModalButton>Rent</ModalButton>
          <ModalButton>Make Offer</ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ApartmentModal;

const discountItems = [
  { label: 'Discount Price' },
  { label: 'Update Discount' },
  { label: 'End Discount' },
];

function DiscountDropdown(props: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onClick={() => setIsOpen((s) => !s)}
      content={
        <StatefulMenu
          items={discountItems}
          onItemSelect={() => setIsOpen(false)}
        />
      }
    >
      <Button {...props} endEnhancer={() => <TriangleDown size={14} />}>
        {props.children}
      </Button>
    </Popover>
  );
}

const updateItems = [
  { label: 'Availablity' },
  { label: 'Price' },
  { label: 'Images' },
];

function UpdateDropdown(props: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onClick={() => setIsOpen((s) => !s)}
      content={
        <StatefulMenu
          items={updateItems}
          onItemSelect={() => setIsOpen(false)}
        />
      }
    >
      <Button {...props} endEnhancer={() => <TriangleDown size={14} />}>
        {props.children}
      </Button>
    </Popover>
  );
}
