import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Space, Card, message } from 'antd';
import { axiosInstance } from '../../axios'
import { useHistory } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import InputMask from "react-input-mask";


export default function SignUp() {
	const history = useHistory()
	const initialFormData = Object.freeze({
		phone: '',
		password: '',
		loading: false,
	})
	const [formData, updateFormData] = useState(initialFormData)


	const handleSubmit = (e) => {
		// e.preventDefault()
		updateFormData({ ...formData, loading: true })
		console.log(formData)

		axiosInstance
			.post('/registration/', {
				phone: formData.phone,
				password: formData.password
			})
			.then((res) => {
				{ message.success('Регистрация прошла успешно!') }
				updateFormData({ ...formData, loading: false })
				history.push('/login')
				// console.log(res)
				// console.log(res.data)
			})
			.catch((err) => {
				updateFormData({ loading: false })
				{ message.error(err) }
			})
	}

	const { Meta } = Card

	return (
		<Row justify='center'>
			<Col xs={20} sm={10} md={7} xl={6}>
				<Form layout='vertical' style={{ textAlign: 'center', paddingTop: '40%' }} onFinish={handleSubmit}>
					<h1>Регистрация</h1>
					<Form.Item
						label="Номер телефона"
						onChange={e => updateFormData({ ...formData, phone: e.target.value })}
						value={formData.phone}
						name="phone"
						style={{ textAlign: 'start' }}
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите номер телефона',
							},
						]}
					>
						<InputMask
							className='ant-input ant-input-lg'
							mask="+7(999)999-99-99"
							alwaysShowMask={true}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						label="Пароль"
						onChange={e => updateFormData({ ...formData, password: e.target.value })}
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите пароль',
							},
						]}
						style={{ textAlign: 'start' }}
						hasFeedback
					>
						<Input.Password prefix={<LockOutlined />} size="large" />
					</Form.Item>
					<Form.Item
						name='confirm'
						label="Подтверждение пароля"
						dependencies={['password']}
						style={{ textAlign: 'start' }}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Пожалуйста подтвердите пароль',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Введеные вами пароли не совпадают!'));
								},
							}),
						]}
					>
						<Input.Password prefix={<LockOutlined />} size="large" />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={formData.loading}
							size='large'
							block
						>Зарегистрироваться
						</Button>
					</Form.Item>
					<a href="/login">
						Войти
					</a>
				</Form>
			</Col>
		</Row>
	)
}
