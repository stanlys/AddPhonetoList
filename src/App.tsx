import { useState } from 'react';
import './App.css';
import { AvailablePhones, BEL_PHONE_TEMPLATE, kindPhoneNumber, RUS_PHONE_TEMPLATE } from './interface';
import { Layout, Col, Row, Space, Typography } from 'antd';
import PhoneInput from './component/PhoneInput';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [phoneList, setPhoneList] = useState<AvailablePhones[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<string>('');

  const putPhone = (state: string) => {
    const isCorrect = BEL_PHONE_TEMPLATE.test(state) || RUS_PHONE_TEMPLATE.test(state);

    const addedPhone: AvailablePhones = {
      phone: state,
      isCorrect,
    };
    setPhoneList((state) => [...state, addedPhone]);
  };

  return (
    <Layout>
      <Header className="header">PhoneList</Header>
      <Content>
        <div className="App">
          <Row>
            <Col span={8} offset={1}>
              <fieldset className="formArea">
                <Row>
                  <PhoneInput placeholder="8025*******" labelCaption="Введите номер телефона" putValue={putPhone} />
                </Row>
                <Row>
                  <PhoneInput placeholder="8950*******" labelCaption="Введите номер телефона" putValue={putPhone} />
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
              {selectedPhone} -{kindPhoneNumber(selectedPhone)}
            </Typography>
          )}
        </Space>
      </Content>
      <Footer>RSSchool React 2022</Footer>
    </Layout>
  );
};

export default App;
