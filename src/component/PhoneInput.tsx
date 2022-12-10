import { FC, KeyboardEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { ClearOutlined, PhoneOutlined } from '@ant-design/icons';

export interface PhoneInputProp {
  putValue: (state: string) => void;
  labelCaption: string;
  placeholder: string;
}

const PhoneInput: FC<PhoneInputProp> = ({ putValue, labelCaption, placeholder }) => {
  const [phone, setPhone] = useState<string>('');

  const enterPhone = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      putValue(phone);
      setPhone('');
    }
  };

  return (
    <>
      <label htmlFor="belphone">{labelCaption}</label>
      <Input
        addonBefore={<PhoneOutlined />}
        id="belphone"
        style={{ width: '80%' }}
        value={phone}
        placeholder={placeholder}
        onChange={(e) => setPhone(e.target.value)}
        onKeyDown={enterPhone}
      />
      <Button type="dashed" shape="circle" icon={<ClearOutlined />} onClick={() => setPhone('')} />
    </>
  );
};

export default PhoneInput;
