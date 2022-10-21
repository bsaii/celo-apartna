import { Cell, Grid } from 'baseui/layout-grid';
import { Checkbox } from 'baseui/checkbox';
import { DisplaySmall } from 'baseui/typography';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { Textarea } from 'baseui/textarea';
import { Select, Value } from 'baseui/select';
import { Button } from 'baseui/button';

const List = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState<Value>([]);
  const [facilities, setFacilities] = useState<Value>([]);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [allowPurchase, setAllowPurchase] = useState(false);

  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Grid>
        <Cell
          span={4}
          overrides={{
            Cell: {
              style: {
                position: 'relative',
              },
            },
          }}
        >
          <Image src='/img/building1.jpg' layout='fill' />
        </Cell>
        <Cell span={8}>
          <DisplaySmall marginBottom='scale1000'>
            List your apartments on Apartna for rent or purchase.
          </DisplaySmall>
          <FormControl label='Apartment Name'>
            <Input
              id='input-id'
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl label='Apartment Images' caption='Images must be URL'>
            <Input
              id='input-id'
              value={image}
              onChange={(event) => setImage(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl label='Description' caption='Description of apartment'>
            <Textarea
              id='textarea-id'
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl
            label='Apartment Details'
            caption='Details of the apartment, e.g. 3 Beds, 2 Baths, etc'
          >
            <Select
              creatable
              multi
              options={[
                { id: 'Portland', label: 'Portland' },
                { id: 'NYC', label: 'New York City' },
                { id: 'LosAngeles', label: 'Los Angeles' },
                { id: 'Boston', label: 'Boston' },
                { id: 'Atlanta', label: 'Atlanta' },
                { id: 'SanFrancisco', label: 'San Francisco' },
              ]}
              labelKey='label'
              valueKey='id'
              onChange={({ value }) => setDetails(value)}
              value={details}
            />
          </FormControl>
          <FormControl
            label='Apartment Facilities'
            caption='Facilities of the apartment, e.g. Wifi, Parking, etc'
          >
            <Select
              creatable
              multi
              options={[
                { id: 'Portland', label: 'Portland' },
                { id: 'NYC', label: 'New York City' },
                { id: 'LosAngeles', label: 'Los Angeles' },
                { id: 'Boston', label: 'Boston' },
                { id: 'Atlanta', label: 'Atlanta' },
                { id: 'SanFrancisco', label: 'San Francisco' },
              ]}
              labelKey='label'
              valueKey='id'
              onChange={({ value }) => setFacilities(value)}
              value={facilities}
            />
          </FormControl>
          <FormControl label='Location'>
            <Input
              id='input-id'
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
            />
          </FormControl>
          <FormControl label='Price' caption='Price per a night'>
            <Input
              id='input-id'
              type='number'
              startEnhancer='cUSD'
              value={price}
              onChange={(event) =>
                setPrice(event.currentTarget.value as unknown as number)
              }
            />
          </FormControl>
          <FormControl caption='Let users make an offer for your apartment'>
            <Checkbox
              checked={allowPurchase}
              onChange={() => setAllowPurchase(!allowPurchase)}
            >
              Allow Purchase
            </Checkbox>
          </FormControl>
          <div>
            <Button
              onClick={() => alert('Listed apartment')}
              overrides={{
                BaseButton: {
                  style: {
                    width: '100%',
                  },
                },
              }}
            >
              List Apartment
            </Button>
          </div>
        </Cell>
      </Grid>
    </>
  );
};

export default List;
