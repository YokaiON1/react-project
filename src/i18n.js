import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
      submit: 'Submit',
      'Название': 'Name',
      'Цена': 'Price',
      'Описание': 'Description',
      'Изображение': 'Image',
      'Действия': 'Actions',
      'Добавить товар': 'Add Product',
      'Изменить товар': 'Edit Product',
      'Нет изображения': 'No Image',
      'Успешно': 'Success',
      'Товар добавлен': 'Product added',
      'Товар обновлён': 'Product updated',
      'Товар удалён': 'Product deleted',
      'English': 'English',
      'Русский': 'Russian',
      'Название обязательно': 'Name is required',
      'Цена обязательна': 'Price is required',
      'Введите название товара': 'Enter product name',
      'Введите цену товара': 'Enter product price',
      'Введите описание товара': 'Enter product description',
      'URL изображения': 'Image URL',
      'Обновить товар': 'Update Product',
    },
  },
  ru: {
    translation: {
      name: 'Имя',
      email: 'Электронная почта',
      password: 'Пароль',
      submit: 'Отправить',
      'Название': 'Название',
      'Цена': 'Цена',
      'Описание': 'Описание',
      'Изображение': 'Изображение',
      'Действия': 'Действия',
      'Добавить товар': 'Добавить товар',
      'Изменить товар': 'Изменить товар',
      'Нет изображения': 'Нет изображения',
      'Успешно': 'Успешно',
      'Товар добавлен': 'Товар добавлен',
      'Товар обновлён': 'Товар обновлён',
      'Товар удалён': 'Товар удалён',
      'English': 'English',
      'Русский': 'Русский',
      'Название обязательно': 'Название обязательно',
      'Цена обязательна': 'Цена обязательна',
      'Введите название товара': 'Введите название товара',
      'Введите цену товара': 'Введите цену товара',
      'Введите описание товара': 'Введите описание товара',
      'URL изображения': 'URL изображения',
      'Обновить товар': 'Обновить товар',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
