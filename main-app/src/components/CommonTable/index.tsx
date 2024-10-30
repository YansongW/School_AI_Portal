import React, { useState } from 'react';
import { Table, Card, Input, Button, Space, Tooltip } from 'antd';
import { SearchOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface CommonTableProps<T> extends Omit<TableProps<T>, 'title'> {
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  showSettings?: boolean;
  showReload?: boolean;
  onSearch?: (value: string) => void;
  onReload?: () => void;
  extraActions?: React.ReactNode;
}

function CommonTable<T extends object>({
  title,
  showSearch = true,
  searchPlaceholder,
  showSettings = true,
  showReload = true,
  onSearch,
  onReload,
  extraActions,
  ...tableProps
}: CommonTableProps<T>) {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value: string) => {
    setSearchText(value);
    onSearch?.(value);
  };

  const handleReload = () => {
    setSearchText('');
    onReload?.();
  };

  return (
    <Card>
      {(title || showSearch || showReload || showSettings || extraActions) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          
          <Space>
            {showSearch && (
              <Input.Search
                placeholder={searchPlaceholder || t('common.search')}
                value={searchText}
                onChange={e => handleSearch(e.target.value)}
                style={{ width: 200 }}
              />
            )}
            
            {extraActions}
            
            {showReload && (
              <Tooltip title={t('common.reload')}>
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={handleReload}
                />
              </Tooltip>
            )}
            
            {showSettings && (
              <Tooltip title={t('common.settings')}>
                <Button 
                  icon={<SettingOutlined />}
                />
              </Tooltip>
            )}
          </Space>
        </div>
      )}
      
      <Table<T> 
        {...tableProps}
        className="custom-table"
      />
    </Card>
  );
}

export default CommonTable; 