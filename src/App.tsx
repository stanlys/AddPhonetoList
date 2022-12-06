import { ChangeEvent, KeyboardEvent, useState } from 'react';
import './App.css';

interface AvailablePhones {
  phone: string;
  isCorrect: boolean;
}

const BEL_PHONE_TEMPLATE = /80\d{9}/;
const RUS_PHONE_TEMPLATE = /89\d{9}/;

function App() {
  const [phoneList, setPhoneList] = useState<AvailablePhones[]>([]);
  const [belPhone, setBelPhone] = useState<string>('');
  const [rusPhone, setRusPhone] = useState<string>('');

  const BelPhone = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const addedPhone: AvailablePhones = {
        phone: belPhone,
        isCorrect: BEL_PHONE_TEMPLATE.test(belPhone),
      };
      setPhoneList((state) => [...state, addedPhone]);
    }
  };

  const inputRusPhone = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const addedPhone: AvailablePhones = {
        phone: rusPhone,
        isCorrect: RUS_PHONE_TEMPLATE.test(rusPhone),
      };
      setPhoneList((state) => [...state, addedPhone]);
      setRusPhone('');
    }
  };

  return (
    <div className="App">
      <fieldset style={{ display: 'flex', flexDirection: 'column', gap: '2rem', border: 0 }}>
        <div>
          <label htmlFor="belphone">Белорусский номер</label>
          <input
            value={belPhone}
            id="belphone"
            onChange={(e) => setBelPhone(e.target.value)}
            onKeyDown={BelPhone}
          />
          <button onClick={() => setBelPhone('')}>clear</button>
        </div>
        <div>
          <label>Российский номер</label>
          <input
            value={rusPhone}
            onChange={(e) => setRusPhone(e.target.value)}
            onKeyDown={inputRusPhone}
          ></input>
          <button>clear</button>
        </div>
      </fieldset>
      <fieldset style={{ border: 0 }}>
        <legend>Введенные номера телефонов: </legend>
        <select
          size={10}
          style={{ width: '30rem' }}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => console.log(e.target.value)}
        >
          {phoneList.map(({ phone, isCorrect }, index) => (
            <option disabled={!isCorrect} key={phone + index} value={phone}>
              {phone}
            </option>
          ))}
        </select>
      </fieldset>
      <div>
        <span className=""></span>
      </div>
    </div>
  );
}

export default App;
