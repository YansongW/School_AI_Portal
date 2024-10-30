import React from 'react';
import { Card, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import type { ServiceItem } from '../../../../types';

const QuickServices: React.FC = () => {
  const services = useSelector((state: RootState) => state.services.items);

  return (
    <Card title="常用服务">
      <Row gutter={[16, 16]}>
        {services.map((service: ServiceItem) => (
          <Col span={6} key={service.id}>
            <Card
              hoverable
              className="text-center"
              onClick={() => window.location.href = service.url}
            >
              <img 
                src={service.icon} 
                alt={service.title}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="font-medium">{service.title}</div>
              {service.description && (
                <div className="text-gray-500 text-sm">{service.description}</div>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default QuickServices; 