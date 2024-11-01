import React, { useState, useEffect, useCallback } from 'react';
import { Table, Form, Input, Button, Modal, notification, Tooltip } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './app.css'; 
import './i18n'; 

const App = () => {
  const { control, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editStateKey, setEditStateKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();

  const openNotification = (message, description) => {
    notification.success({
      message,
      description,
    });
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const products = await response.json();
      const formattedProducts = products.map((product) => ({
        key: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.images && product.images[0] ? product.images[0] : '',
      }));
      setData(formattedProducts);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    if (editStateKey) {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editStateKey ? { ...item, ...formData } : item
        )
      );
      openNotification(t('Успешно'), t('Товар обновлён'));
      setEditStateKey(null);
    } else {
      setData((prevData) => [
        ...prevData,
        { key: Date.now(), ...formData },
      ]);
      openNotification(t('Успешно'), t('Товар добавлен'));
    }
    reset();
    setIsModalVisible(false);
    setIsSubmitting(false);
  };

  const editFunc = (rec) => {
    reset({
      title: rec.title,
      price: rec.price,
      description: rec.description,
      image: rec.image || '',
    });
    setEditStateKey(rec.key);
    setIsModalVisible(true);
  };

  const handleDelete = useCallback((key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
    openNotification(t('Успешно'), t('Товар удалён'));
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'key', key: 'key' },
    { title: t('Название'), dataIndex: 'title', key: 'title' },
    { title: t('Цена'), dataIndex: 'price', key: 'price' },
    {
      title: t('Изображение'),
      dataIndex: 'image',
      key: 'image',
      render: (image, rec) => (
        <div style={{ position: 'relative', textAlign: 'center' }}>
          {image ? (
            <>
              <img src={image} alt="product" style={{ width: '300px', height: '300px' }} />
              <div style={{ marginTop: '10px' }}>
                <Tooltip title={rec.description} placement="bottom" arrowPointAtCenter>
                  <span style={{ cursor: 'pointer' }}> {t('Показать описание')}</span>
                </Tooltip>
              </div>
            </>
          ) : (
            t('Нет изображения')
          )}
        </div>
      ),
    },
    {
      title: t('Действия'),
      key: 'actions',
      render: (rec) => (
        <div className="table-actions">
          <Button onClick={() => editFunc(rec)}>{t('Изменить')}</Button>
          <Button
            onClick={() => handleDelete(rec.key)}
            style={{ marginLeft: '10px', }}
            type="danger"
          >
            {t('Удалить')}
          </Button>
        </div>
      ),
    },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => changeLanguage('en')}>{t('English')}</Button>
        <Button onClick={() => changeLanguage('ru')}>{t('Русский')}</Button>
      </div>

      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        {t('Добавить товар')}
      </Button>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="key"
        loading={loading}
        style={{ marginTop: '20px' }}
      />

      <Modal
        title={editStateKey ? t('Изменить товар') : t('Добавить товар')}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditStateKey(null);
        }}
        footer={null}
      >
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item label={t('Название')} required>
            <Controller
              name="title"
              control={control}
              rules={{ required: t('Название обязательно') }}
              render={({ field }) => <Input {...field} placeholder={t('Введите название товара')} />}
            />
          </Form.Item>

          <Form.Item label={t('Цена')} required>
            <Controller
              name="price"
              control={control}
              rules={{
                required: t('Цена обязательна'),
                min: 1,
              }}
              render={({ field }) => (
                <Input type="number" {...field} placeholder={t('Введите цену товара')} />
              )}
            />
          </Form.Item>

          <Form.Item label={t('Описание')} required>
            <Controller
              name="description"
              control={control}
              rules={{ required: t('Описание обязательно') }}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder={t('Введите описание товара')} />
              )}
            />
          </Form.Item>

          <Form.Item label={t('Изображение (URL)')}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => <Input {...field} placeholder={t('URL изображения')} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {editStateKey ? t('Обновить товар') : t('Добавить товар')}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
