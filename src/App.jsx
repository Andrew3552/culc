import { useState, useEffect } from "react";
import Logo from "./assets/logo.png";
import mainImg from "./assets/qz3.png";

import "./App.css";

const calculateReturn = (age, investment) => {
  const baseMultiplier = 7.4;
  let ageFactor = 1 + (age - 25) * 0.005; // Плавное изменение доходности с возрастом

  if (age >= 30 && age < 45) {
    ageFactor += 0.05; // Повышенный коэффициент доходности
  } else if (age >= 45) {
    ageFactor += 0.03; // Чуть ниже, но выше, чем у молодых
  }

  let returnAmount = Math.round(investment * baseMultiplier * ageFactor);
  return returnAmount < 350000 ? 350000 : returnAmount;
};

function App() {
  const [age, setAge] = useState(30);
  const [investment, setInvestment] = useState(50000);
  const [returnAmount, setReturnAmount] = useState(calculateReturn(30, 50000));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setReturnAmount(calculateReturn(age, investment));
  }, [age, investment]);

  useEffect(() => {
    const messages = [
      "🔥 Айжан из Астаны только что вывела 250K ₸!",
      "💼 Дастан из Караганды вложил 50K ₸. Его старт — ваша очередь!",
      "⏳ Алия из Шымкента забронировала место. Осталось 12/50!",
      "🚀 Талгат из Алматы получил первые 150K ₸ за 3 дня. Вы следующий?",
      "💰 Айгуль из Актобе удвоила депозит: 100K → 200K ₸!",
      "📈 Руслан из Павлодара вышел на доход 500K ₸. Как он это сделал?",
      "✨ Мадина из Усть-Каменогорска начала с 30K ₸ → сейчас 300K!",
      "🏆 Айдар из Алматы — лидер недели с доходом 1M ₸!",
      "💸 Сания из Уральска получила выплату 180K ₸. Проверьте историю!",
      "🌟 Нурлан из Петропавловска присоединился к группе. Осталось 11 мест!",
      "🚨 Айсулу из Атырау увеличила доход на 400%",
      "💎 Азамат из Талдыкоргана инвестировал 100K ₸ → уже 350K!",
      "🛎️ Диас из Актау получил личный план от Михаила. Ваша очередь!",
      "🌍 Жанар из Кокшетау вошла в топ-10 группы. Присоединяйтесь!",
      "🔐 Алмаз из Жезказгана закрыл доступ к группе. Осталось 9 мест!",
      
    ];
    let index = 0;

    const interval = setInterval(() => {
      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), text: messages[index] }
      ]);
      index = (index + 1) % messages.length;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className="container">
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        {notifications.map((notification) => (
          <div key={notification.id} style={{
            background: "#75d256",
            color: "#000000",
            padding: "10px",
            marginBottom: "5px",
            borderRadius: "5px",
            opacity: 0.9
          }}>
            {notification.text}
          </div>
        ))}
      </div>
      <div className="header">
        <div>
          <p className="header_text">Места</p>
        </div>
        <div>
          <img src={Logo} alt="logo" height={"40px"} width={"40px"} />
        </div>
        <div>
          <p className="header_text">Таймер</p>
        </div>
      </div>
      <div>
        <img className="mainImg" src={mainImg} alt="mainImg" />
      </div>
      <div className="calculator_container">
        <h2 className="title">Калькулятор доходности</h2>
        <div>
          <h3 className='title_calculator'>1. Выберите возраст</h3>
          <label className="label">Возраст: {age}</label>
          <input
            type="range"
            min="25"
            max="55"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#ff0000" }}
          />
        </div>
        <div>
          <h3 className='title_calculator'>2. Укажите размер инвестиций</h3>
          <label className="label">
            Размер инвестиций: {investment.toLocaleString()} ₸
          </label>
          <input
            type="range"
            min="50000"
            max="500000"
            step="100"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            style={{ width: "100%", height: "20px", accentColor: "#ff0000" }}
          />
        </div>
        {returnAmount !== null && (
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              textAlign: "center",
              color: "green",
              fontSize: "20px",
            }}
          >
            Ожидаемый доход за две недели: {returnAmount.toLocaleString()} ₸
          </div>
        )}
      </div>
      <div className="step_container">
        <h3 className='title_calculator step'>
          3. Подтвердите свое участие
        </h3>
        <p className="step_text">
        чтобы получить личное сопровождение и проверенную стратегию заработка от <p className="step_text_name">Михаила Ломтадзе</p> 
        </p>

      </div>
      <div className="button_container">
        <button className="button">Забронировать место</button>
      </div>
    </div>
  );
}

export default App;
