import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState('all');

  const selectBefore = (
    <Select 
      value={searchType} 
      onChange={setSearchType}
      className="w-24"
    >
      <Option value="all">{t('search.all')}</Option>
      <Option value="service">{t('search.service')}</Option>
      <Option value="news">{t('search.news')}</Option>
    </Select>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Input
        addonBefore={selectBefore}
        placeholder={t('search.placeholder')}
        size="large"
        suffix={<SearchOutlined />}
        className="max-w-2xl mx-auto"
      />
    </div>
  );
};

export default SearchBar; 