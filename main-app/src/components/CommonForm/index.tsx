import React from 'react';
import { Form, Button, Space, Card } from 'antd';
import type { FormProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface CommonFormProps extends FormProps {
  title?: string;
  loading?: boolean;
  showReset?: boolean;
  showCancel?: boolean;
  submitText?: string;
  resetText?: string;
  cancelText?: string;
  onCancel?: () => void;
  extraActions?: React.ReactNode;
}

const CommonForm: React.FC<CommonFormProps> = ({
  title,
  loading = false,
  showReset = true,
  showCancel = false,
  submitText,
  resetText,
  cancelText,
  onCancel,
  extraActions,
  children,
  ...formProps
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title={title}>
      <Form
        form={form}
        layout="vertical"
        {...formProps}
      >
        {children}
        
        <Form.Item className="mb-0 mt-4">
          <Space>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
            >
              {submitText || t('common.submit')}
            </Button>
            
            {showReset && (
              <Button onClick={handleReset}>
                {resetText || t('common.reset')}
              </Button>
            )}
            
            {showCancel && (
              <Button onClick={onCancel}>
                {cancelText || t('common.cancel')}
              </Button>
            )}
            
            {extraActions}
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CommonForm; 