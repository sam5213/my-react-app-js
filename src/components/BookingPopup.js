import React, { useState } from 'react';
import '../styles/BookingPopup.css';
import { X } from 'lucide-react';

const BookingPopup = ({ onClose, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    telegramNick: '',
    preferredDate: '',
    preferredTime: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);

    try {
      const response = await fetch('http://your-backend-url:5002/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: 'YOUR_CHAT_ID', // Replace with actual chat ID or method to get it
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        onBookingSuccess();
        onClose();
      } else {
        console.error('Booking failed:', data.message);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error sending booking data:', error);
      // Handle error (e.g., show error message to user)
    }
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

