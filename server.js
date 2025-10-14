const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send', async (req, res) => {
  console.log("Incoming data:", req.body);

  const { FIO, telephone, message } = req.body;
  const telegramToken = process.env.TELEGRAM_TOKEN; // Токен Замените данную строку на const telegramToken = 'Ваш Токен';
  const chatId = process.env.CHAT_ID; // Чат ID Замените данную строку на const chatId = 'Ваш Chat ID';

  const text = `📩 Новая заявка!\n👤 Имя: ${FIO}\n📞 Телефон: ${telephone}\n💬 Сообщение: ${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const data = await response.json();
    console.log("Telegram response:", data);

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status} - ${data.description}`);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Ошибка при отправке в Telegram:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
