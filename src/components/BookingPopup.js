import React, { useState } from 'react';
import '../styles/BookingPopup.css';
import { X } from 'lucide-react';

const BookingPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    telegramNick: '',
    preferredDate: '',
    preferredTime: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const tg = window.Telegram.WebApp;
    
    // Include Telegram chat ID in the form data
    const bookingData = {
      ...formData,
      chatId: tg.initDataUnsafe?.user?.id || tg.initData?.user?.id,
    };

    try {
      const response = await fetch('https://6289-2a03-d000-84a9-9463-4988-73df-ff15-11b4.ngrok-free.app/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        console.log('Booking data sent to backend');
        // Send data back to Telegram WebApp
        tg.sendData(JSON.stringify(bookingData));
        // Close the WebApp
        tg.close();
      } else {
        console.error('Failed to send booking data to backend');
        alert('Произошла ошибка при бронировании. Пожалуйста, попробуйте снова.');
      }
    } catch (error) {
      console.error('Error sending booking data:', error);
      alert('Произошла ошибка при бронировании. Пожалуйста, попробуйте снова.');
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Забронировать бесплатный урок</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="telegramNick">Ник в Telegram*</label>
            <input
              type="text"
              id="telegramNick"
              name="telegramNick"
              value={formData.telegramNick}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preferredDate">Предпочтительная дата*</label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preferredTime">Предпочтительное время*</label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
            >
              <option value="">Выберите время</option>
              <option value="morning">Утро (9:00 - 12:00)</option>
              <option value="afternoon">День (12:00 - 17:00)</option>
              <option value="evening">Вечер (17:00 - 21:00)</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Номер телефона (необязательно)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Забронировать
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;

