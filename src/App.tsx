import { KeyboardEvent, useState } from 'react';
import './App.css';
import {
  AvailablePhones,
  BEL_PHONE_TEMPLATE,
  kindPhoneNumber,
  RUS_PHONE_TEMPLATE,
  voidSetPhone,
} from './interface';

const App = () => {
  const [phoneList, setPhoneList] = useState<AvailablePhones[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string>('');
  const [belPhone, setBelPhone] = useState<string>('');
  const [rusPhone, setRusPhone] = useState<string>('');

  const inputPhone = (
    e: KeyboardEvent<HTMLInputElement>,
    state: string,
    reg: RegExp,
    setPhone: voidSetPhone
  ) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const addedPhone: AvailablePhones = {
        phone: state,
        isCorrect: reg.test(state),
      };
      setPhoneList((state) => [...state, addedPhone]);
      setPhone('');
    }
  };

  return (
    <>
      <div className="App">
        <fieldset className="formArea">
          <div>
            <label htmlFor="belphone">Белорусский номер</label>
            <input
              value={belPhone}
              onChange={(e) => setBelPhone(e.target.value)}
              id="belphone"
              onKeyDown={(e) => inputPhone(e, belPhone, BEL_PHONE_TEMPLATE, setBelPhone)}
            />
            <button onClick={() => setBelPhone('')}>clear</button>
          </div>
          <div>
            <label htmlFor="rusphone">Российский номер</label>
            <input
              value={rusPhone}
              id="rusphone"
              onChange={(e) => setRusPhone(e.target.value)}
              onKeyDown={(e) => inputPhone(e, rusPhone, RUS_PHONE_TEMPLATE, setRusPhone)}
            ></input>
            <button>clear</button>
          </div>
        </fieldset>
        <fieldset style={{ border: 0 }}>
          <legend>Введенные номера телефонов: </legend>
          <select
            size={10}
            onChange={(e) => setSelectedPhone(e.target.value)}
          >
            {phoneList.map(({ phone, isCorrect }, index) => (
              <option disabled={!isCorrect} key={phone + index} value={phone}>
                {phone}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
      <div className="selectedPhone">
        {selectedPhone && (
          <span>
            {selectedPhone} - {kindPhoneNumber(selectedPhone)}
          </span>
        )}
      </div>
    </>
  );
};

export default App;
