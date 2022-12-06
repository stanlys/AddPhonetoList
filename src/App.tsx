import { KeyboardEvent, useState } from 'react';
import './App.css';
import { AvailablePhones, BEL_PHONE_TEMPLATE, kindPhoneNumber, RUS_PHONE_TEMPLATE, voidSetPhone } from './interface';
import { Layout, Col, Row, Button, Input, Space, Typography } from 'antd';
import { ClearOutlined, PhoneOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [phoneList, setPhoneList] = useState<AvailablePhones[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string>('');
  const [belPhone, setBelPhone] = useState<string>('');
  const [rusPhone, setRusPhone] = useState<string>('');

  const inputPhone = (e: KeyboardEvent<HTMLInputElement>, state: string, reg: RegExp, setPhone: voidSetPhone) => {
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
    <Layout>
      <Header style={{ color: 'whitesmoke' }}>PhoneList</Header>
      <Content>
        <div className="App">
          <Row>
            <Col span={8} offset={1}>
              <fieldset className="formArea">
                <Row>
                  <label htmlFor="belphone">Белорусский номер</label>
                  <Input
                    addonBefore={<PhoneOutlined />}
                    id="belphone"
                    placeholder="8025*******"
                    style={{ width: '80%' }}
                    value={belPhone}
                    onChange={(e) => setBelPhone(e.target.value)}
                    onKeyDown={(e) => inputPhone(e, belPhone, BEL_PHONE_TEMPLATE, setBelPhone)}
                  />
                  <Button type="dashed" shape="circle" icon={<ClearOutlined />} onClick={() => setBelPhone('')} />
                </Row>
                <Row>
                  <label htmlFor="rusphone">Российский номер</label>
                  <Input
                    addonBefore={<PhoneOutlined />}
                    id="rusphone"
                    placeholder="8950*******"
                    style={{ width: '80%' }}
                    value={rusPhone}
                    onChange={(e) => setRusPhone(e.target.value)}
                    onKeyDown={(e) => inputPhone(e, rusPhone, RUS_PHONE_TEMPLATE, setRusPhone)}
                  />
                  <Button type="dashed" shape="circle" icon={<ClearOutlined />} onClick={() => setRusPhone('')} />
                </Row>
              </fieldset>
            </Col>
            <Col span={15}>
              <fieldset style={{ border: 0 }}>
                <legend>Введенные номера телефонов: </legend>
                <select size={10} onChange={(e) => setSelectedPhone(e.target.value)}>
                  {phoneList.map(({ phone, isCorrect }, index) => (
                    <option disabled={!isCorrect} key={phone + index} value={phone}>
                      {phone}
                    </option>
                  ))}
                </select>
              </fieldset>
            </Col>
          </Row>
        </div>
        <Space className="selectedPhone" align="center">
          <Typography>Выбран:</Typography>
          {selectedPhone && (
            <Typography>
              {selectedPhone} - {kindPhoneNumber(selectedPhone)}
            </Typography>
          )}
        </Space>
      </Content>
      <Footer>RSSchool React 2022</Footer>
    </Layout>
  );
};

export default App;
