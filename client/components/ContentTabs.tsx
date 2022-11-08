import React, { Dispatch, Key, SetStateAction, useState } from 'react';
import { Tabs, Tab } from 'baseui/tabs-motion';
import ListingsCard from './ListingsCard';
import RentedApartments from './RentedApartments';
import Offers from './Offers';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ContentTabs = ({ setIsOpen }: Props) => {
  const [activeKey, setActiveKey] = useState<Key>(0);
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => setActiveKey(activeKey)}
    >
      <Tab title='Listings'>
        <ListingsCard setIsOpen={setIsOpen} />
      </Tab>
      <Tab title='Rented'>
        <RentedApartments />
      </Tab>
      <Tab title='Offers'>
        <Offers />
      </Tab>
    </Tabs>
  );
};

export default ContentTabs;
