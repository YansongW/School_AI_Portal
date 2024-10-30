import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { removeNotification } from '../../store/slices/globalSlice';

const GlobalNotification: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.global.notifications);

  useEffect(() => {
    notifications.forEach((notif) => {
      notification[notif.type]({
        message: notif.message,
        onClose: () => dispatch(removeNotification(notif.id)),
      });
    });
  }, [notifications, dispatch]);

  return null;
};

export default GlobalNotification; 